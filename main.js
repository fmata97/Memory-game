let game = document.querySelector("#game");
let turnsLabel = document.querySelector("#turns-counter");
let matchesLabel = document.querySelector("#matches-counter");
let restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", restartGame);

/* Card object */
class Card {
    constructor(id, element){
        this.id = Math.floor(id);
        this.position = Math.floor(Math.random()*numberOfCards)
        this.flipped = false;
        this.element = element;
    }
}

/* Map to associate cards with images */
const images = new Map([
    [0, "./img/c.svg"],
    [1, "./img/c++.svg"],
    [2, "./img/ruby.svg"],
    [3, "./img/dart.svg"],
    [4, "./img/java.svg"],
    [5, "./img/javascript.svg"],
    [6, "./img/kotlin.svg"],
    [7, "./img/python.svg"],
    [8, "./img/golang.svg"],
    [9, "./img/typescript.svg"],
    [10, "./img/swift.svg"]
]);

/* Global variables */

let turns = 0; /* number of times user tried to match a pair */
let matches = 0; /* number of matches */

let numberOfCards = 0;
let cardsPerRow = 0;

let firstCard, secondCard; /* to select both cards */
let lock = false; /* while cards are in a transition, the board gets locked */

let cards = []; /* to store all the cards */
let level = 0; /* to change difficulty */

/* Starts the game */
startGame();


/* All game functions */

function startGame(){
    do {
        level = window.prompt("Level 1: 16 cards\nLevel 2: 20 cards\nWhich do you want to play? (1 / 2)");
    } while (level != 1 && level != 2);
    
    if (level == 1){
        numberOfCards = 16;
        cardsPerRow = 4;
    } else {
        numberOfCards = 20;
        cardsPerRow = 5;
    }

    initBoard();
}



function initBoard(){
    cards = [];
    let size = 100/cardsPerRow; /* to know the correct size for each card depending on the cards per row */
    for (let i = 0, j = 0; i < numberOfCards; i++, j++){
        let myCard = new Card(i/2, document.createElement("div")); /* creates the card and an HTML element */
        myCard.element.className = "card";
        myCard.element.style.width = `calc(${size}% - 1.3rem)`;
        myCard.element.style.height = `calc(${size}% - 1.3rem)`;
        myCard.element.style.order = myCard.position; /* to shuffle the cards */

        let backFace = document.createElement("img");
        backFace.className = "back-face";
        backFace.src = "./img/question-mark.svg";

        let frontFace = document.createElement("img");
        frontFace.className = "front-face";
        frontFace.src = images.get(Math.floor(j/2));

        myCard.element.appendChild(backFace);
        myCard.element.appendChild(frontFace);
        myCard.element.addEventListener("click", () => revealCard(myCard));
        cards.push(myCard);
        game.appendChild(myCard.element);
    }
}



function revealCard(myCard){
    if (myCard.flipped || lock) return;

    myCard.flipped = true;
    myCard.element.classList.toggle("revealed");

    selectCard(myCard);
}

function selectCard(card){
    /* if there's no card selected */
    if (!firstCard){ 
        firstCard = card;
        return;
    }

    /* if there is, will check for a match */
    secondCard = card;
    updateTurns();

    lock = true; /* locks the board */
    checkMatch();
}

function checkMatch(){
    if (firstCard.id === secondCard.id){
        updateMatches();
        firstCard = secondCard = null;
        /* unlock the board */
        lock = false;
        if (matches === numberOfCards/2) setTimeout(gameOver, 500); /* timeout so the animations have time to play */
        return;
    }
    setTimeout(resetCards, 700);
}

function resetCards(){
    firstCard.element.classList.remove("revealed");
    firstCard.flipped = false;
    secondCard.element.classList.remove("revealed");
    secondCard.flipped = false;
    firstCard = null;
    secondCard = null;
    lock = false;
}

function gameOver(){
    let answer;
    do {
        answer = window.prompt("You won! Do you want to play again? (y / n)")
    } while (answer != "y" && answer != "n");
    
    if (answer === "y") restartGame();
}

function updateTurns(){
    turnsLabel.textContent = `${++turns}`;
}

function updateMatches(){
    matchesLabel.textContent = `${++matches}`;
}

function restartGame(){
    turns = -1;
    matches = -1;
    updateMatches();
    updateTurns();

    firstCard = secondCard = null;
    lock = false;

    cards = [];
    game.replaceChildren();

    let answer;
    do {
        answer = window.prompt("Do you wish to change difficulty? (y / n)")
    } while (answer != "y" && answer != "n");

    if (answer === "y") startGame();
    else initBoard();
}
