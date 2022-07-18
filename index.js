let userArray = [];
let computerArray = [];
let gameStarted = false;

function checkIfArraysAreEqual(){
    for (let i = 0;  i < userArray.length; i++){
        if (userArray[i] !== computerArray[i]){
            return false;
       }
    }    
    return true;
}

function randomColorGenerator(){
    const arrayColors = ["green", "red", "yellow", "blue"];
    const randomNumber = Math.floor((Math.random()*4)); 
    const randomColor = arrayColors[randomNumber];
    return randomColor;
}

function makeButtonsClickable(){
    for(let i = 0; i < document.querySelectorAll(".btn").length; i++){
        document.querySelectorAll(".btn")[i].addEventListener("click", function(){
            makeSound(this.id);
            animateButton(this.id);
            userArray.push(this.id);

            if (checkIfArraysAreEqual()){
                if (userArray.length === computerArray.length){
                    userArray = [];
                    const color = generateAndAnimateNextButton(1000);
                    computerArray.push(color);
                }                
            } else {
                makeSound("wrong");
                makeBodyRed();
                document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";
                gameStarted = false;
                computerArray = [];
                userArray = [];
            }
        });
    }
}

function makeBodyRed(){
    const redBody = document.querySelector("body");
    redBody.classList.add("game-over");

    setTimeout (function() {
        redBody.classList.remove("game-over");
    }, 100);
}

function animateButton(colorLinkedToButton){
    const activeButton = document.getElementById(colorLinkedToButton);
    activeButton.classList.add("pressed");

    setTimeout (function() {
        activeButton.classList.remove("pressed");
    }, 100);
}

function makeSound(color){
    switch(color){
        case "green":
            const green = new Audio("sounds/green.mp3");
            green.play();
        break;
        case "red":
            const red = new Audio("sounds/red.mp3");
            red.play();
        break;
        case "yellow":
            const yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
        break;
        case "blue": 
        const blue = new Audio("sounds/blue.mp3");
            blue.play();
        break;
        case "wrong":
            const wrong = new Audio("sounds/wrong.mp3");
            wrong.play(); 
        default:
            const defaultWrong = new Audio("sounds/wrong.mp3");
            defaultWrong.play();
            break;
    }
}
    
function generateAndAnimateNextButton(timeOut){
    const color = randomColorGenerator();
    
    setTimeout(function(){
        makeSound(color);
        animateButton(color);
        document.querySelector("h1").innerHTML = "Level " + (computerArray.length);
    }, timeOut);

    return color;
}

function startGame(){
    document.querySelector("body").addEventListener("keydown", function(event){
        if (!gameStarted){
            gameStarted = true;
            computerArray = [];
            userArray = [];
            document.querySelector("h1").innerHTML = "Level " + (computerArray.length + 1);
            
            const color = generateAndAnimateNextButton(100);
            computerArray.push(color);
        } 
    });
}

makeButtonsClickable();

startGame();
