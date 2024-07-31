// Initialiser le Score

document.addEventListener("DOMContentLoaded", () => {
  const gameCanvas = document.getElementById("game-canvas");
  const ctx = gameCanvas.getContext("2d");
  const objectFallSpeed = 2; // Vitesse de chute des objets en pixels par frame
  const images = [
    "assets/images/bonbon.png",
    "assets/images/bonboncoeur.png",
    "assets/images/donut.png",
  ];
  const malusImageUrl = "assets/images/carotte.png"; 
  

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



  function createFallingObject() {
    const fallingObject = document.createElement("div");
    fallingObject.className = "falling-object";

    //selectionne une image aléatoire
    const randomImage = images[Math.floor(Math.random() * images.length)];
    fallingObject.style.backgroundImage = `url(${randomImage})`;

    //positionne l'objet à une position horizontale aléatoire
    fallingObject.style.left = `${Math.random() * (gameCanvas.clientWidth - 50)}px`; // Position aléatoire sur l'axe X
    document.body.appendChild(fallingObject);

    let top = 0;
    const fallInterval = setInterval(() => {
      top += objectFallSpeed;
      fallingObject.style.top = `${top}px`;

      // supprime l'objet lorsqu'il atteint le bas
      if (top > window.innerHeight) {
        fallingObject.remove();
        clearInterval(fallInterval);
      }
      detectCollisions();
    }, 1000 / 60); // 60 FPS
  }
  function createMalusObject(){
    const malusObject = document.createElement("div");
      malusObject.className = "malus-object";
  
      //utilise l'image specifiée pour l'objet malus
      malusObject.style.backgroundImage = `url(${malusImageUrl})`;
  
      
    malusObject.style.left = `${Math.random() * (gameCanvas.width - 50)}px`;
    document.body.appendChild(malusObject);
  
    let top = 0;
    const fallInterval = setInterval(() => {
      top += objectFallSpeed;
      malusObject.style.top = `${top}px`;
  
      if (top > gameCanvas.height){
        malusObject.remove();
        clearInterval(fallInterval)
      }
      detectCollisions();
    }, 1000 / 60);
    }



  // Crée un nouvel objet toutes les secondes
  setInterval(createFallingObject, 5000);
  
  // Crée un objet malus toutes les 10 secondes
  setInterval(createMalusObject, 10000);
});


console.log("Script JavaScript chargé avec succès !");
//Fonction pour detecter les collisions entre le personnage et les objets
function detectCollisions() {
  const fallingObjects = document.querySelectorAll(".falling-object");
  const malusObjects = document.querySelectorAll(".malus-object");

  fallingObjects.forEach(fallingObject => {
    const fallingRect = fallingObject.getBoundingClientRect();

    // Vérifier si l'objet tombant entre en collision avec un objet malus
    const collisionDetected = Array.from(malusObjects).some(malusObject => {
      const malusRect = malusObject.getBoundingClientRect();
      return(
        fallingRect.left < malusRect.right &&
          fallingRect.right > malusRect.left &&
          fallingRect.top < malusRect.bottom &&
          fallingRect.bottom > malusRect.top
      );
    });
    if (collisionDetected) {
      updateScore(-10); // Exemple : perdre 10 points pour chaque collision avec un malus
      fallingObject.remove();
    }
  });
  // Vérifier si le personnage entre en collision avec un objet
  // Si oui, augmenter le score et supprimer l'objet de la scène
}
console.log("Script JavaScript chargé avec succès !");


//utiliser des fonctions de minuterie
// (comme setInterval) pour générer périodiquement des objets qui tombent.
//Pour la détection de collision, vous devrez vérifier si les rectangles englobants du personnage et des objets se chevauchent.
//Vous devrez utiliser des événements JavaScript pour détecter les entrées utilisateur pour le déplacement du personnage.
