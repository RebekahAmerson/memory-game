/*
 * Create a list that holds all of your cards
 */


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
let moveCounter = document.querySelector('.moves').innerHTML; //move counter
let gameBoard = document.querySelectorAll('.card'); //array of all cards
let flippedCards = []; //cards that have been flipped
let matchedCards = []; //cards that are matched
const resetIcon = document.querySelector('.restart'); //reset icon

function flipCard(e) {
  e.target.classList.add('open', 'show');
}

function pickCard(card) {
  if (!card.classList.contains('open') && !card.classList.contains('match')) {
  flippedCards.push(card);
}}

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
    gameBoard[index].classList.remove('open', 'show', 'match');
  });
}
document.querySelector('.deck').addEventListener('click', flipCard);
resetIcon.addEventListener('click', reset);
