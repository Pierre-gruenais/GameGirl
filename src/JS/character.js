document.addEventListener("DOMContentLoaded", () => {
  const character = document.getElementById("character");
  const gameCanvas = document.getElementById("game-canvas");
  const bottomLimit = document.getElementById("bottom-limit");
  const stepSize = 50; // Taille de l'étape de déplacement en pixels
  const moveSpeed = 0.2; //vitesse du deplacement tactile

//  const moveLeftSound = new Audio('src/assets/sounds/move-left.mp3');
//  const moveRightSound = new Audio('src/assets/sounds/move-right.mp3');
//  // Ajoutez d'autres sons ici si nécessaire

  // Fonction pour initialiser la position du personnage
  function initializeCharacterPosition() {
    if (character && gameCanvas) {
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
  function moveCharacter(deltaX) {
    if (character && gameCanvas /* && gameArea */) {
      // Récupère la position actuelle du personnage
      let left = parseInt(window.getComputedStyle(character).left, 10);
      //let top = parseInt(window.getComputedStyle(character).top, 10);
      const characterRect = character.getBoundingClientRect();
      const gameAreaRect = gameCanvas.getBoundingClientRect(); //gameArea.getBoundingClientRect();
      const bottomLimitRect = bottomLimit
        ? bottomLimit.getBoundingClientRect()
        : { top: gameCanvas.getBoundingClientRect().bottom };
      // Appliquer un facteur de vitesse pour le mouvement tactile
    const moveAmount = deltaX * moveSpeed;

     // Limiter le mouvement pour éviter que le personnage ne sorte des limites
     let newLeft = left + moveAmount;
     newLeft = Math.max(0, Math.min(newLeft, gameAreaRect.width - characterRect.width));
     character.style.left = `${newLeft}px`;

      if (direction === "left" && characterRect.left > gameAreaRect.left) {
        // Déplace le personnage à gauche
        character.style.left = `${Math.max(left - stepSize, 0)}px`;
        // moveLeftSound.play();
        //        playSound(moveLeftSound); // Joue le son lorsque le personnage se déplace
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
        //        playSound(moveRightSound); // Joue le son lorsque le personnage se déplace
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
  let startX = 0;
  let lastX = 0;
  let startY = 0;
  let isTouching = false;

  //fonction qui gere le debut du toucher
  function handleTouchStart(event) {
    if (event.touches.length === 1) {
      startX = event.touches[0].clientX;
      lastX = startX; // Initialiser lastX pour éviter les mouvements brusques
      startY = event.touches[0].clientY;
      isTouching = true;
    }
  }

  //fonction pour gerer le mouvement du toucher
  function handleTouchMove(event) {
    if (isTouching && event.touches.length === 1) {
      const currentX = event.touches[0].clientX;
      const currentY = event.touches[0].clientY;

      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      moveCharacter(deltaX);

      lastX = currentX; // Mise à jour de lastX pour le prochain mouvement

      // determiner la direction du glissement
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          //glisement vers la droite
          moveCharacter("right");
        } else {
          // glissement vers la gauche
          moveCharacter("left");
        }
      }
      //met a jour les points de depart
      startX = currentX;
      startY = currentY;
    }
  }

  //fonction pour gerer la fin du toucher
  function handleTouchEnd(event) {
    isTouching = false;
  }
  // Ajouter les écouteurs d'événements tactiles
  gameCanvas.addEventListener("touchstart", handleTouchStart);
  gameCanvas.addEventListener("touchmove", handleTouchMove);
  gameCanvas.addEventListener("touchend", handleTouchEnd);

  console.log("Événements tactiles ajoutés avec succès !");

  //initializeCharacterPosition();

  // Écoute les événements de la touche clavier pressée
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

});
