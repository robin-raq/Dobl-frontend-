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
  myTimer = setInterval(() => runTimer(), 10);
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
  const newGameButton = createEl("button", "end_buttons", "Play Again!");
  newGameButton.addEventListener("click", () => {
    window.location.reload(true);
  });

  endButtonDiv.append(saveScoreButton, newGameButton);
  saveScoreForm.append(scoreFormLabel, inputArea, endButtonDiv);
  scoreFormDiv.append(saveScoreForm);
  deckArea.append(scoreFormDiv);

  saveScoreForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const playerScore = parseInt(score.innerText)
    const playerName = inputArea.value.trim()
    console.log(playerName, playerScore);
    saveScore(playerName, playerScore)
  })


}

async function saveScore(name, score){
  const now = new Date().toISOString();

  try{
    let scores = await getScores()
    console.log("Before fetch:", scores);

  const resp = await fetch(`https://sheetdb.io/api/v1/6e5u5wjlw0ozg`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'id': "INCREMENT",
      'name': name,
      'score': score,
      'date_created': now
    })
  })
  const result= await resp.json()
  console.log("POST response:", result);
  if(result.created===1){
    console.log("Row saved. Fetching updated scores...");
    scores = await getScores();
  }else{
    console.warn("Unexpected POST response:", result);
  }
    scores.sort((a,b)=>{
      return (b.score - a.score)
    })
  console.log("Updated scores:", scores);
  displayScores(scores)
  return scores;
  } catch(err){
    console.error("Error saving scores:", err);
    return []
  }


}

async function getScores(){
 try {
    const resp = await fetch(`https://sheetdb.io/api/v1/6e5u5wjlw0ozg`);
    const scores = await resp.json();
    return scores;
  } catch (err) {
    console.error("Error fetching scores:", err);
    return [];
  }

}

function displayScores(scoresArr=[]){
   titleHOne.innerText = "🏆🏆🏆🏆🏆🏆 SCORE BOARD 🏆🏆🏆🏆🏆";
   deckArea.innerHTML= ""
   const scoreBoardDiv = createEl('div', 'score-board')

   const scoresTable = createEl('table', "score-table")

   //create header row
   const headers = Object.keys(scoresArr[0])
   const headerRow = createEl("tr")

   headers.forEach((header) => {
    console.log(header);
    const tableHeader = createEl("th")
    if(header !='id'){
    tableHeader.textContent = header.toUpperCase()
    headerRow.appendChild(tableHeader)
    }
   })
  scoresTable.appendChild(headerRow)

 //create body rows
 scoresArr.forEach((score) => {
  const tableRow = createEl('tr')
  headers.forEach((key) => {
    const tableData = createEl('td')
    if(key!="id"){
    let val = score[key]
    // Optional: prettify date if detected
      if (key.toLowerCase().includes("date") && val) {
        val = new Date(val).toLocaleString(undefined, {
          dateStyle: "short",
          timeStyle: "short",
        });
      }
    tableData.textContent = val
    tableRow.appendChild(tableData)
    }
  })
  scoresTable.appendChild(tableRow)
 })

 scoreBoardDiv.append(scoresTable)
 deckArea.append(scoreBoardDiv)

  //  scoresArr.forEach((scoreRecord) => {

  //   const singleScoreDiv = createEl('div', 'each-score-div')
  //   const scoreSpan =createEl("span")
  //   let formattedDate = scoreRecord.date_created.toLocaleString()

  //   scoreSpan.textContent = `${scoreRecord.name} scored ${scoreRecord.score} points on ${formattedDate}`
  //   singleScoreDiv.append(scoreSpan)
  //   deckArea.append(singleScoreDiv)
  //  })

}