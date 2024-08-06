const character = document.getElementById("character");
const gameCanvas = document.getElementById("game-canvas");
const bottomLimit = document.getElementById("bottom-limit");
const stepSize = 50; // Taille de l'étape de déplacement en pixels

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
    //let top = parseInt(window.getComputedStyle(character).top, 10);
    const characterRect = character.getBoundingClientRect();
    const gameAreaRect = gameCanvas.getBoundingClientRect(); //gameArea.getBoundingClientRect();
    const bottomLimitRect = bottomLimit
      ? bottomLimit.getBoundingClientRect()
      : { top: gameCanvas.getBoundingClientRect().bottom };

    if (direction === "left" && characterRect.left > gameAreaRect.left) {
      // Déplace le personnage à gauche
      character.style.left = `${Math.max(left - stepSize, 0)}px`;
      // moveLeftSound.play();
    } else if (
      direction === "right" &&
      characterRect.right < gameAreaRect.right
    ) {
      // Déplace le personnage à droite
      character.style.left = `${Math.min(
        left + stepSize,
        gameAreaRect.width - characterRect.width
      )}px`;
      //moveRightSound.play();
    }
    // gestion du saut
    /* else if (direction === "up" && characterRect.top > gameAreaRect.top) {
      // Déplace le personnage vers le haut
      character.style.top = `${Math.max(top - stepSize, 0)}px`;
    } else if (
      direction === "down" &&
      characterRect.bottom < bottomLimitRect.top
    ) {
      // Déplace le personnage vers le bas, mais limite sa descente
      character.style.top = `${Math.min(
        top + stepSize,
        bottomLimitRect.top - characterRect.height
      )}px`;
    } */
  }
}
 // fonction de saut
  // function jump(timestamp) {
  //   if (!character || !gameCanvas) return; // Vérification de nullité

  //   if (!jumpStartTime) jumpStartTime = timestamp;
  //   const elapsed = timestamp - jumpStartTime;
  //   const progress = elapsed / jumpDuration;
  //   const yOffset = jumpHeight * Math.sin(Math.PI * progress); // Mouvement parabolique

  //   // Calculer la nouvelle position du personnage
  //   const characterRect = character.getBoundingClientRect();
  //   const gameAreaRect = gameCanvas.getBoundingClientRect();

  //   const newTop = gameAreaRect.height - characterRect.height - 10 - yOffset;

  //   // Assure que le personnage ne dépasse pas le sol
  //   if (newTop >= gameAreaRect.height - characterRect.height - 10) {
  //     character.style.top = `${gameAreaRect.height - characterRect.height - 10}px`;
  //     isJumping = false;
  //     jumpStartTime = null;
  //   } else {
  //     character.style.top = `${newTop}px`;
  //     requestAnimationFrame(jump);
  //   }
  // }

  // Retiré la fonction handleJump
  // function handleJump() {
  //   if (!isJumping) {
  //     isJumping = true;
  //     requestAnimationFrame(jump);
  //   }
  // }
  
  // Écoute les événements de la touche pressée
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "ArrowLeft") {
      moveCharacter("left");
    } else if (key === "ArrowRight") {
      moveCharacter("right");
    }
    // Retiré la touche zéro pour sauter
    // else if (key === "0") { // touche flèche haut pour sauter
    //   handleJump();
    // }
  });