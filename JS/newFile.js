// main.js
// Inclure la logique principale de votre jeu, y compris la gestion du déplacement du personnage,
// la génération des objets qui tombent, la détection de collision, et la gestion du score.
document.addEventListener("DOMContentLoaded", () => {
  const character = document.getElementById("character");
  const gameArea = document.getElementById("game-area");
  const stepSize = 10; // Taille de l'étape de déplacement en pixels

  // Fonction pour déplacer le personnage
  function moveCharacter(direction) {
    // Vérifie si le personnage est présent
    if (!character) {
      console.error("Character element not found");
      return;
    }

    // Récupère la position actuelle du personnage
    let left = parseInt(window.getComputedStyle(character).left, 10);
    let top = parseInt(window.getComputedStyle(character).top, 10);

    const characterRect = character.getBoundingClientRect();
    const gameAreaRect = gameArea.getBoundingClientRect();

    if (direction === "left" && characterRect.left > gameAreaRect.left) {
      // Déplace le personnage à gauche
      character.style.left = `${left - stepSize}px`;
    } else if (
      direction === "right" &&
      characterRect.right < gameAreaRect.right
    ) {
      //   // Déplace le personnage à droite
      character.style.left = `${left + stepSize}px`;
    } else if (direction === "up" && characterRect.top > gameAreaRect.top) {
      //   // Déplace le personnage vers le haut
      character.style.top = `${top - stepSize}px`;
    } else if (
      direction === "down" &&
      characterRect.bottom < gameAreaRect.bottom
    ) {
      //   // Déplace le personnage vers le bas
      character.style.top = `${top + stepSize}px`;
      // }
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
  }
});
