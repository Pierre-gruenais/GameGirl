console.log("Script JavaScript chargé avec succès !");
// Initialiser le Score

let score = 0;
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
updateScore(10);

//Fonction pour generer un objet qui tombe
function generateFallingObject() {
  // Créer un nouvel objet qui tombe et l'ajouter à la scène
  // Animer l'objet en le faisant descendre verticalement
}

//Fonction pour detecter les collisions entre le personnage et les objets
function detectCollisions() {
  // Vérifier si le personnage entre en collision avec un objet
  // Si oui, augmenter le score et supprimer l'objet de la scène
}

//utiliser des fonctions de minuterie
// (comme setInterval) pour générer périodiquement des objets qui tombent.
//Pour la détection de collision, vous devrez vérifier si les rectangles englobants du personnage et des objets se chevauchent.
//Vous devrez utiliser des événements JavaScript pour détecter les entrées utilisateur pour le déplacement du personnage.
