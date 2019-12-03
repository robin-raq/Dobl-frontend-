let deckArea = document.getElementById("deck")
let compCard = document.querySelector("#comp-circle")

let userCard = document.querySelector("#user-circle")
let compArray = []
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

let myTimer = setInterval("runTimer(timeLeft)", 100)

function runTimer(element){
    element.innerText --

    if (element.innerText < 0) {
       clearInterval(myTimer)
       alert("Time's up!")
    }
}


deckArea.append(scoreCard, timer)


deckArea.prepend(compCard)

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
    userPosOne.addEventListener("click", (event) => {
        console.log()
    })


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

function clickedEmoji(){
    console.log()

}

userCard.addEventListener("click", (evt) => {
    //console.log(evt.target)
    let clickedIcon = evt.target.innerText
    console.log(clickedIcon)

    if (compArray.includes(clickedIcon)){

        ++score.innerText 
        console.log(scoreCard.innerText)
        createCompCard()
        createUserCard()
    } 
    else {
        alert("that is not a match")
    }
    
    
})