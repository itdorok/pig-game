"use strict";

//바꿀 요소들 변수에 저장

//player

const players = document.querySelectorAll(".player");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

//btn clicked
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");

// current score
const currentScores = document.querySelectorAll(".current-score");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");

//dice
const dice = document.querySelector(".dice");

//---------------------------------------------
// check out current player
const currentPlayer = player0.classList.contains("player--active")
  ? "player--0"
  : "player--1";

//roll the dice, change the image, add the result
let diceNumber;
let score;
rollDice.addEventListener("click", function () {
  diceNumber = Math.trunc(Math.random() * 6 + 1);
  dice.src = `dice-${diceNumber}.png`;

  score = document.querySelector(`.${currentPlayer} .current-score`);
  addToCntScore();
});

//add the result of the dice to current player's score
const addToCntScore = function () {
  if (diceNumber !== 1) {
    score.textContent = Number(score.textContent) + diceNumber;
  } else {
    switchPlayer();
  }
};

//switch the player: currentscore =0, background color change
const switchPlayer = function () {
  if (currentPlayer === "player--0") {
    player0.classList.remove("player--active");
    player1.classList.add("player--active");
    currentScore0.textContent = "0";
    currentPlayer = "player--1";
  } else {
    player1.classList.remove("player--active");
    player0.classList.add("player--active");
    currentScore1.textContent = "0";
    currentPlayer = "player--0";
  }
};

// hold btn click, store current score to total score, switch active player

let totalScore;
hold.addEventListener("click", function () {
  //1. current score will be added to total score
  //2. switch the active player
  if (currentPlayer === undefined) {
    alert("Roll the dice first!");
  } else {
    totalScore = document.querySelector(`.${currentPlayer} .score`);
    totalScore.textContent =
      Number(totalScore.textContent) + Number(score.textContent);
  }
});

// whole game reset
newGame.addEventListener("click", function () {
  for (let i = 0; i < players.length; i++) {
    scores[i].textContent = "0";
    currentScores[i].textContent = "0";
  }
  if (!player0.classList.contains("player--active")) {
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
  }
});
