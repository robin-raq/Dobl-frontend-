// =====================
// Dobble Online - Modernized Card.js
// =====================

// === DOM References ===
const deckArea = document.getElementById("deck");
const compCard = document.querySelector("#comp-circle");
const userCard = document.querySelector("#user-circle");
const titleHOne = document.querySelector("h1");

//=== Game UI Elements ===
const instructions = createEl("p", "glow", "Click matching icon on lower deck to play!!")
const timer =createEl("div", "timer-class", "Time Remaining: ")
const timeLeft= createEl("span", null, "60")
timer.append(timeLeft)

const scoreCard = createEl("div", "score-class", "Score: ")
const score = createEl("span", null, "0")
scoreCard.append(score)

const resetButton = createEl("button", "start-over-button", "Start Over")
resetButton.addEventListener("click", () => window.location.reload(true))

const endButtonDiv= createEl("div", "end-button-div")
const rewardDiv = createEl("div", "reward-div")

const scoreFormDiv = createEl("div", "form-div")
const scoresUL = createEl("ul")
let scoreButtonDiv = createEl("div", "end-button-div")

deckArea.append(instructions, scoreCard, timer,  compCard, userCard, resetButton,)

// =====================
// Utility Functions
// =====================

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.innerText = text;
  return el;
}

// === Game State ===
let compArray = [];
let myTimer = null;

// =====================
// Game Setup
// =====================

function initGame() {
  createCompCard()
  createUserCard()
  startTimer();
  userCard.addEventListener("click", handleCardClick);
}
// =====================
// Card Logic
// =====================

function createCompCard(){
    compCard.innerHTML = "";
    compPositions = []
    let i =1
    while(i <=8){
        const div =  createEl("div", `pos-${i}`)
        compPositions.push(div)
        i++
    }
    compArray = randomProperty(deck, ...compPositions)
    compPositions.forEach(pos => compCard.append(pos))
}
function createUserCard(){
    userCard.innerHTML = "";
    userPositions = []
    let i =1
    while(i <=8){
        const div =  createEl("div", `u-pos-${i}`)
        userPositions.push(div)
        i++
    }
    randomProperty(deck, ...userPositions)
    userPositions.forEach(pos => userCard.append(pos))
}
// Card Logic Helper Function //

function randomProperty(obj, ...positions) {
    const keys = Object.keys(obj)
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const arrayOfRandomEmojis = obj[randomKey];
    getEachEmoji(arrayOfRandomEmojis, ...positions)
    return arrayOfRandomEmojis
};
function getEachEmoji(array, ...positions) {
  for (let i = 0; i < positions.length; i++) {
    positions[i].innerText = array[i];
  }
}

