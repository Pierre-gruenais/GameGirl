document.addEventListener("DOMContentLoaded", () => {
  const gameCanvas = document.getElementById("game-canvas");
  if (!(gameCanvas instanceof HTMLCanvasElement)) {
    console.error(
      "Game canvas element not found or is not an HTMLCanvasElement"
    );
    return;
  }

  const ctx = gameCanvas.getContext("2d");
  const startButton = document.getElementById("start-button");
  const introOverlay = document.getElementById("intro-overlay");

  const backgroundMusic = document.getElementById("background-music");
  const soundToggleButton = document.getElementById("sound-toggle");

  backgroundMusic.volume = 0.1;

  let soundEnabled = true; // État initial du son
  let lives = 3;
  let previousLives = lives;
  let score = 0;
  let gameStarted = false; // Indicateur pour vérifier si le jeu a commencé

  const objectFallSpeed = 2; // Vitesse de chute des objets en pixels par frame

  const images = [
    "src/assets/images/bonbon.png",
    "src/assets/images/bonboncoeur.png",
    "src/assets/images/donut.png",
    "src/assets/images/Glace.png",
    "src/assets/images/sucetteCoeur.png",
  ];

  const malusImageUrl = [
    "src/assets/images/carotte-2.png",
    "src/assets/images/poivron.png",
    "src/assets/images/epinards.png",
    "src/assets/images/betterave.png",
  ];

  // Fonction pour démarrer le jeu
  function startGame() {
    if (introOverlay) {
      introOverlay.style.display = "none"; // Cache le bandeau d'accueil
      console.log("bandeau caché !");
      console.log("Jeu démarré !");
      backgroundMusic
        .play()
        .catch((err) => console.error("Failed to play background music:", err));

      // Crée un nouvel objet toutes les 5 secondes
      setInterval(createFallingObject, 5000);

      // Crée un objet malus toutes les 10 secondes
      setInterval(createMalusObject, 10000);

      // Initialise les vies et le score dans l'interface utilisateur
      updateLives();
      updateScore(0);
      gameStarted = true;
    } else {
      console.error("l'élément d'introOverlay est manquant.");
    }
  }

  // Fonction pour mettre à jour les vies dans l'interface utilisateur
  function updateLives() {
    const livesContainer = document.getElementById("lives-container");
    if (livesContainer) {
      livesContainer.innerHTML = "";
      for (let i = 0; i < lives; i++) {
        const lifeIcon = document.createElement("img");
        lifeIcon.src = "src/assets/images/coeur(1).png"; // Chemin de l'image de vie
        lifeIcon.className = "life-icon";
        livesContainer.appendChild(lifeIcon);
      }
      if (lives < previousLives) {
        // Ajout de l'animation à l'icône de vie perdue
        const lostLifeIcon = livesContainer.children[lives];
        if (lostLifeIcon) {
          lostLifeIcon.classList.add("lost-life");
          // Supprime l'icône après l'animation
          setTimeout(() => {
            lostLifeIcon.remove();
          }, 500);
        }
      }
      previousLives = lives;
    } else {
      console.error("Element with id 'lives-container' not found");
    }
  }

  // Fonction pour mettre à jour le score et afficher dans l'interface utilisateur
  function updateScore(points) {
    score += points;
    const scoreElement = document.getElementById("score-value");
    if (scoreElement) {
      scoreElement.textContent = score.toString();
    } else {
      console.error("Element with id 'score-value' not found");
    }
  }

  // Fonction pour détecter les collisions entre le personnage et les objets
  function detectCollisions(fallingObject) {
    const character = document.getElementById("character");
    if (!character || !(character instanceof HTMLElement)) {
      console.error("Character element not found or is not an HTMLElement");
      return;
    }

    const characterRect = character.getBoundingClientRect();
    const objectRect = fallingObject.getBoundingClientRect();

    if (
      characterRect.left < objectRect.right &&
      characterRect.right > objectRect.left &&
      characterRect.top < objectRect.bottom &&
      characterRect.bottom > objectRect.top
    ) {
      // Collision détectée
      if (fallingObject.className === "falling-object") {
        // Objet normal = augmente le score
        updateScore(1);
      } else if (fallingObject.className === "malus-object") {
        // Objet malus - réduit les vies
        lives -= 1;
        updateLives();

        if (lives <= 0) {
          alert("gameover");
        }
      }
      fallingObject.remove();
    }
  }

  // Fonction pour créer un objet qui tombe
  function createFallingObject() {
    if (!gameStarted) return; // verifie si le jeu z commencé avant de creer un objet
    const fallingObject = document.createElement("div");
    fallingObject.className = "falling-object";

    // Sélectionne une image aléatoire
    const randomImage = images[Math.floor(Math.random() * images.length)];
    fallingObject.style.backgroundImage = `url(${randomImage})`;
    fallingObject.style.position = "absolute"; // Position absolue pour que les objets tombent
    fallingObject.style.left = `${
      Math.random() * (gameCanvas.clientWidth - 50)
    }px`;
    fallingObject.style.top = "0px"; // Les objets démarrent en haut de la fenêtre
    document.body.appendChild(fallingObject);

    const fallSpeed = Math.random() * 2 + 1; // Vitesse de chute aléatoire entre 1 et 3 par frame
    const horizontalSpeed = Math.random() * 2 - 1; // Vitesse horizontale aléatoire entre -1 et 1 pixels par frame

    let top = 0;
    let left = parseFloat(fallingObject.style.left);
    const fallInterval = setInterval(() => {
      top += fallSpeed;
      left += horizontalSpeed; // Déplacement horizontal aléatoire
      fallingObject.style.top = `${top}px`;
      fallingObject.style.left = `${left}px`;

      // Vérifiez si l'objet a touché le bas
      if (top > window.innerHeight - fallingObject.clientHeight) {
        clearInterval(fallInterval);
        fallingObject.classList.add("explosion"); // Ajouter la classe d'explosion
        setTimeout(() => {
          fallingObject.remove(); // Retirer l'objet après l'animation
        }, 1000); // Durée de l'animation d'explosion
      }

      // Détecte les collisions entre le personnage et l'objet
      detectCollisions(fallingObject);
    }, 1000 / 60); // 60 FPS
  }

  // Fonction pour créer un objet malus
  function createMalusObject() {
    if (!gameStarted) return; // **Vérifie si le jeu a commencé avant de créer l'objet malus**

    const malusObject = document.createElement("div");
    malusObject.className = "malus-object";

    // Utilise l'image spécifiée pour l'objet malus
    const randomMalusImage =
      malusImageUrl[Math.floor(Math.random() * malusImageUrl.length)];
    malusObject.style.backgroundImage = `url(${randomMalusImage})`;
    malusObject.style.position = "absolute"; // Position absolue pour que les objets tombent
    malusObject.style.left = `${
      Math.random() * (gameCanvas.clientWidth - 50)
    }px`;
    malusObject.style.top = "0px"; // Les objets démarrent en haut de la fenêtre
    document.body.appendChild(malusObject);

    const fallSpeed = Math.random() * 2 + 1; // Vitesse de chute aléatoire entre 1 et 3 pixels par frame
    const horizontalSpeed = Math.random() * 2 - 1;

    let top = 0;
    let left = parseFloat(malusObject.style.left);
    const fallInterval = setInterval(() => {
      top += fallSpeed;
      left += horizontalSpeed; // Déplacement horizontal aléatoire
      malusObject.style.top = `${top}px`;
      malusObject.style.left = `${left}px`;

      // Vérifiez si l'objet a touché le bas
      if (top > window.innerHeight - malusObject.clientHeight) {
        clearInterval(fallInterval);
        malusObject.classList.add("explosion"); // Ajouter la classe d'explosion
        setTimeout(() => {
          malusObject.remove(); // Retirer l'objet après l'animation
        }, 1000); // Durée de l'animation d'explosion
      }

      // Détecte les collisions entre le personnage et l'objet malus
      detectCollisions(malusObject);
    }, 1000 / 60);
  }

  // Fonction pour créer les morceaux d'explosion
  function createExplosionPieces(fallingObject) {
    const numberOfPieces = 20; // Nombre de morceaux pour l'explosion
    const explosionContainer = document.createElement("div");
    explosionContainer.className = "explosion-container";
    document.body.appendChild(explosionContainer);

    for (let i = 0; i < numberOfPieces; i++) {
      const piece = document.createElement("div");
      piece.className = "explosion-piece";

      // Applique une animation aléatoire aux morceaux
      piece.style.animationDelay = `${Math.random() * 0.5}s`;
      explosionContainer.appendChild(piece);
    }

    // Positionne l'explosion à la position de l'objet
    explosionContainer.style.left = `${fallingObject.offsetLeft}px`;
    explosionContainer.style.top = `${fallingObject.offsetTop}px`;

    // Retire les morceaux après l'animation
    setTimeout(() => {
      explosionContainer.remove();
    }, 1000);
  }

  // Fonction pour animer le texte
  function animateText(textElement) {
    const animationClass = "animated-text";
    textElement.classList.add(animationClass);

    setTimeout(() => {
      textElement.classList.remove(animationClass);
    }, 1000); // Durée de l'animation (en millisecondes)
  }

  // Fonction pour activer/désactiver le son
  function toggleSound() {
    soundEnabled = !soundEnabled;
    soundToggleButton.className = soundEnabled
      ? "sound-toggle sound-on"
      : "sound-toggle sound-off";

    if (soundEnabled) {
      backgroundMusic
        .play()
        .catch((err) => console.error("Failed to play background music:", err));
    } else {
      backgroundMusic.pause();
    }
  }

  // Événements de démarrage et redémarrage
  if (startButton && introOverlay) {
    startButton.addEventListener("click", startGame);
  } else {
    console.error("Les éléments de l'intro n'ont pas été trouvés.");
  }

  //if (restartButton) {
  //  restartButton.addEventListener("click", restartGame);
  //} else {
  //  console.error("L'élément du bouton de redémarrage est manquant.");
  //}

  soundToggleButton.addEventListener("click", toggleSound);

  window.addEventListener("resize", () => {
    // resizeCanvas();
    //initializeCharacterPosition();
  });

  console.log("Script Javascript chargé avec succès !");
});
