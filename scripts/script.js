const front = 'card-front';
const back = 'card-back';

startGame();

function startGame() {

  initializeCards(game.creatCardsFromTechs())
}

function initializeCards(cards) {
  let gameBoard = document.getElementById('gameBoard');

  cards.forEach((card) => {

    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add('card');
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard)
    gameBoard.appendChild(cardElement);

  })
}

function createCardContent(card, cardElement) {

  createCardFace(front, card, cardElement);
  createCardFace(back, card, cardElement);
}

function createCardFace(face, card, element) {

  let cardElementFace = document.createElement('div')
  cardElementFace.classList.add(face);
  if (face == front) {
    let iconElement = document.createElement('img');
    iconElement.classList.add('icon');
    iconElement.src = './assets/images/' + card.icon + '.png';
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = '&lt/&gt';
  }
  element.appendChild(cardElementFace);

}

function flipCard() {

  if (game.setCard(this.id)) {
    this.classList.add('flip');
    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        if(game.checkGameOver()){
          let gameOver = document.getElementById('gameOver');
          gameOver.style.display = 'flex';
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id)
          let secondCardView = document.getElementById(game.secondCard.id)

          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');

           game.unflipedCards();
        }, 1000)
      }
    }
  }

}

function restart(){

  location.reload();

}
