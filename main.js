let game = document.querySelector("#game");
let turnsLabel = document.querySelector("#turns-counter");
let matchesLabel = document.querySelector("#matches-counter");
let restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", restartGame);
/*
let cards = [...game.querySelectorAll(".card-row")];

cards.forEach((element,index,array) => array[index] = [...element.querySelectorAll(".card")]);

cards.forEach(row => {
    row.forEach(card => card.style.backgroundColor = "blue");
}); */
class Card {
    constructor(id, element){
        this.id = Math.floor(id);
        this.position = Math.floor(Math.random()*numberOfCards)
        this.flipped = false;
        this.solved = false;
        this.element = element;
    }
}

const images = new Map([
    [0, "./img/c.svg"],
    [1, "./img/c++.svg"],
    [2, "./img/ruby.svg"],
    [3, "./img/dart.svg"],
    [4, "./img/java.svg"],
    [5, "./img/javascript.svg"],
    [6, "./img/kotlin.svg"],
    [7, "./img/python.svg"],
]);

let turns = 0;
let matches = 0;

let numberOfCards = 16;
let cardsPerRow = 4;

let firstCard, secondCard;
let lock = false;

let cards = [];

initBoard();
/* for (let i = 0; i < cardsPerRow; i++){
    cards.push([]);
    for (let j = 0; j < cardsPerRow; j++){
        cards[i][j] = new Card();
    }
} */

function initBoard(){
    cards = [];
    let size = 100/cardsPerRow;
    for (let i = 0, j = 0; i < numberOfCards; i++, j++){
        let myCard = new Card(i/2, document.createElement("div"));
        myCard.element.className = "card";
        myCard.element.style.width = `calc(${size}% - 1.3rem)`;
        myCard.element.style.height = `calc(${size}% - 1.3rem)`;
        myCard.element.style.order = myCard.position;

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

/* cards.forEach(row => {
    let myRow = document.createElement("div");
    myRow.className = "card-row";
    row.forEach(card => {
        let myCard = document.createElement("img");
        myCard.className = "card hidden";
        myCard.textContent = card.id;
        myCard.src ="./img/kotlin.svg";
        myCard.addEventListener("click", () => myCard.className = "card revealed");
        myRow.appendChild(myCard)
    });
    game.appendChild(myRow);
}); */



function revealCard(myCard){
    if (myCard.flipped || lock) return;

    myCard.flipped = true;
    myCard.element.classList.toggle("revealed");

    selectCard(myCard);
}

function selectCard(card){
    updateTurns();

    if (!firstCard){
        firstCard = card;
        return;
    }

    secondCard = card;

    lock = true;
    checkMatch();
}

function checkMatch(){
    if (firstCard.id === secondCard.id){
        updateMatches();
        firstCard.solved = true;
        secondCard.solved = true;
        firstCard = null;
        secondCard = null;
        lock = false;
        if (matches === numberOfCards/2) setTimeout(gameOver, 500);
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
    alert("game over!");
    restartGame();
}

function updateTurns(){
    turnsLabel.textContent = `${++turns}`;
}

function updateMatches(){
    matchesLabel.textContent = `${++matches}`;
}

function restartGame(){
    console.log("hello")
    turns = -1;
    matches = -1;
    updateMatches();
    updateTurns();

    firstCard = secondCard = null;
    lock = false;

    cards = [];
    game.replaceChildren();
    initBoard();
}
