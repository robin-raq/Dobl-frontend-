// =====================
// Dobble Online - Modernized Card.js
// =====================

// === DOM References ===
const deckArea = document.getElementById("deck");
const compCard = document.querySelector("#comp-circle");
const userCard = document.querySelector("#user-circle");
const titleHOne = document.querySelector("h1");

//=== Game UI Elements ===
const instructions = createEl(
  "p",
  "glow",
  "Click matching icon on lower deck to play!!"
);
const timer = createEl("div", "timer-class", "Time Remaining: ");
const timeLeft = createEl("span", null, "60");
timer.append(timeLeft);
const scoreCard = createEl("div", "score-class", "Score: ");
const score = createEl("span", null, "0");
scoreCard.append(score);

const resetButton = createEl("button", "start-over-button", "Start Over");
resetButton.addEventListener("click", () => window.location.reload(true));

const endButtonDiv = createEl("div", "end-button-div");
const rewardDiv = createEl("div", "reward-div");

deckArea.append(
  instructions,
  scoreCard,
  timer,
  compCard,
  userCard,
  resetButton
);

// =====================
// Utility Functions
// =====================

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

// === Game State ===
let compArray = [];
let myTimer = null;

// =====================
// Game Setup
// =====================

function initGame() {
  createCompCard();
  createUserCard();
  startTimer();
  userCard.addEventListener("click", handleCardClick);
}
// =====================
// Card Logic
// =====================

function createCompCard() {
  compCard.innerHTML = "";
  compPositions = [];
  let i = 1;
  while (i <= 8) {
    const div = createEl("div", `pos-${i}`);
    compPositions.push(div);
    i++;
  }
  compArray = randomProperty(deck, ...compPositions);
  compPositions.forEach((pos) => compCard.append(pos));
}
function createUserCard() {
  userCard.innerHTML = "";
  userPositions = [];
  let i = 1;
  while (i <= 8) {
    const div = createEl("div", `u-pos-${i}`);
    userPositions.push(div);
    i++;
  }
  randomProperty(deck, ...userPositions);
  userPositions.forEach((pos) => userCard.append(pos));
}
// Card Logic Helper Function //

function randomProperty(obj, ...positions) {
  const keys = Object.keys(obj);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const arrayOfRandomEmojis = obj[randomKey];
  getEachEmoji(arrayOfRandomEmojis, ...positions);
  return arrayOfRandomEmojis;
}
function getEachEmoji(array, ...positions) {
  for (let i = 0; i < positions.length; i++) {
    positions[i].innerText = array[i];
  }
}

// =====================
// Click + Score Logic
// =====================
const handleCardClick = (evt) => {
  let clickedIcon = evt.target.innerText;
  console.log(clickedIcon);

  if (compArray.includes(clickedIcon)) {
    let scoreNum = parseInt(score.innerText);
    scoreNum += 100;
    score.innerText = scoreNum;
    score.classList.add("animate");
    setTimeout(() => score.classList.remove("animate"), 500);
    createCompCard();
    createUserCard();
  } else {
    showBadMatchPopup();
  }
};
function showBadMatchPopup() {
  Swal.fire({
    title: "Oops! ❌",
    text: "That is NOT a match!",
    icon: "error",
    background: "#1a1a2e", // your dark background
    color: "#ffffff", // text color
    timer: 1500, // auto‑close after 1.5 seconds
    showConfirmButton: false, // hides the button so it auto closes
  });
}

// =====================
// Timer Logic
// =====================

function startTimer() {
  if (myTimer) clearInterval(myTimer);
  myTimer = setInterval(() => runTimer(), 1000);
}

function runTimer() {
  let time = parseInt(timeLeft.innerText);
  time -= 1;
  timeLeft.innerText = time;

  if (time <= 0) {
    clearInterval(myTimer);
    stopGamePlay();
  }
}

// =====================
// Initialize Game
// =====================

document.addEventListener("DOMContentLoaded", initGame);

// =====================
// End of Game
// =====================

function stopGamePlay() {
  timer.remove();
  userCard.remove();
  compCard.remove();
  resetButton.remove();
  instructions.remove();
  showEndScreen();
}
function showEndScreen() {
  titleHOne.innerText = "⏰ GAME OVER!";
  generateScoreForm();



}

function generateScoreForm() {
  const scoreFormDiv = createEl("div", "form-div");
  const saveScoreForm = createEl("form", "score-class");
  const scoreFormLabel = createEl("label", "", "Player's Name: ");
  scoreFormLabel.setAttribute("for", "player_name")
  const inputArea = createEl("input", "score-input");
  inputArea.type = "text";
  inputArea.name = "player_name";
  inputArea.placeholder = "ENTER NAME";

  const saveScoreButton = createEl("button", "end_buttons save", "Save Score");
  saveScoreButton.type = "submit";
  saveScoreForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    saveScore()

  })
  const newGameButton = createEl("button", "end_buttons", "Play Again!");
  newGameButton.addEventListener("click", () => {
    window.location.reload(true);
  });
  endButtonDiv.append(saveScoreButton, newGameButton);
  saveScoreForm.append(scoreFormLabel, inputArea, endButtonDiv);
  scoreFormDiv.append(saveScoreForm);
  deckArea.append(scoreFormDiv);
}

function saveScore(){

console.log("Score Saved");
}
