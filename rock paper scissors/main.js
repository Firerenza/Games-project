
document.getElementById("rock").addEventListener("click", playerChoiceRock);
document.getElementById("paper").addEventListener("click", playerChoicePaper);
document.getElementById("scissors").addEventListener("click", playerChoiceScissors);


function rockPaperScissors(){
    let random = Math.random()
    if(random < .33){
        return "rock"
    }else if(random < .66){
        return "paper"
    }else{
        return "scissors"
    }
}

function playerChoiceRock(){
    let botChoice = rockPaperScissors()
    if(botChoice === "scissors"){
        document.getElementById("result").innerHTML = "I chose scissors: You win!"
    }else if(botChoice === "paper"){
        document.getElementById("result").innerHTML = "I chose paper: You lose.."
    }else{
        document.getElementById("result").innerHTML = "IT'S A TIE"
        }
}

function playerChoicePaper(){
    let botChoice = rockPaperScissors()
    if(botChoice === "rock"){
        document.getElementById("result").innerHTML = "I chose rock: You win!"
    }else if(botChoice === "scissors"){
        document.getElementById("result").innerHTML = "I chose scissors: You lose.."
    }else{
        document.getElementById("result").innerHTML = "IT'S A TIE"
        }
}

function playerChoiceScissors(){
    let botChoice = rockPaperScissors()
    if(botChoice === "paper"){
        document.getElementById("result").innerHTML = "I chose paper: You win!"
    }else if(botChoice === "rock"){
        document.getElementById("result").innerHTML = "I chose rock: You lose.."
    }else{
        document.getElementById("result").innerHTML = "IT'S A TIE"
        }
}