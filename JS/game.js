//const moveLeftSound = new Audio("/src/assets/sound/move.mp3");
//const moveRightSound = new Audio("/src/assets/sound/move.mp3");

document.addEventListener("DOMContentLoaded", () => {
  const character = document.getElementById("character");
  //const gameArea = document.getElementById("game-area");
  const gameCanvas = document.getElementById("game-canvas");
 

  
  //const objectFallSpeed = 2; // Vitesse de chute des objets en pixels par frame

  const startButton = document.getElementById("start-button");
  const introOverlay = document.getElementById("intro-overlay");

  let gameStarted = false; // Variable pour suivre l'état du jeu

  // Fonction pour démarrer le jeu
  function startGame() {
    if (introOverlay) {
      introOverlay.style.display = "none"; // Cache le bandeau d'accueil
      console.log("bandeau caché !");
      // Ajoutez ici l'initialisation ou le démarrage du jeu
      // Par exemple, vous pouvez commencer à créer des objets qui tombent, etc.
      console.log("Jeu démarré !");
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

  // Vérifie si les éléments existent
  if (!character || !gameCanvas || !bottomLimit) {
    // && !gameArea
    console.error("Character, game area, or game canvas element not found");
    return;
  }

  // Fonction pour redimensionner le canvas
  //function resizeCanvas() {
  //  if (
  //    gameCanvas instanceof HTMLCanvasElement // && gameArea instanceof HTMLElement
  //  ) {
  //    gameCanvas.width = window.innerWidth; //gameArea.clientWidth;
  //    gameCanvas.height = window.innerHeight; //gameArea.clientHeight;
  //  }
  //}

 

 

 
a
  // Redimensionne le canvas et initialise la position du personnage au chargement et lors du redimensionnement de la fenêtre
  window.addEventListener("resize", () => {
    // resizeCanvas();
    initializeCharacterPosition();
  });

  // Initialisation au chargement
  //resizeCanvas();
  // initializeCharacterPosition();

  // Démarrer l'animation des objets tombants
  //setInterval(generateFallingObject, 1000); // Génère un nouvel objet toutes les secondes
  // animateFallingObjects();
});

console.log("Script Javascript chargé avec succès !");
