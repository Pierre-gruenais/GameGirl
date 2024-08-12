document.addEventListener("DOMContentLoaded", () => {
  const character = document.getElementById("character");
  const gameCanvas = document.getElementById("game-canvas");
  const bottomLimit = document.getElementById("bottom-limit");
  const stepSize = 50; // Taille de l'étape de déplacement en pixels

  let isDragging = false;
  let offsetY = 0;
  let offsetX = 0;

  if (character && gameCanvas) {
    // Fonction pour démarrer le déplacement
    function startDrag(event) {
      isDragging = true;

      // Calculer le décalage initial entre la position du personnage et le point de contact
      const touch = event.touches[0];
      const characterRect = character.getBoundingClientRect();
      offsetX = touch.clientX - characterRect.left;
      offsetY = touch.clientY - characterRect.top;

      // Désactiver les comportements par défaut
      event.preventDefault();
    }

    // Fonction pour déplacer le personnage
    function dragCharacter(event) {
      if (isDragging) {
        const touch = event.touches[0];

        // Calculer la nouvelle position du personnage
        const newLeft = touch.clientX - offsetX;
        const newTop = touch.clientY - offsetY;

        // Limiter le mouvement pour ne pas sortir de la zone de jeu
        const gameAreaRect = gameCanvas.getBoundingClientRect();
        const characterRect = character.getBoundingClientRect();

        if (
          newLeft >= gameAreaRect.left &&
          newLeft + characterRect.width <= gameAreaRect.right
        ) {
          character.style.left = `${newLeft}px`;
        }

        if (
          newTop >= gameAreaRect.top &&
          newTop + characterRect.height <= gameAreaRect.bottom
        ) {
          character.style.top = `${newTop}px`;
        }
      }
    }

    // Fonction pour arrêter le déplacement
    function stopDrag() {
      isDragging = false;
    }

    // Ajouter les écouteurs d'événements pour le toucher
    character.addEventListener("touchstart", startDrag);
    character.addEventListener("touchmove", dragCharacter);
    character.addEventListener("touchend", stopDrag);
    character.addEventListener("touchcancel", stopDrag); // En cas d'annulation du toucher
  }
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

  // let startX = 0;
  // let startY = 0;
  // let isTouching = false;

  //  //fonction qui gere le debut du toucher
  //  function handleTouchStart(event) {
  //    if (event.touches.length === 1) {
  //      startX = event.touches[0].clientX;
  //      startY = event.touches[0].clientY;
  //      isTouching = true;
  //    }
  //  }

  //  //fonction pour gerer le mouvement du toucher
  //  function handleTouchMove(event) {
  //    if (isTouching && event.touches.length === 1) {
  //      const currentX = event.touches[0].clientX;
  //      const currentY = event.touches[0].clientY;
  //
  //      const deltaX = currentX - startX;
  //      const deltaY = currentY - startY;
  //
  //      // determiner la direction du glissement
  //      if (Math.abs(deltaX) > Math.abs(deltaY)) {
  //        if (deltaX > 0) {
  //          //glisement vers la droite
  //          moveCharacter("right");
  //        } else {
  //          // glissement vers la gauche
  //          moveCharacter("left");
  //        }
  //      }
  //      //met a jour les points de depart
  //      startX = currentX;
  //      startY = currentY;
  //    }
  //  }
  //
  //  //fonction pour gerer la fin du toucher
  //  function handleTouchEnd(event) {
  //    isTouching = false;
  //  }
  // // // Ajouter les écouteurs d'événements tactiles
  // // gameCanvas.addEventListener("touchstart", handleTouchStart);
  // // gameCanvas.addEventListener("touchmove", handleTouchMove);
  // gameCanvas.addEventListener("touchend", handleTouchEnd);

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
