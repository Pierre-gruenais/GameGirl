// game.js
document.addEventListener("DOMContentLoaded", () => {
  const gameCanvas = document.getElementById("game-canvas");
  const startButton = document.getElementById("start-button");
  const introOverlay = document.getElementById("intro-overlay");
  const backgroundMusic = document.getElementById("background-music");
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
      backgroundMusic.play().catch((err) => console.error("Failed to play background music:", err));

      setInterval(createFallingObject, 5000);
      setInterval(createMalusObject, 10000);
      updateLives();
      updateScore(0);
      gameStarted = true;
    }
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

    if (characterRect.left < objectRect.right && characterRect.right > objectRect.left &&
      characterRect.top < objectRect.bottom && characterRect.bottom > objectRect.top) {
      if (fallingObject.className === "falling-object") {
        updateScore(1);
      } else if (fallingObject.className === "malus-object") {
        lives -= 1;
        updateLives();
        if (lives <= 0) {
          alert("Game over");
        }
      }
      fallingObject.remove();
    }
  }

  function createFallingObject() {
    if (!gameStarted) return;
    const fallingObject = document.createElement("div");
    fallingObject.className = "falling-object";
    const randomImage = images[Math.floor(Math.random() * images.length)];
    fallingObject.style.backgroundImage = `url(${randomImage})`;
    fallingObject.style.left = `${Math.random() * (gameCanvas.clientWidth - 50)}px`;
    fallingObject.style.top = "0px";
    document.body.appendChild(fallingObject);

    let top = 0;
    const fallSpeed = Math.random() * 2 + 1;
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
    const randomMalusImage = malusImageUrl[Math.floor(Math.random() * malusImageUrl.length)];
    malusObject.style.backgroundImage = `url(${randomMalusImage})`;
    malusObject.style.left = `${Math.random() * (gameCanvas.clientWidth - 50)}px`;
    malusObject.style.top = "0px";
    document.body.appendChild(malusObject);

    let top = 0;
    const fallSpeed = Math.random() * 2 + 1;
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
