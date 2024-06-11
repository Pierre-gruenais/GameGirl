//inclure la logique principale de votre jeu, y compris la gestion du déplacement du personnage, la génération des objets qui tombent, la détection de collision, et la gestion du score.
document.addEventListener('DomContentLoaded',() => {
  const character = document.getElementById('character');
  const stepSize = 10; //taille de l'etape de deplacement en pixels

  //fonction pour depllacer le personnage
function moveCharacter(direction) {
  //recupere la position actuelle du personnage
  if(!character){
    console.error('character element not found');
    return;
  }

  //recupere la position actuelle du personnage
  let left = parseInt(window.getComputedStyle(character).left);

  if (direction === 'left'){
    //deplace le personnage a gauche
    character.style.left = `${left - stepSize}px`;
  }else if (direction === 'right'){
    //deplace le personnage a droite
    character.style.left = `${left + stepSize}px`;
  }
  // Déplacer le personnage horizontalement
  // Mettre à jour la position du personnage en fonction de la direction
}
//ecoute les evenements de la touche pressée
document.addEventListener('keydown',(event) => {
  const key = event.key;

  if (key === 'ArrowLeft'){
    moveCharacter('left');
  }else if (key === 'ArrowRight'){
    moveCharacter('right');
  }
});
});