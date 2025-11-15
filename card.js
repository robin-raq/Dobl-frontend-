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
  scoreFormLabel.setAttribute("for", "player_name");
  const inputArea = createEl("input", "score-input");
  inputArea.type = "text";
  inputArea.name = "player_name";
  inputArea.placeholder = "ENTER NAME";

  const saveScoreButton = createEl("button", "end_buttons save", "Save Score");
  saveScoreButton.type = "submit";
  const newGameButton = createEl("button", "end_buttons", "Play Again!");
  newGameButton.addEventListener("click", () => {
    window.location.reload(true);
  });

  endButtonDiv.append(saveScoreButton, newGameButton);
  saveScoreForm.append(scoreFormLabel, inputArea, endButtonDiv);
  scoreFormDiv.append(saveScoreForm);
  deckArea.append(scoreFormDiv);

  saveScoreForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const playerScore = parseInt(score.innerText);
    const playerName = inputArea.value.trim();
    console.log(playerName, playerScore);
    saveScore(playerName, playerScore);
  });
}

async function saveScore(name, score) {
  const now = new Date().toISOString();
  let playerId = localStorage.getItem('playerId'); // Check if player already has an ID

  try {
    let scores = await getScores();
    let existingPlayer;

    if (playerId) {
      existingPlayer = scores.find(s => s.id === playerId );

      if (existingPlayer) {
        if (score > existingPlayer.score) {
          // Only update if new score is higher
          await fetch(`https://sheetdb.io/api/v1/6e5u5wjlw0ozg/id/${playerId}`, {
            method: 'PATCH',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
              data: { score: score, date_created: now }
            })
          });
          console.log(`Score updated for ${name} (ID: ${playerId})`);
        } else {
          console.log(`Score not updated. ${score} <= existing score ${existingPlayer.score}`);
        }
      } else {
        // ID not found — create new player
        playerId = crypto.randomUUID()
        localStorage.setItem('playerId', playerId);
        await fetch(`https://sheetdb.io/api/v1/6e5u5wjlw0ozg`, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: playerId, name: name, score: score, date_created: now })
        });
        console.log(`New player created: ${name} (ID: ${playerId})`);
      }

    } else {
      // New player — generate ID and POST
      playerId = crypto.randomUUID()
      localStorage.setItem('playerId', playerId);

      await fetch(`https://sheetdb.io/api/v1/6e5u5wjlw0ozg`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: playerId, name: name, score: score, date_created: now })
      });
      console.log(`New player created: ${name} (ID: ${playerId})`);
    }

    // Fetch updated scores and display
    scores = await getScores();
    scores.sort((a, b) => b.score - a.score);
    displayScores(scores);
    return scores;

  } catch (err) {
    console.error("Error saving scores:", err);
    return [];
  }
}


async function getScores() {
  try {
    const resp = await fetch(`https://sheetdb.io/api/v1/6e5u5wjlw0ozg`);
    const scores = await resp.json();
    return scores;
  } catch (err) {
    console.error("Error fetching scores:", err);
    return [];
  }
}

function displayScores(scoresArr = []) {
  const playerId = localStorage.getItem("playerId"); // Get current player's ID
  titleHOne.innerText = "🏆🏆🏆🏆🏆🏆 SCORE BOARD 🏆🏆🏆🏆🏆";
  deckArea.innerHTML = "";

  const scoreBoardDiv = createEl("div", "score-board");
  const scoresTable = createEl("table", "score-table");

  const headers = ["Rank", "Player", "Score", "Date"];
  const headerRow = createEl("tr");

  headers.forEach((header) => {
    console.log(header);
    const tableHeader = createEl("th");
    tableHeader.textContent = header;
    headerRow.appendChild(tableHeader);
  });
  scoresTable.appendChild(headerRow);
  // Sort scores descending
  scoresArr.sort((a, b) => b.score - a.score);

  //create body rows
  scoresArr.forEach((record, index) => {
    const tableRow = createEl("tr");
    // Highlight current player
    if (record.id === playerId) {
      tableRow.style.backgroundColor = "#ff4da6"; // Pink highlight
      tableRow.style.color = "#fff";
      tableRow.style.fontWeight = "bold";
    }
    // Rank
    const rankTableData = createEl("td");
    rankTableData.textContent = index + 1;
    tableRow.appendChild(rankTableData);
    // Player Name
    const nameTableData = createEl("td");
    nameTableData.textContent = record.name;
    if (record.id === playerId) {
      nameTableData.textContent += " (You)";
    }
    tableRow.appendChild(nameTableData);

    // Score
    const scoreTableData = createEl("td");
    scoreTableData.textContent = record.score;
    tableRow.appendChild(scoreTableData);

    // Date Created (formatted)
    const dataTableData = createEl("td");
    const date = new Date(record.date_created);
    dataTableData.textContent = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    tableRow.appendChild(dataTableData);

    scoresTable.appendChild(tableRow);
  });

  scoreBoardDiv.append(scoresTable);
  deckArea.append(scoreBoardDiv);
}
