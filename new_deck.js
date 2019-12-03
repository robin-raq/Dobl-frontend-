const deck = {
Card01: [ "🤡", "🌮", "🤮", "🌸"," 🦄", "💰", "🐥", "💩"], 
Card02:[ "🤡", "🎲", "🐳", "🎈"," 🎟", "💎", "☎️", "🚽"],
Card03:["🤡", "🃏"," 🎱"," 🏆", "🎪", "🎰", "🌎", "🌋"],
Card04:["🤡", "💜"," 💣"," 🐢", "🛶", "🗽", "🍺", "🍿"],
Card05:["🤡", "🍕"," ❄️"," 🍄", "🌈", "🐲", "🌵", "🦋"],
Card06:["🤡", "🐞"," 🐙"," 🧤", "🦀", "🍭", "🏓", "🕸"],
Card07:["🤡", "🖥"," 🔒"," 🎵", "🎁", "🎀", "🧦", "🕹"],
Card08:["🤡", "🥁"," 🏀"," 🍦", "🍾", "🥨", "🌂", "🎒"],
Card09:["🌮", "🎲"," 🃏"," 💜", "🍕", "🐞", "🖥", "🥁"],
Card10:["🌮", "🐳"," 🎱"," 💣", "❄️", "🐙", "🔒", "🏀"],
Card11:["🌮", "🎈"," 🏆"," 🐢", "🍄", "🧤", "🎵", "🍦"],
Card12:["🌮", "🎟"," 🎪"," 🛶", "🌈", "🦀", "🎁", "🍾"],
Card13:["🌮", "💎"," 🎰"," 🗽", "🐲", "🍭", "🎀", "🥨"],
Card14:["🌮", "☎️"," 🌎"," 🍺", "🌵", "🏓", "🧦", "🌂"],
Card15:["🌮", "🚽"," 🌋"," 🍿", "🦋", "🕸", "🕹", "🎒"],
Card16:["🤮", "🎲"," 🎱"," 🐢", "🌈", "🍭", "🧦", "🎒"],
Card17:["🤮", "🐳"," 🏆"," 🛶", "🐲", "🏓", "🕹", "🥁"],
Card18:["🤮", "🎈"," 🎪"," 🗽", "🌵", "🕸", "🖥", "🏀"],
Card19:["🤮", "🎟"," 🎰"," 🍺", "🦋", "🐞", "🔒", "🍦"],
Card20:["🤮", "💎"," 🌎"," 🍿", "🍕", "🐙", "🎵", "🍾"],
Card21:["🤮", "☎️"," 🌋"," 💜", "❄️", "🧤", "🎁", "🥨"],
Card22:["🤮", "🚽"," 🃏"," 💣", "🍄", "🦀", "🎀", "🌂"],
Card23:["🌸", "🎲"," 🏆"," 🗽", "🦋", "🐙", "🎁", "🌂"],
Card24:["🌸", "🐳"," 🎪"," 🍺", "🍕", "🧤", "🎀", "🎒"],
Card25:["🌸", "🎈"," 🎰"," 🍿", "❄️", "🦀", "🧦", "🥁"],
Card26:["🌸", "🎟"," 🌎"," 💜", "🍄", "🍭", "🕹", "🏀"],
Card27:["🌸", "💎"," 🌋"," 💣", "🌈", "🏓", "🖥", "🍦"],
Card28:["🌸", "☎️"," 🃏"," 🐢", "🐲", "🕸", "🔒", "🍾"],
Card29:["🌸", "🚽"," 🎱"," 🛶", "🌵", "🐞", "🎵", "🥨"],
Card30:["🦄", "🎲", "🎪","🍿", " 🍄"," 🏓"," 🔒"," 🥨"],
Card31:["🦄‍", "🐳", "🎰", "💜", "🌈", "🕸","🎵"," 🌂"],
Card32:["🦄", "🎈", "🌎", "💣"," 🐲"," 🐞"," 🎁"," 🎒"],
Card33:["🦄", "🎟", "🌋", "🐢"," 🌵"," 🐙"," 🎀"," 🥁"],
Card34:["🦄", "💎", "🃏", "🛶"," 🦋"," 🧤"," 🧦"," 🏀"],
Card35:["🦄", "☎️", "🎱", "🗽"," 🍕"," 🦀"," 🕹"," 🍦"],
Card36:["🦄", "🚽", "🏆", "🍺"," ❄️"," 🍭"," 🖥"," 🍾"],
Card37:["💰", "🎲"," 🎰"," 💣", "🌵", "🧤", "🕹", "🍾"],
Card38:["💰", "🐳"," 🌎"," 🐢", "🦋", "🦀", "🖥", "🥨"],
Card39:["💰", "🎈"," 🌋"," 🛶", "🍕", "🍭", "🔒", "🌂"],
Card40:["💰", "🎟"," 🃏"," 🗽", "❄️", "🏓", "🎵", "🎒"],
Card41:["💰", "💎"," 🎱"," 🍺", "🍄", "🕸", "🎁", "🥁"],
Card42:["💰", "☎️"," 🏆"," 🍿", "🌈", "🐞", "🎀", "🏀"],
Card43:["💰", "🚽"," 🎪"," 💜", "🐲", "🐙", "🧦", "🍦"],
Card44:["🐥", "🎲"," 🌎"," 🛶", "❄️", "🕸", "🎀", "🍦"],
Card45:["🐥", "🐳"," 🌋"," 🗽", "🍄", "🐞", "🧦", "🍾"],
Card46:["🐥", "🎈"," 🃏"," 🍺", "🌈", "🐙", "🕹", "🥨"],
Card47:["🐥", "🎟"," 🎱"," 🍿", "🐲", "🧤", "🖥", "🌂"],
Card48:["🐥", "💎"," 🏆"," 💜", "🌵", "🦀", "🔒", "🎒"],
Card49:["🐥", "☎️"," 🎪"," 💣", "🦋", "🍭", "🎵", "🥁"],
Card50:["🐥", "🚽"," 🎰"," 🐢", "🍕", "🏓", "🎁", "🏀"],
Card51:["💩", "🎲"," 🌋"," 🍺", "🐲", "🦀", "🎵", "🏀"],
Card52:["💩", "🐳"," 🃏"," 🍿", "🌵", "🍭", "🎁", "🍦"],
Card53:["💩", "🎈"," 🎱"," 💜", "🦋", "🏓", "🎀", "🍾"],
Card54:["💩", "🎟"," 🏆"," 💣", "🍕", "🕸", "🧦", "🥨"],
Card55:["💩", "💎"," 🎪"," 🐢", "❄️", "🐞", "🕹", "🌂"],
Card56:["💩", "☎️"," 🎰"," 🛶", "🍄", "🐙", "🖥", "🎒"],
Card57:["💩", "🚽"," 🌎"," 🗽", "🌈", "🧤", "🔒", "🥁"]

}
// let deckArea = document.getElementById("deck")

// let compCard = document.createElement("div")
// compCard.innerText = randomProperty(deck)
// compCard.id = "comp-text"


// let userCard = document.createElement("div")
// userCard.innerText = randomProperty(deck)
// userCard.id = "user-text"

// deckArea.append(compCard, userCard)

// console.log(deck)

// function randomProperty(obj) {
//     var keys = Object.keys(obj)
//     return obj[keys[ keys.length * Math.random() << 0]];
// };

// function startGame() {
//     myGameArea.start();
// }

// var myGameArea = {
//     canvas : document.createElement("canvas"),
//     start : function() {
//         this.canvas.width = 480;
//         this.canvas.height = 270;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//     }
// }