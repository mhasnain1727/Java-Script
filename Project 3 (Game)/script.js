// const score0 = document.querySelector('#score--0');
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const btnNew = document.querySelector(".btn--new");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let score, currentScore, activePlayer, playing;

const initialVal = () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
};
initialVal();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const rollDiceFun = () => {
  if (playing) {
    const diceRollNo = Math.ceil(Math.random() * 6);
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${diceRollNo}.png`;

    if (diceRollNo != 1) {
      currentScore += diceRollNo;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

const holdBtnFun = () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
};

const newBtn = () => {
  initialVal();
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

btnRollDice.addEventListener("click", rollDiceFun);
btnHold.addEventListener("click", holdBtnFun);
btnNew.addEventListener("click", newBtn);