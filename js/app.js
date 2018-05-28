let moveCounter = document.querySelector('.moves').innerHTML; //move counter
let gameBoard = document.querySelectorAll('.card'); //array of all cards
let flippedCards = []; //cards that have been flipped
let matchedCards = []; //cards that are matched
const resetIcon = document.querySelector('.restart'); //reset icon

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//contains all game parts.
function playGame(e) {
  flipCard(e);
  if (flippedCards.length === 2) {
    matchCard(flippedCards);
    setTimeout(resetFlippedArray, 1000);

  }
}

//takes card and if it isn't already flipped and not an icon, adds it to the flipped cards array.
function flipCard(e) {
  if (!e.target.classList.contains('open') && !e.target.classList.contains('match') && (e.target.nodeName != 'I')) {
    flippedCards.push(e.target);
    e.target.classList.add('open');
}}

//compares symbol on card to each other.
function matchCard(array) {
  card1 = array[0].firstElementChild.classList.value;
  card2 = array[1].firstElementChild.classList.value;
    if (card1 === card2) {
      array.forEach(function(element, index) {
        array[index].classList.add('match');
        array[index].classList.remove('open');
      })
    }
    else {
      array.forEach(function(element, index) {
        array[index].classList.add('different');
        array[index].classList.remove('open');
    })
}}

//resets cards that are not matched.
function resetFlippedArray() {
  flippedCards.forEach(function(element,index) {
    flippedCards[index].classList.remove('open', 'different');
})
  flippedCards = [];
}

function starRating() {
  if (moveCounter >= 12) {
    document.querySelector('.stars i').classList.add('far');
    document.querySelector('.stars i').classList.remove('fa');
  }
  if (moveCounter > 16) {
    document.querySelectorAll('.stars i')[1].classList.add('far');
    document.querySelectorAll('.stars i')[1].classList.remove('fa');
  }
}

function moveCount() {
  moveCounter++;
  document.querySelector('.moves').innerHTML = moveCounter;
}

function reset() {
  document.querySelectorAll('.stars i')[1].classList.add('fa');
  document.querySelectorAll('.stars i')[1].classList.remove('far');
  document.querySelectorAll('.stars i')[0].classList.add('fa');
  document.querySelectorAll('.stars i')[0].classList.remove('far');
  gameBoard.forEach(function(element,index) {
    gameBoard[index].classList.remove('open', 'match', 'different');
  });
  flippedCards = [];
}

gameBoard.forEach(function(card) {
  card.addEventListener('click', playGame);
});
// document.querySelectorAll('.deck .card').addEventListener('click', flipCard);
resetIcon.addEventListener('click', reset);
