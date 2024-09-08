// character.js
document.addEventListener("DOMContentLoaded", () => {
  const character = document.getElementById("character");
  const gameCanvas = document.getElementById("game-canvas");
  const bottomLimit = document.getElementById("bottom-limit");
  const stepSize = 50; // Taille de l'étape de déplacement en pixels
  let isDragging = false;
  let offsetX = 0;

  if (character && gameCanvas) {
    // Fonction pour démarrer le déplacement
    function startDrag(event) {
      isDragging = true;

       // Calculer le décalage initial entre la position du personnage et le point de contact
      const touch = event.touches[0];
      const characterRect = character.getBoundingClientRect();
      offsetX = touch.clientX - characterRect.left;
      event.preventDefault();
    }

    // Fonction pour déplacer le personnage
    function dragCharacter(event) {
      if (isDragging) {
        const touch = event.touches[0];
        const newLeft = touch.clientX - offsetX;
        const gameAreaRect = gameCanvas.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        if (newLeft >= gameAreaRect.left && newLeft + characterRect.width <= gameAreaRect.right) {
          character.style.left = `${newLeft}px`;
        }
      }
    }
     // Fonction pour arrêter le déplacement
    function stopDrag() {
      isDragging = false;
    }

     // écouteurs d'événements pour le toucher
    character.addEventListener("touchstart", startDrag);
    character.addEventListener("touchmove", dragCharacter);
    character.addEventListener("touchend", stopDrag);
    character.addEventListener("touchcancel", stopDrag);
  }

  // Fonction pour initialiser la position du personnage
  function initializeCharacterPosition() {
    if (character && gameCanvas) {
      const gameAreaRect = gameCanvas.getBoundingClientRect();
      const characterRect = character.getBoundingClientRect();
      character.style.left = `${(gameAreaRect.width - characterRect.width) / 2}px`;
      character.style.top = `${gameAreaRect.height - characterRect.height - 10}px`;
    }
  }

  function moveCharacter(direction) {
    if (character && gameCanvas) {
      let left = parseInt(window.getComputedStyle(character).left, 10);
      const characterRect = character.getBoundingClientRect();
      const gameAreaRect = gameCanvas.getBoundingClientRect();
      const bottomLimitRect = bottomLimit ? bottomLimit.getBoundingClientRect() : { top: gameCanvas.getBoundingClientRect().bottom };

      if (direction === "left" && characterRect.left > gameAreaRect.left) {
        character.style.left = `${Math.max(left - stepSize, 0)}px`;
      } else if (direction === "right" && characterRect.right < gameAreaRect.right) {
        character.style.left = `${Math.min(left + stepSize, gameAreaRect.width - characterRect.width)}px`;
      }
    }
  }

  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "ArrowLeft") {
      moveCharacter("left");
    } else if (key === "ArrowRight") {
      moveCharacter("right");
    }
  });
});
