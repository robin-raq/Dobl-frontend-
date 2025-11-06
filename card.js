let deckArea = document.getElementById("deck")
let compCard = document.querySelector("#comp-circle")
let userCard = document.querySelector("#user-circle")


let titleHOne = document.querySelector("h1")

let scoreFormDiv = document.createElement("div")
    scoreFormDiv.className = "form-div"

let endButtonDiv = document.createElement("div")
endButtonDiv.className = "end-button-div"

// let scoresUL = document.createElement("ul")
let highScoresDiv = document.createElement("div")
highScoresDiv.className = "high-scores-div"

let scoreButtonDiv = document.createElement("div")
scoreButtonDiv.className = "end-button-div"

let rewardDiv = document.createElement("div")
rewardDiv.className = "reward-div"


let resetButton = document.createElement("button")
    resetButton.className = "start-over-button"
    resetButton.innerText = "Start Over"
    resetButton.addEventListener("click", (params) => {
    window.location.reload(true);
})


let scoreCard = document.createElement("div")
    scoreCard.className = "score-class"
    scoreCard.innerText = "Score: "
let score = document.createElement("span")
    score.innerText = 0
    scoreCard.append(score)

let timer = document.createElement("div")
    timer.className = "timer-class"
    timer.innerText = "Time Remaining: "
let timeLeft = document.createElement("span")
    timeLeft.innerText = 60
    timer.append(timeLeft)

let compArray = []


let myTimer = setInterval("runTimer(timeLeft)", 1000)

function runTimer(element){
    element.innerText --

    if (element.innerText <= 0) {

        stopGamePlay()

        clearInterval(myTimer)
    }

}

function stopGamePlay(){
    //alert("Time's up!")
    //userCard.innerHTML = 'GAME OVER'

    resetButton.remove()

    titleHOne.innerText = "GAME OVER!"

    scoreCard.className = "final-score-class"

    timer.remove()

    userCard.remove()
    compCard.remove()


    //view scores button
    // let viewScoreButton = document.createElement("button")
    // viewScoreButton.className = "large-end-button"
    // viewScoreButton.innerText = "View High Scores"
    // scoreButtonDiv.append(viewScoreButton)

    //new game button


    let newGameButton = document.createElement("button")
    newGameButton.className = "end_buttons"
    newGameButton.innerText = "Play Again"
    endButtonDiv.append(newGameButton)



    // event listener to reset page
    newGameButton.addEventListener("click", () => {
        window.location.reload(true);
    })









    // let saveScoreForm = document.createElement("form")
    // saveScoreForm.className = "score_form"

    // let inputArea = document.createElement("INPUT")
    // inputArea.type = "text"
    // inputArea.name = "player_name"
    // inputArea.placeholder = "ENTER NAME"
    // let submitButton = document.createElement("Input")
    // submitButton.type = "submit"



    // saveScoreForm.append(inputArea, submitButton)
    // scoreFormDiv.append(saveScoreForm)
    // deckArea.append(scoreFormDiv, endButtonDiv, scoreButtonDiv)
    deckArea.append(endButtonDiv)

    // saveScoreForm.addEventListener("submit", (evt) => {
    //     evt.preventDefault()
    //     playerName = evt.target.player_name.value
    //     playerScore = parseInt(score.innerText)

    //     if (playerScore <= 300 ){
    //         playerRewardId = 1
    //     }
    //     else if (playerScore <= 600 && playerScore > 300){
    //         playerRewardId = 2
    //     }
    //     else if (playerScore <= 900 && playerScore > 600){
    //         playerRewardId = 3
    //     }
    //     else if (playerScore <= 1200 && playerScore > 900){
    //         playerRewardId = 4
    //     }
    //     else if (playerScore <= 1500 && playerScore > 1200){
    //         playerRewardId = 5
    //     }
    //     else{
    //         playerRewardId = 6
    //     }




    //     fetch(`https://dobble-game.herokuapp.com/scores`, {
    //       method:'POST',
    //      headers: {
    //          'Content-type': 'application/json',
    //          'accept': 'application/json'
    //      },
    //      body: JSON.stringify({
    //         name: playerName,
    //         value: playerScore,
    //         reward_id: playerRewardId
    //       })
    //     })
    //     .then(resp => resp.json())
    //     .then(json_resp =>{
    //         //console.log(json_resp.reward)
    //         titleHOne.remove()
    //         scoreCard.remove()
    //         scoreFormDiv.remove()

    //         newGameButton.className = "large-end-button"




    //         let rewardTextDiv = document.createElement("div")
    //         rewardTextDiv.className = "reward-text-div"
    //         rewardTextDiv.innerText = `Good job. Here's some ${json_resp.reward.name}.`


    //         // rewardDiv.innerText = `Congratulations ${playerName}! You've earned ${json_resp.reward.name}. `
    //         let rewardImg = document.createElement("img")
    //         rewardImg.src = json_resp.reward.image

    //         rewardDiv.append(rewardTextDiv, rewardImg)
    //         deckArea.prepend(rewardDiv)
    //         deckArea.append(scoreButtonDiv)


    //     })

    // })

}

