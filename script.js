"use strict";

//바꿀 요소들 변수에 저장

//player

const players = document.querySelectorAll(".player");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

//score
const totalScores = document.querySelectorAll(".score");

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
let currentScore;
let totalScore;
let currentPlayer;
let currentPlayerNot;

const current = function () {
  if (player0.classList.contains("player--active")) {
    currentScore = document.querySelector("#current--0");
    totalScore = document.querySelector("#score--0");
    currentPlayer = player0;
    currentPlayerNot = player1;
  } else {
    currentScore = document.querySelector("#current--1");
    totalScore = document.querySelector("#score--1");
    currentPlayer = player1;
    currentPlayerNot = player0;
  }
};

// get random number, change dice img
let diceNumber;
const randomDice = function () {
  dice.classList.remove("hidden");
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
    alert("Roll the dice first!");
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
  currentScore.textContent = "0";
  currentPlayer.classList.remove("player--active");
  currentPlayerNot.classList.add("player--active");
  currentPlayer = currentPlayerNot;
};

// new game btn 이외에 모든 eventListner 정지
const endTheGame = function () {
  currentPlayer.classList.add("player--winner");
};

//roll dice btn
rollDice.addEventListener("click", function () {
  if (
    // 아직 주사위를 굴리지 않아서 currentScore가 저장되지 않았을때
    typeof totalScore === "undefined" ||
    Number(totalScore.textContent) < 10
  ) {
    randomDice();
    current();
    addToCntScore();
  }
});

//hold btn
hold.addEventListener("click", function () {
  addToTotalScore();
  switchPlayer(currentPlayer);
});

// new game btn
newGame.addEventListener("click", function () {
  //점수 모두 0으로
  for (let i = 0; i < players.length; i++) {
    totalScores[i].textContent = "0";
    currentScores[i].textContent = "0";
  }
  //player--winner delete
  currentPlayer.classList.remove("player--winner");

  //시작은 늘 player--0부터
  if (!player0.classList.contains("player--active")) {
    switchPlayer(player1);
  }
});
