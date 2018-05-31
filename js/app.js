let moveCounter = document.querySelector('.moves').innerHTML; //move counter
const cardNL = document.querySelectorAll('.card'); //nodelist of all cards
let gameBoard = [...cardNL]; //array of cards from the nodelist
let flippedCards = []; //cards that have been flipped
let matchedCards = []; //cards that are matched
const resetIcon = document.querySelector('.restart'); //reset icon
const playAgain = document.querySelector('button'); //play again button
const congratsMoves = document.querySelector('#congrats-text .moves');
const congratsTimer = document.querySelector('#congrats-text #timer-text');
const congratsStars = document.querySelectorAll('#score li');
let runTime; //variable for set interval

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

//contains all game parts.
function playGame(e) {
  flipCard(e);
  if (flippedCards.length === 2) {
    setTimeout(matchCard, 300);
    setTimeout(resetFlippedArray, 1000);
    moveCount();
    starRating();
    setTimeout(checkWin, 300);
  }
}

//runs shuffle function and transfers values to page.
function setGameBoard() {
  const oldUL = document.querySelector('.deck');
  const myUL = document.createElement('ul');

  myUL.classList.add('deck');
  shuffle(gameBoard);

  gameBoard.forEach(function(element, index) {
    const newLI = document.createElement('li');
    const symbol = gameBoard[index].innerHTML;

    newLI.innerHTML = symbol;
    newLI.classList.add('card');
    myUL.appendChild(newLI);
  });
  oldUL.parentNode.replaceChild(myUL, oldUL);

  const newGameBoard = document.querySelectorAll('.card');
  newGameBoard.forEach(function(card) { //set event listeners for shuffled deck
    card.addEventListener('click', playGame);

  document.querySelector('.deck').addEventListener('click', timer);
  });
}

//game timer, started on first click of a card
function timer() {
  document.querySelector('.deck').removeEventListener('click', timer);
  let time = 0;
  runTime = setInterval (function(){
    time++;
    let sec = (time % 60);
    let min = Math.floor(time/60);
    let hour = Math.floor((time/60)/60);

    document.querySelector('#timer-text').innerText = format(hour) +':' +format(min) +':' +format(sec);
  }, 1000);
}

//formatting timer numbers.
function format(x) {
  if (x < 10) {
    x = "0" +x;
  }
  return x;
}

//takes card and if it isn't already flipped and not an icon, adds it to the flipped cards array.
function flipCard(e) {
  if (!e.target.classList.contains('open') && !e.target.classList.contains('match') && (e.target.nodeName != 'I')) {
    flippedCards.push(e.target);
    e.target.classList.add('open');
}}

//compares symbol on card to each other.
function matchCard() {
  const card1 = flippedCards[0].firstElementChild.classList.value;
  const card2 = flippedCards[1].firstElementChild.classList.value;

    if (card1 === card2) {
      flippedCards.forEach(function(element, index) {
        flippedCards[index].classList.add('match');
        flippedCards[index].classList.remove('open');
        matchedCards.push(flippedCards[index]);
      });
    }
    else {
      flippedCards.forEach(function(element, index) {
        flippedCards[index].classList.add('different');
        flippedCards[index].classList.remove('open');
    });
}}

//resets cards that are not matched.
function resetFlippedArray() {
  flippedCards.forEach(function(element,index) {
    flippedCards[index].classList.remove('open', 'different');
});
  flippedCards = [];
}

//changes star rating dependent on move count.
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

//increments the move counter variable.
function moveCount() {
  moveCounter++;
  document.querySelector('.moves').innerHTML = moveCounter;
}

//triggers the congrats screen.
function checkWin() {
  if (matchedCards.length === 16) {
    clearInterval(runTime);
    document.getElementById('congrats-background').classList.add('win');
    document.getElementById('congrats-text').classList.add('win');
    congratsMoves.innerHTML = moveCounter;
    congratsTimer.innerHTML = document.querySelector('.score-panel #timer-text').innerHTML;
    congratsStars[0].innerHTML = document.querySelectorAll('.score-panel li')[0].innerHTML;
    congratsStars[1].innerHTML = document.querySelectorAll('.score-panel li')[1].innerHTML;
  }
}

//resets the game and shuffles cards.
function reset() {
  const tempCardList =  document.querySelectorAll('.card'); //nodelist of all cards

  document.querySelectorAll('.stars i')[1].classList.add('fa');
  document.querySelectorAll('.stars i')[1].classList.remove('far');
  document.querySelectorAll('.stars i')[0].classList.add('fa');
  document.querySelectorAll('.stars i')[0].classList.remove('far');

  tempCardList.forEach(function(element,index) {
    tempCardList[index].classList.remove('open', 'match', 'different');
  });

  flippedCards = [];
  matchedCards = [];
  document.querySelector('.moves').innerHTML = 0;
  moveCounter = document.querySelector('.moves').innerHTML;
  document.getElementById('congrats-background').classList.remove('win');
  document.getElementById('congrats-text').classList.remove('win');
  setGameBoard();
  clearInterval(runTime);
  document.querySelector('#timer-text').innerText = '00:00:00';
}

//event listeners.
resetIcon.addEventListener('click', reset);
playAgain.addEventListener('click', reset);

//initiate setGameBoard.
setGameBoard();
