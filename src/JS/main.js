// Initialiser le Score

document.addEventListener("DOMContentLoaded", () => {
  const gameCanvas = document.getElementById("game-canvas");
  const ctx = gameCanvas.getContext("2d");
  const objectFallSpeed = 0.5; // Vitesse de chute des objets en pixels par frame
  const objectSize = 50; // Taille des objets tombants

  let score = 0; // initialiser le score

  // Vérifie si les éléments existent
  if (!gameCanvas) {
    console.error("Game canvas element not found");
    return;
  }

  //fonction pour mettre a jour le score et afficher dans l'interface utilisateur
  function updateScore(points) {
    score += points;
    const scoreElement = document.getElementById("score-value");
    if (scoreElement) {
      scoreElement.textContent = score.toString();
    } else {
      console.error("Element with id 'score-value' not found");
    }
  }
  updateScore(0);

  // Charger l'image
  const objectImage = new Image();
  objectImage.src = "/src/assets/images/bonbon.jpg"; // Ajustez le chemin selon la structure de votre projet

  // liste des objets tombants
  let fallingObjects = [];

  //Fonction pour generer un objet qui tombe
  function generateFallingObject() {
    return {
      x: Math.random() * gameCanvas.clientWidth,
      y: 0,
      width: objectSize,
      height: objectSize,
      speed: objectFallSpeed,
    };
  }
  // Fonction pour animer les objets tombants
  function animateFallingObjects() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Efface le canvas
    fallingObjects.forEach((obj) => {
      obj.y += obj.speed;
      ctx.fillStyle = "blueviolet"; // Couleur des objets tombants
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height); // Dessine l'objet
    });
    // Supprime les objets qui sont sortis du canvas
    fallingObjects = fallingObjects.filter((obj) => obj.y < gameCanvas.height);
    requestAnimationFrame(animateFallingObjects);
  }

  // generer un nouvel objet qui tombe toutes les 20 secondes
  setInterval(() => {
    fallingObjects.push(generateFallingObject());
  }, 1000);
  // Démarrer l'animation après que l'image est chargée
  objectImage.onload = () => {
    animateFallingObjects();
  };

  //Démarre l'animation
  animateFallingObjects();
});

console.log("Script JavaScript chargé avec succès !");
//Fonction pour detecter les collisions entre le personnage et les objets
function detectCollisions() {
  // Vérifier si le personnage entre en collision avec un objet
  // Si oui, augmenter le score et supprimer l'objet de la scène
}

//utiliser des fonctions de minuterie
// (comme setInterval) pour générer périodiquement des objets qui tombent.
//Pour la détection de collision, vous devrez vérifier si les rectangles englobants du personnage et des objets se chevauchent.
//Vous devrez utiliser des événements JavaScript pour détecter les entrées utilisateur pour le déplacement du personnage.
