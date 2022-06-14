"use strict";

/*
//player

const players = document.querySelectorAll('.player');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//score
const totalScores = document.querySelectorAll('.score');

//btn clicked
const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

// current score
const currentScores = document.querySelectorAll('.current-score');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');

//dice
const dice = document.querySelector('.dice');

//---------------------------------------------

// check out current player
let currentScore;
let totalScore;
let currentPlayer;
let currentPlayerNot;

const current = function () {
  if (player0.classList.contains('player--active')) {
    currentScore = document.querySelector('#current--0');
    totalScore = document.querySelector('#score--0');
    currentPlayer = player0;
    currentPlayerNot = player1;
  } else {
    currentScore = document.querySelector('#current--1');
    totalScore = document.querySelector('#score--1');
    currentPlayer = player1;
    currentPlayerNot = player0;
  }
};

// get random number, change dice img
let diceNumber;
const randomDice = function () {
  dice.classList.remove('hidden');
  diceNumber = Math.trunc(Math.random() * 6 + 1);
  dice.src = `dice-${diceNumber}.png`;
};

//add to current score
const addToCntScore = function () {
  if (diceNumber !== 1) {
    currentScore.textContent =
      Number(currentScore.textContent) + Number(diceNumber);
  } else {
    switchPlayer(currentPlayer);
  }
};
//add to total score
const addToTotalScore = function () {
  if (currentPlayer === undefined) {
    alert('Roll the dice first!');
  } else if (Number(totalScore.textContent) < 10) {
    totalScore.textContent =
      Number(totalScore.textContent) + Number(currentScore.textContent);
    if (totalScore.textContent >= 10) {
      endTheGame();
    }
  }
};

//switch the player
const switchPlayer = function (currentPlayer) {
  currentScore.textContent = '0';
  currentPlayer.classList.remove('player--active');
  currentPlayerNot.classList.add('player--active');
  currentPlayer = currentPlayerNot;
};

// new game btn 이외에 모든 eventListner 정지
const endTheGame = function () {
  currentPlayer.classList.add('player--winner');
};

//roll dice btn
rollDice.addEventListener('click', function () {
  if (
    // 아직 주사위를 굴리지 않아서 currentScore가 저장되지 않았을때
    typeof totalScore === 'undefined' ||
    Number(totalScore.textContent) < 10
  ) {
    randomDice();
    current();
    addToCntScore();
  }
});

//hold btn
hold.addEventListener('click', function () {
  addToTotalScore();
  switchPlayer(currentPlayer);
});

// new game btn
newGame.addEventListener('click', function () {
  //점수 모두 0으로
  for (let i = 0; i < players.length; i++) {
    totalScores[i].textContent = '0';
    currentScores[i].textContent = '0';
  }
  //player--winner delete
  currentPlayer.classList.remove('player--winner');

  //시작은 늘 player--0부터
  if (!player0.classList.contains('player--active')) {
    switchPlayer(player1);
  }
});
*/

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Starting condition
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. dispaly dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //3. check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;

      //hide the dice image
      diceEl.classList.add("hidden");

      //make winner's background changed
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //3. switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
