let deckArea = document.getElementById("deck")
let compCard = document.querySelector("#comp-circle")
let userCard = document.querySelector("#user-circle")
let resetButton = document.createElement("button")
resetButton.innerText = 'Start New Game'

let scoreCard = document.createElement("div")
scoreCard.innerText = "Score: "
let score = document.createElement("span")
score.innerText = 0
scoreCard.append(score)

let timer = document.createElement("div")
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
    
    userCard.remove()
    compCard.remove()
    
    let newGameButton = document.createElement("button")
    newGameButton.className = "end_buttons"
    newGameButton.innerText = "Play Again"

// event listener to reset page
    newGameButton.addEventListener("click", () => {
        window.location.reload(true);
        
    })



    let saveScoreForm = document.createElement("form")
    saveScoreForm.className = "score_form"
   
    let inputArea = document.createElement("INPUT")
    inputArea.type = "text"
    inputArea.name = "player_name"
    inputArea.placeholder = "ENTER NAME"
    let submitButton = document.createElement("Input")
        submitButton.type = "submit"
        
    
    
    saveScoreForm.append(inputArea, submitButton)
    deckArea.append(saveScoreForm, newGameButton)

    saveScoreForm.addEventListener("submit", (evt) => {
        evt.preventDefault()
        playerName = evt.target.player_name.value
        playerScore = parseInt(score.innerText)

        if (playerScore <= 300 ){
            playerRewardId = 1
         
        }
        else if (playerScore <= 600 && playerScore > 300){
            playerRewardId = 2
        }
        else if (playerScore <= 900 && playerScore > 600){
            playerRewardId = 3
        }
        else if (playerScore <= 1200 && playerScore > 900){
            playerRewardId = 4
        }
        else if (playerScore <= 1500 && playerScore > 1200){
            playerRewardId = 5
        }
        else{
            playerRewardId = 6
        }
        



        fetch(`http://localhost:3000/scores`, {
          method:'POST',
         headers: { 
             'Content-type': 'application/json',
             'accept': 'application/json'
         },
         body: JSON.stringify({
            name: playerName,
            value: playerScore,
            reward_id: playerRewardId
          })
        })
        .then(resp => resp.json())
        .then(json_resp =>{
            //console.log(json_resp.reward)
            let rewardDiv = document.createElement("div")
            rewardDiv.innerText = `Congratulations ${playerName}! You've earned ${json_resp.reward.name}. `
            let rewardImg = document.createElement("img")
            rewardImg.src = json_resp.reward.image

            rewardDiv.append(rewardImg)
            deckArea.append(rewardDiv)
        
        })
        
    })

}


deckArea.append(scoreCard, timer, compCard, userCard)


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
    console.log(compArray)
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
    userPosOne.className = "pos-one"
    
    let userPosTwo = document.createElement("div")
    userPosTwo.className = "pos-two"

    let userPosThree = document.createElement("div")
    userPosThree.className = "pos-three"
    
    let userPosFour = document.createElement("div")
    userPosFour.className = "pos-four"

    let userPosFive = document.createElement("div")
    userPosFive.className = "pos-five"

    let userPosSix = document.createElement("div")
    userPosSix.className = "pos-six"

    let userPosSeven = document.createElement("div")
    userPosSeven.className = "pos-seven"

    let userPosEight = document.createElement("div")
    userPosEight.className = "pos-eight"

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