// =====================
// Click + Score Logic
// =====================
const handleCardClick= (evt) => {
    let clickedIcon = evt.target.innerText
    console.log(clickedIcon)

    if (compArray.includes(clickedIcon)){
        let scoreNum = parseInt(score.innerText)
        scoreNum += 100
        score.innerText = scoreNum
        score.classList.add('animate');
setTimeout(() => score.classList.remove('animate'), 500);
        createCompCard()
        createUserCard()
    }
    else {
        showBadMatchPopup()
    }
}
function showBadMatchPopup() {
  Swal.fire({
    title: "Oops! ❌",
    text: "That is NOT a match!",
    icon: "error",
    background: "#1a1a2e",       // your dark background
    color: "#ffffff",             // text color
    timer: 1500,                  // auto‑close after 1.5 seconds
    showConfirmButton: false      // hides the button so it auto closes
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

function stopGamePlay(){
    timer.remove()
    userCard.remove()
    compCard.remove()
    resetButton.remove()
    instructions.remove()
    showEndScreen()


}
function showEndScreen(){
    titleHOne.innerText = "⏰ GAME OVER!"
    const finalScore = parseInt(score.innerText)

    deckArea.innerHTML = `
    <div class="final-score-class">Your Score: ${finalScore}</div>
  `;
  const newGameButton= createEl("button", "end_buttons", "Play Again!")
    endButtonDiv.append(newGameButton)
    deckArea.append(endButtonDiv)

    newGameButton.addEventListener("click", () => {
        window.location.reload(true);
    })
}



// =====================
// OLD CODE WITH SCORBOARD STUFF
// =====================


// //Scoreboard Logic

// let scoreFormDiv = document.createElement("div")
//     scoreFormDiv.className = "form-div"
// let scoreButtonDiv = document.createElement("div")
// scoreButtonDiv.className = "end-button-div"

// // let scoresUL = document.createElement("ul")
// let highScoresDiv = document.createElement("div")
// highScoresDiv.className = "high-scores-div"





// function stopGamePlay1(){
//     timer.remove()
//     userCard.remove()
//     compCard.remove()
//     resetButton.remove()
//     titleHOne.innerText = "GAME OVER!"
//     const newGameButton= createEl("button", "end_buttons", "Play Again!")
//     endButtonDiv.append(newGameButton)
//     deckArea.append(endButtonDiv)

//     newGameButton.addEventListener("click", () => {
//         window.location.reload(true);
//     })



//     //view scores button
//     // scoreCard.className = "final-score-class"
//     // let viewScoreButton = document.createElement("button")
//     // viewScoreButton.className = "large-end-button"
//     // viewScoreButton.innerText = "View High Scores"
//     // scoreButtonDiv.append(viewScoreButton)

//     // let saveScoreForm = document.createElement("form")
//     // saveScoreForm.className = "score_form"

//     // let inputArea = document.createElement("INPUT")
//     // inputArea.type = "text"
//     // inputArea.name = "player_name"
//     // inputArea.placeholder = "ENTER NAME"
//     // let submitButton = document.createElement("Input")
//     // submitButton.type = "submit"

//     // saveScoreForm.append(inputArea, submitButton)
//     // scoreFormDiv.append(saveScoreForm)
//     // deckArea.append(scoreFormDiv, endButtonDiv, scoreButtonDiv)


//     // saveScoreForm.addEventListener("submit", (evt) => {
//     //     evt.preventDefault()
//     //     playerName = evt.target.player_name.value
//     //     playerScore = parseInt(score.innerText)

//     //     if (playerScore <= 300 ){
//     //         playerRewardId = 1
//     //     }
//     //     else if (playerScore <= 600 && playerScore > 300){
//     //         playerRewardId = 2
//     //     }
//     //     else if (playerScore <= 900 && playerScore > 600){
//     //         playerRewardId = 3
//     //     }
//     //     else if (playerScore <= 1200 && playerScore > 900){
//     //         playerRewardId = 4
//     //     }
//     //     else if (playerScore <= 1500 && playerScore > 1200){
//     //         playerRewardId = 5
//     //     }
//     //     else{
//     //         playerRewardId = 6
//     //     }




//     //     fetch(`https://dobble-game.herokuapp.com/scores`, {
//     //       method:'POST',
//     //      headers: {
//     //          'Content-type': 'application/json',
//     //          'accept': 'application/json'
//     //      },
//     //      body: JSON.stringify({
//     //         name: playerName,
//     //         value: playerScore,
//     //         reward_id: playerRewardId
//     //       })
//     //     })
//     //     .then(resp => resp.json())
//     //     .then(json_resp =>{
//     //         //console.log(json_resp.reward)
//     //         titleHOne.remove()
//     //         scoreCard.remove()
//     //         scoreFormDiv.remove()

//     //         newGameButton.className = "large-end-button"




//     //         let rewardTextDiv = document.createElement("div")
//     //         rewardTextDiv.className = "reward-text-div"
//     //         rewardTextDiv.innerText = `Good job. Here's some ${json_resp.reward.name}.`


//     //         // rewardDiv.innerText = `Congratulations ${playerName}! You've earned ${json_resp.reward.name}. `
//     //         let rewardImg = document.createElement("img")
//     //         rewardImg.src = json_resp.reward.image

//     //         rewardDiv.append(rewardTextDiv, rewardImg)
//     //         deckArea.prepend(rewardDiv)
//     //         deckArea.append(scoreButtonDiv)


//     //     })

//     // })

// }


// function runTimer1(element){
//     element.innerText --

//     if (element.innerText <= 0) {

//         stopGamePlay()

//         clearInterval(myTimer)
//     }

// }


// function createCompCard1(){
//     compCard.innerHTML = " "
//     let compPosOne = document.createElement("div")
//     compPosOne.className = "pos-one"


//     let compPosTwo = document.createElement("div")
//     compPosTwo.className = "pos-two"

//     let compPosThree = document.createElement("div")
//     compPosThree.className = "pos-three"

//     let compPosFour = document.createElement("div")
//     compPosFour.className = "pos-four"

//     let compPosFive = document.createElement("div")
//     compPosFive.className = "pos-five"

//     let compPosSix = document.createElement("div")
//     compPosSix.className = "pos-six"

//     let compPosSeven = document.createElement("div")
//     compPosSeven.className = "pos-seven"

//     let compPosEight = document.createElement("div")
//     compPosEight.className = "pos-eight"

//     compArray = randomProperty(deck, compPosOne, compPosTwo, compPosThree, compPosFour, compPosFive, compPosSix, compPosSeven, compPosEight)
//     // console.log(compArray)
//     compCard.append(compPosOne, compPosTwo, compPosThree, compPosFour, compPosFive, compPosSix, compPosSeven, compPosEight)
// }

// function createUserCard1(){
//     userCard.innerHTML = " "
//     let userPosOne = document.createElement("div")
//     userPosOne.className = "u-pos-one"

//     let userPosTwo = document.createElement("div")
//     userPosTwo.className = "u-pos-two"

//     let userPosThree = document.createElement("div")
//     userPosThree.className = "u-pos-three"

//     let userPosFour = document.createElement("div")
//     userPosFour.className = "u-pos-four"

//     let userPosFive = document.createElement("div")
//     userPosFive.className = "u-pos-five"

//     let userPosSix = document.createElement("div")
//     userPosSix.className = "u-pos-six"

//     let userPosSeven = document.createElement("div")
//     userPosSeven.className = "u-pos-seven"

//     let userPosEight = document.createElement("div")
//     userPosEight.className = "u-pos-eight"

//     randomProperty(deck, userPosOne, userPosTwo, userPosThree, userPosFour, userPosFive, userPosSix, userPosSeven, userPosEight)

//     userCard.append(userPosOne, userPosTwo, userPosThree, userPosFour, userPosFive, userPosSix, userPosSeven, userPosEight)
// }


// scoreButtonDiv.addEventListener("click", (evt) => {
//     //console.log(evt.target)
//     rewardDiv.remove()


//     fetch("https://dobble-game.herokuapp.com/scores")
//     .then(r => r.json())
//     .then((allScores) => {

//       let sorted =  allScores.sort((a,b) => {
//             return(b.value - a.value)
//         })
//         //console.log(sorted)
//         sorted.forEach((scoreObj) => {
//             displayScores(scoreObj)
//         })
//     })

// })

// //function to display high scores

// function displayScores(scoreObj){

//     rewardDiv.remove()
//     scoreButtonDiv.remove()
//     console.log(scoreButtonDiv)
//     // highScoresDiv.remove()

//     let scoreDiv = document.createElement("div")
//         scoreDiv.className = "each-score-div"

//         let scoreNameSpan = document.createElement("span")
//         scoreNameSpan.innerText = `Name: ${scoreObj.name}`

//         let divBreak = document.createElement("br")

//         let scoreValueSpan = document.createElement("span")
//         scoreValueSpan.innerText = `Points: ${scoreObj.value}`

//         scoreDiv.append(scoreNameSpan, divBreak, scoreValueSpan)
//         // scoreLi.innerText = `${scoreObj.name} w/ ${scoreObj.value} points`
//         highScoresDiv.append(scoreDiv)
//         deckArea.prepend(highScoresDiv)




// }


