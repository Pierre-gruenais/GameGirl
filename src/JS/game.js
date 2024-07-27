document.addEventListener("DOMContentLoaded", () => {
  const character = document.getElementById("character");
  //const gameArea = document.getElementById("game-area");
  const gameCanvas = document.getElementById("game-canvas");
  const bottomLimit = document.getElementById("bottom-limit");
  const stepSize = 30; // Taille de l'étape de déplacement en pixels

  // Vérifie si les éléments existent
  if (!character || !gameCanvas || !bottomLimit) {
    // && !gameArea
    console.error("Character, game area, or game canvas element not found");
    return;
  }

  // Fonction pour redimensionner le canvas
  function resizeCanvas() {
    if (
      gameCanvas instanceof HTMLCanvasElement // && gameArea instanceof HTMLElement
    ) {
      gameCanvas.width = window.innerWidth; //gameArea.clientWidth;
      gameCanvas.height = window.innerHeight; //gameArea.clientHeight;
    }
  }

  // Fonction pour initialiser la position du personnage
  function initializeCharacterPosition() {
    if (character && gameCanvas /* && gameArea */) {
      const gameAreaRect = gameCanvas.getBoundingClientRect(); //gameArea.getBoundingClientRect();
      const characterRect = character.getBoundingClientRect();

      // Positionne le personnage au bas de la zone de jeu, centré horizontalement
      character.style.left = `${
        (gameAreaRect.width - characterRect.width) / 2
      }px`;
      character.style.top = `${
        gameAreaRect.height - characterRect.height - 10
      }px`;
    }
  }

  // Fonction pour déplacer le personnage
  function moveCharacter(direction) {
    if (character && gameCanvas /* && gameArea */) {
      // Récupère la position actuelle du personnage
      let left = parseInt(window.getComputedStyle(character).left, 10);
      ///let top = parseInt(window.getComputedStyle(character).top, 10);

      const characterRect = character.getBoundingClientRect();
      const gameAreaRect = gameCanvas.getBoundingClientRect(); //gameArea.getBoundingClientRect();
      const bottomLimitRect = bottomLimit
        ? bottomLimit.getBoundingClientRect()
        : { top: gameCanvas.getBoundingClientRect().bottom };

      if (direction === "left" && characterRect.left > gameAreaRect.left) {
        // Déplace le personnage à gauche
        character.style.left = `${Math.max(left - stepSize, 0)}px`;
      } else if (
        direction === "right" &&
        characterRect.right < gameAreaRect.right
      ) {
        // Déplace le personnage à droite
        character.style.left = `${Math.min(
          left + stepSize,
          gameAreaRect.width - characterRect.width
        )}px`;
      } /*else if (direction === "up" && characterRect.top > gameAreaRect.top) {
        // Déplace le personnage vers le haut
        character.style.top = `${Math.max(top - stepSize, 0)}px`;
      } // Déplace le personnage vers le bas, mais limite sa descente
      else if (
        direction === "down" &&
        characterRect.bottom < bottomLimitRect.top
      ) {
        character.style.top = `${Math.min(
          top + stepSize,
          bottomLimitRect.top - characterRect.height
        )}px`;
      }*/
    }
  }

  // Écoute les événements de la touche pressée
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "ArrowLeft") {
      moveCharacter("left");
    } else if (key === "ArrowRight") {
      moveCharacter("right");
    } else if (key === "ArrowUp") {
      moveCharacter("up");
    } else if (key === "ArrowDown") {
      moveCharacter("down");
    }
  });

  // Redimensionne le canvas et initialise la position du personnage au chargement et lors du redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    resizeCanvas();
    initializeCharacterPosition();
  });

  // Initialisation au chargement
  resizeCanvas();
  initializeCharacterPosition();
});

console.log("Script Javascript chargé avec succès !");
