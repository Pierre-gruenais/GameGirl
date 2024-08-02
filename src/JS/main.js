document.addEventListener("DOMContentLoaded", () => {
  const gameCanvas = document.getElementById("game-canvas");
  if (!(gameCanvas instanceof HTMLCanvasElement)) {
    console.error(
      "Game canvas element not found or is not an HTMLCanvasElement"
    );
    return;
  }
  const backgroundMusic = document.getElementById("background-music");
  const character = document.getElementById("character");
  const ctx = gameCanvas.getContext("2d");
  const objectFallSpeed = 2; // Vitesse de chute des objets en pixels par frame
  const images = [
    "assets/images/bonbon.png",
    "assets/images/bonboncoeur.png",
    "assets/images/donut.png",
  ];
  const malusImageUrl = "assets/images/carotte.png";

  // nombre de vies au demarrage
  let lives = 3;
  let previousLives = lives;
  // initialise le score à 0
  let score = 0;

  function updateLives() {
    const livesContainer = document.getElementById("lives-container");
    if (livesContainer) {
      livesContainer.innerHTML = "";
      for (let i = 0; i < lives; i++) {
        const lifeIcon = document.createElement("img");
        lifeIcon.src = "assets/images/coeur(1).png"; // Chemin de l'image de vie
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
    document.body.appendChild(fallingObject);

    let top = 0;
    const fallInterval = setInterval(() => {
      top += objectFallSpeed;
      fallingObject.style.top = `${top}px`;

      // Supprime l'objet lorsqu'il atteint le bas
      if (top > window.innerHeight) {
        fallingObject.remove();
        clearInterval(fallInterval);
      }
      detectCollisions(fallingObject);
    }, 1000 / 60); // 60 FPS
  }

  function createMalusObject() {
    const malusObject = document.createElement("div");
    malusObject.className = "malus-object";

    // Utilise l'image spécifiée pour l'objet malus
    malusObject.style.backgroundImage = `url(${malusImageUrl})`;
    malusObject.style.position = "absolute"; // Position absolue pour que les objets tombent
    malusObject.style.left = `${
      Math.random() * (gameCanvas.clientWidth - 50)
    }px`;
    document.body.appendChild(malusObject);

    let top = 0;
    const fallInterval = setInterval(() => {
      top += objectFallSpeed;
      malusObject.style.top = `${top}px`;

      // Supprime l'objet lorsqu'il atteint le bas
      if (top > window.innerHeight) {
        malusObject.remove();
        clearInterval(fallInterval);
      }
      detectCollisions(malusObject);
    }, 1000 / 60);
  }

  // Crée un nouvel objet toutes les 5 secondes
  setInterval(createFallingObject, 5000);

  // Crée un objet malus toutes les 10 secondes
  setInterval(createMalusObject, 10000);

  // Initialise les vies et le score dans l'interface utilisateur
  updateLives();
  updateScore(0);

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
