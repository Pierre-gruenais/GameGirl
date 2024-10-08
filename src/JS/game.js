// game.js
document.addEventListener("DOMContentLoaded", () => {
  const gameCanvas = document.getElementById("game-canvas");
  const startButton = document.getElementById("start-button");
  const introOverlay = document.getElementById("intro-overlay");
  const backgroundMusic = document.getElementById("background-music");
  const gameOverOverlay = document.getElementById("game-over-overlay");
  const restartButton = document.getElementById("restart-button");
  const finalScoreElement = document.getElementById("final-score");
  let soundEnabled = true;
  let lives = 3;
  let previousLives = lives;
  let score = 0;
  let gameStarted = false;

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

  backgroundMusic.volume = 0.1;

  function startGame() {
    if (introOverlay) {
      introOverlay.style.display = "none";
      backgroundMusic
        .play()
        .catch((err) => console.error("Failed to play background music:", err));

      setInterval(createFallingObject, 5000);
      setInterval(createMalusObject, 10000);
      updateLives();
      updateScore(0);
      gameStarted = true;
    }
  }

  function showGameOver() {
    if (finalScoreElement) {
      finalScoreElement.textContent = `Score: ${score}`; // affichage du score dans le bandeau game over
    }
    gameOverOverlay.style.display = "flex";
    gameStarted = false; // arrete le jeu
  }

  function restartGame() {
    lives = 3;
    score = 0;
    updateLives();
    updateScore(0);
    gameOverOverlay.style.display = "none"; // Cache le bandeau Game Over
    gameStarted = true;
    // Réinitialiser les objets qui tombent, si nécessaire
    // setInterval(createFallingObject, 5000);
    // setInterval(createMalusObject, 10000);
  }

  //gestion du bouton restart
  if (restartButton) {
    restartButton.addEventListener("click", restartGame);
  }

  function updateLives() {
    const livesContainer = document.getElementById("lives-container");
    if (livesContainer) {
      livesContainer.innerHTML = "";
      for (let i = 0; i < lives; i++) {
        const lifeIcon = document.createElement("img");
        lifeIcon.src = "src/assets/images/coeur(1).png";
        lifeIcon.className = "life-icon";
        livesContainer.appendChild(lifeIcon);
      }
      if (lives < previousLives) {
        const lostLifeIcon = livesContainer.children[lives];
        if (lostLifeIcon) {
          lostLifeIcon.classList.add("lost-life");
          setTimeout(() => {
            lostLifeIcon.remove();
          }, 500);
        }
      }
      previousLives = lives;
    }
  }

  function updateScore(points) {
    score += points;
    const scoreElement = document.getElementById("score-value");
    if (scoreElement) {
      scoreElement.textContent = score.toString();
    }
  }

  function detectCollisions(fallingObject) {
    const character = document.getElementById("character");
    const characterRect = character.getBoundingClientRect();
    const objectRect = fallingObject.getBoundingClientRect();

    if (
      characterRect.left < objectRect.right &&
      characterRect.right > objectRect.left &&
      characterRect.top < objectRect.bottom &&
      characterRect.bottom > objectRect.top
    ) {
      if (fallingObject.className === "falling-object") {
        updateScore(1);
      } else if (fallingObject.className === "malus-object") {
        lives -= 1;
        updateLives();
        if (lives <= 0) {
          // alert("Game over");
          showGameOver(); //bandeau game over
        }
      }
      fallingObject.remove();
    }
  }

  function getFallSpeed() {
    if (score >= 50) {
      return Math.random() * 6 + Math.pow(score, 1.05) / 10; // vitesse exponentielle a partir de 60 points
    } else if (score >= 40) {
      return Math.random() * 5.5 + 2.5; // vitesse plus rapide a partir de  40 points
    } else if (score >= 30) {
      return Math.random() * 5 + 2; // vitesse plus rapide a partir de 30 points
    } else if (score >= 20) {
      return Math.random() * 4 + 2; // vitesse plus rapide a partir de  20 points
    } else if (score >= 10) {
      return Math.random() * 3 + 1.5; // vitesse plus rapide a 10 points
    } else {
      return Math.random() * 2 + 1; //vitesse de base
    }
  }

  function createFallingObject() {
    if (!gameStarted) return;
    const fallingObject = document.createElement("div");
    fallingObject.className = "falling-object";
    const randomImage = images[Math.floor(Math.random() * images.length)];
    fallingObject.style.backgroundImage = `url(${randomImage})`;
    fallingObject.style.left = `${
      Math.random() * (gameCanvas.clientWidth - 50)
    }px`;
    fallingObject.style.top = "0px";
    document.body.appendChild(fallingObject);

    let top = 0;
    const fallSpeed = getFallSpeed();
    const fallInterval = setInterval(() => {
      top += fallSpeed;
      fallingObject.style.top = `${top}px`;
      detectCollisions(fallingObject);

      if (top > window.innerHeight - fallingObject.clientHeight) {
        clearInterval(fallInterval);
        fallingObject.remove();
      }
    }, 1000 / 60);
  }

  function createMalusObject() {
    if (!gameStarted) return;
    const malusObject = document.createElement("div");
    malusObject.className = "malus-object";
    const randomMalusImage =
      malusImageUrl[Math.floor(Math.random() * malusImageUrl.length)];
    malusObject.style.backgroundImage = `url(${randomMalusImage})`;
    malusObject.style.left = `${
      Math.random() * (gameCanvas.clientWidth - 50)
    }px`;
    malusObject.style.top = "0px";
    document.body.appendChild(malusObject);

    let top = 0;
    const fallSpeed = getFallSpeed();
    const fallInterval = setInterval(() => {
      top += fallSpeed;
      malusObject.style.top = `${top}px`;
      detectCollisions(malusObject);

      if (top > window.innerHeight - malusObject.clientHeight) {
        clearInterval(fallInterval);
        malusObject.remove();
      }
    }, 1000 / 60);
  }

  if (startButton && introOverlay) {
    startButton.addEventListener("click", startGame);
  }
});
