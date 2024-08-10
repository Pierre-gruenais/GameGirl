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
  backgroundMusic.volume = 0.1;

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

  // nombre de vies au demarrage
  let lives = 3;
  let previousLives = lives;
  // initialise le score à 0
  let score = 0;

  // Fonction pour démarrer le jeu
  function startGame() {
    if (introOverlay) {
      introOverlay.style.display = "none"; // Cache le bandeau d'accueil
      console.log("bandeau caché !");
      // Ajoutez ici l'initialisation ou le démarrage du jeu
      // Par exemple, vous pouvez commencer à créer des objets qui tombent, etc.
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
    } else {
      console.error("l'element d'introOverlay est manquant.");
    }
  }

  // Assurez-vous que les éléments existent avant de les utiliser
  if (startButton && introOverlay) {
    startButton.addEventListener("click", startGame);
  } else {
    console.error("Les éléments de l'intro n'ont pas été trouvés.");
  }

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
        // ajout de l'animation à l'icône de vie perdue
        const lostLifeIcon = livesContainer.children[lives];
        if (lostLifeIcon) {
          lostLifeIcon.classList.add("lost-life");
          // supprime l'icône après l'animation
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
          alert("Game Over!");
          // Ajouter une logique de réinitialisation du jeu ici
        }
      }
      fallingObject.remove();
    }
  }

  function createFallingObject() {
    const fallingObject = document.createElement("div");
    fallingObject.className = "falling-object";

    // Sélectionne une image aléatoire
    const randomImage = images[Math.floor(Math.random() * images.length)];
    fallingObject.style.backgroundImage = `url(${randomImage})`;
    fallingObject.style.position = "absolute"; // Position absolue pour que les objets tombent
    fallingObject.style.left = `${
      Math.random() * (gameCanvas.clientWidth - 50)
    }px`;
    fallingObject.style.top = "0px"; // les objets demarrent en haut de la fenetre
    document.body.appendChild(fallingObject);

    const fallSpeed = Math.random() * 2 + 1; //vitesse de chute aleatoire entre 1 et 3 par frame
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
      // Supprime l'objet lorsqu'il atteint le bas
      //if (top > window.innerHeight) {
      //  fallingObject.remove();
      //  clearInterval(fallInterval);
      //}
      detectCollisions(fallingObject);
    }, 1000 / 60); // 60 FPS
  }

  function createMalusObject() {
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
    malusObject.style.top = "0px"; // les objets démarrent en haut de la fenêtre
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
      // Supprime l'objet lorsqu'il atteint le bas
      //if (top > window.innerHeight) {
      //  malusObject.remove();
      //  clearInterval(fallInterval);
      //}
      detectCollisions(malusObject);
    }, 1000 / 60);
  }
  function createExplosionPieces(fallingObject) {
    const numberOfPieces = 20; // Nombre de morceaux pour l'explosion
    const rect = fallingObject.getBoundingClientRect();
    const width = fallingObject.clientWidth;
    const height = fallingObject.clientHeight;
  
    for (let i = 0; i < numberOfPieces; i++) {
      const piece = document.createElement('div');
      piece.className = 'explosion-piece';
      
      // Position aléatoire pour chaque morceau
      piece.style.left = `${Math.random() * width}px`;
      piece.style.top = `${Math.random() * height}px`;
  
      // Définir les déplacements aléatoires pour chaque morceau
      piece.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
      piece.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`);
      
      // Réutiliser la couleur de fond de l'objet
      piece.style.backgroundImage = fallingObject.style.backgroundImage;
      
      fallingObject.appendChild(piece);
    }
    
    fallingObject.classList.add('explode');
  
    // Supprimer l'objet après l'animation
    setTimeout(() => {
      fallingObject.remove();
    }, 1000); // Durée de l'animation d'explosion
  }
  
  // Exemple d'appel
  const fallingObject = document.querySelector('.falling-object');
  setTimeout(() => createExplosionPieces(fallingObject), 2000);

  // Joue la musique de fond
  if (backgroundMusic instanceof HTMLAudioElement) {
    backgroundMusic.play();
  } else {
    console.error(
      "Element with id 'background-music' is not an HTMLAudioElement"
    );
  }

  console.log("Script JavaScript chargé avec succès !");
});
//document.addEventListener("DOMContentLoaded", () => {
//  const soundToggleButton = document.getElementById("sound-toggle");
//  let soundEnabled = true; // État initial du son
//
//  // Assurez-vous d'avoir des références aux objets audio dans votre code
//  const moveLeftSound = new Audio('src/assets/sounds/move-left.mp3');
//  const moveRightSound = new Audio('src/assets/sounds/move-right.mp3');
//  // Ajoutez d'autres sons ici si nécessaire
//
//  function toggleSound() {
//    soundEnabled = !soundEnabled;
//    soundToggleButton.textContent = soundEnabled ? '🔊' : '🔇'; // Change l'icône du bouton en fonction de l'état du son
//  }
//
//  function playSound(sound) {
//    if (soundEnabled) {
//      sound.play();
//    }
//  }
//
//  // Écouteur d'événements pour le bouton de contrôle du son
//  soundToggleButton.addEventListener("click", toggleSound);
//
//  // Exemple d'utilisation pour jouer un son
//  function moveCharacter(direction) {
//    if (character && gameCanvas /* && gameArea */) {
//      // Récupère la position actuelle du personnage
//      let left = parseInt(window.getComputedStyle(character).left, 10);
//      const characterRect = character.getBoundingClientRect();
//      const gameAreaRect = gameCanvas.getBoundingClientRect(); //gameArea.getBoundingClientRect();
//      const bottomLimitRect = bottomLimit
//        ? bottomLimit.getBoundingClientRect()
//        : { top: gameCanvas.getBoundingClientRect().bottom };
//
//      if (direction === "left" && characterRect.left > gameAreaRect.left) {
//        // Déplace le personnage à gauche
//        character.style.left = `${Math.max(left - stepSize, 0)}px`;
//        playSound(moveLeftSound); // Joue le son lorsque le personnage se déplace
//      } else if (
//        direction === "right" &&
//        characterRect.right < gameAreaRect.right
//      ) {
//        // Déplace le personnage à droite
//        character.style.left = `${Math.min(
//          left + stepSize,
//          gameAreaRect.width - characterRect.width
//        )}px`;
//        playSound(moveRightSound); // Joue le son lorsque le personnage se déplace
//      }
//      // gestion du saut
//    }
//  }
//
//  // Initialisation du bouton de son
//  soundToggleButton.textContent = soundEnabled ? '🔊' : '🔇'; // Définit l'icône du bouton en fonction de l'état initial du son
//});
//