deckArea.append(scoreCard, timer, compCard, userCard, resetButton)


//deckArea.prepend(compCard)

createCompCard()
createUserCard()

function createCompCard(){
    compCard.innerHTML = " "
    let compPosOne = document.createElement("div")
    compPosOne.className = "pos-one"


    let compPosTwo = document.createElement("div")
    compPosTwo.className = "pos-two"

    let compPosThree = document.createElement("div")
    compPosThree.className = "pos-three"

    let compPosFour = document.createElement("div")
    compPosFour.className = "pos-four"

    let compPosFive = document.createElement("div")
    compPosFive.className = "pos-five"

    let compPosSix = document.createElement("div")
    compPosSix.className = "pos-six"

    let compPosSeven = document.createElement("div")
    compPosSeven.className = "pos-seven"

    let compPosEight = document.createElement("div")
    compPosEight.className = "pos-eight"

    compArray = randomProperty(deck, compPosOne, compPosTwo, compPosThree, compPosFour, compPosFive, compPosSix, compPosSeven, compPosEight)
    // console.log(compArray)
    compCard.append(compPosOne, compPosTwo, compPosThree, compPosFour, compPosFive, compPosSix, compPosSeven, compPosEight)
}

function randomProperty(obj, posOne, posTwo, posThree, posFour, posFive, posSix, posSeven, posEight) {
    var keys = Object.keys(obj)
    let arrayOfRandomEmojis = obj[keys[ keys.length * Math.random() << 0]]


    getEachEmoji(arrayOfRandomEmojis, posOne, posTwo, posThree, posFour, posFive, posSix, posSeven, posEight)
    return arrayOfRandomEmojis
};

function getEachEmoji(array, posOne, posTwo, posThree, posFour, posFive, posSix, posSeven, posEight) {
    posOne.innerText = array[0]
    posTwo.innerText = array[1]
    posThree.innerText = array[2]
    posFour.innerText = array[3]
    posFive.innerText = array[4]
    posSix.innerText = array[5]
    posSeven.innerText = array[6]
    posEight.innerText = array[7]

}

function createUserCard(){
    userCard.innerHTML = " "
    let userPosOne = document.createElement("div")
    userPosOne.className = "u-pos-one"

    let userPosTwo = document.createElement("div")
    userPosTwo.className = "u-pos-two"

    let userPosThree = document.createElement("div")
    userPosThree.className = "u-pos-three"

    let userPosFour = document.createElement("div")
    userPosFour.className = "u-pos-four"

    let userPosFive = document.createElement("div")
    userPosFive.className = "u-pos-five"

    let userPosSix = document.createElement("div")
    userPosSix.className = "u-pos-six"

    let userPosSeven = document.createElement("div")
    userPosSeven.className = "u-pos-seven"

    let userPosEight = document.createElement("div")
    userPosEight.className = "u-pos-eight"

    randomProperty(deck, userPosOne, userPosTwo, userPosThree, userPosFour, userPosFive, userPosSix, userPosSeven, userPosEight)

    userCard.append(userPosOne, userPosTwo, userPosThree, userPosFour, userPosFive, userPosSix, userPosSeven, userPosEight)
}



userCard.addEventListener("click", (evt) => {
    //console.log(evt.target)
    let clickedIcon = evt.target.innerText
    console.log(clickedIcon)

    if (compArray.includes(clickedIcon)){
        let scoreNum = parseInt(score.innerText)
        scoreNum += 100

       //++score.innerText
       score.innerText = scoreNum
        console.log(scoreCard.innerText)
        createCompCard()
        createUserCard()
    }
    else {
        alert("that is not a match")
    }


})

scoreButtonDiv.addEventListener("click", (evt) => {
    //console.log(evt.target)
    rewardDiv.remove()


    fetch("https://dobble-game.herokuapp.com/scores")
    .then(r => r.json())
    .then((allScores) => {

      let sorted =  allScores.sort((a,b) => {
            return(b.value - a.value)
        })
        //console.log(sorted)
        sorted.forEach((scoreObj) => {
            displayScores(scoreObj)
        })
    })

})

//function to display high scores

function displayScores(scoreObj){

    rewardDiv.remove()
    scoreButtonDiv.remove()
    console.log(scoreButtonDiv)
    // highScoresDiv.remove()

    let scoreDiv = document.createElement("div")
        scoreDiv.className = "each-score-div"

        let scoreNameSpan = document.createElement("span")
        scoreNameSpan.innerText = `Name: ${scoreObj.name}`

        let divBreak = document.createElement("br")

        let scoreValueSpan = document.createElement("span")
        scoreValueSpan.innerText = `Points: ${scoreObj.value}`

        scoreDiv.append(scoreNameSpan, divBreak, scoreValueSpan)
        // scoreLi.innerText = `${scoreObj.name} w/ ${scoreObj.value} points`
        highScoresDiv.append(scoreDiv)
        deckArea.prepend(highScoresDiv)




}


