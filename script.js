'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRollTheDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
const currScores = [0, 0];
let winner = false;

const hideTheDice = function () {
  diceEl.classList.add('hidden');
};

const showTheDice = function () {
  diceEl.classList.remove('hidden');
};

const rollTheDice = function () {
  const diceValue = Math.trunc(Math.random() * 6 + 1);
  diceEl.setAttribute('src', `dice-${diceValue}.png`);
  showTheDice();

  if (diceValue !== 1) {
    displayScore(diceValue);
  } else {
    scores[activePlayer] = 0;
    document.querySelector(`#score--${activePlayer}`).textContent = 0;
    switchPlayer();
  }
};

const resetGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;

  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;

  for (let i = 0; i < currScores.length; i++) {
    currScores[i] = 0;
  }

  if (player1.classList.contains('player--active')) {
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
  }

  hideTheDice();
};

const displayScore = function (dice) {
  currentScore += dice;
  document.querySelector(`#score--${activePlayer}`).textContent = currentScore;

  scores[activePlayer] = currentScore;
};

const switchPlayer = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  currentScore = 0;
  document.querySelector(`#score--${activePlayer}`).textContent = currentScore;

  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const checkWinner = function () {
  if (currScores[activePlayer] >= 30) {
    alert(`Player ${activePlayer + 1} is a winner!!!`);
    winner = true;
    resetGame();
  }
};

const hold = function () {
  currScores[activePlayer] += scores[activePlayer];
  document.querySelector(`#current--${activePlayer}`).textContent =
    currScores[activePlayer];
  checkWinner();

  if (winner === false) switchPlayer();
  else winner = false;
};

btnRollTheDice.addEventListener('click', rollTheDice);
btnNewGame.addEventListener('click', resetGame);
btnHold.addEventListener('click', hold);

resetGame();
