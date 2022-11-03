 let game = document.querySelector("#game");
/*
let cards = [...game.querySelectorAll(".card-row")];

cards.forEach((element,index,array) => array[index] = [...element.querySelectorAll(".card")]);

cards.forEach(row => {
    row.forEach(card => card.style.backgroundColor = "blue");
}); */
class Card {
    constructor(id, element){
        this.id = id;
        this.position = Math.floor(Math.random()*NumberOfCards)
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


let NumberOfCards = 16;
let cardsPerRow = 4;

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
    for (let i = 0, j = 0; i < NumberOfCards; i++, j++){
        let myCard = new Card(i, document.createElement("div"));
        myCard.element.className = "card";
        myCard.element.style.width = `calc(${size}% - 1.3rem)`;
        myCard.element.style.height = `calc(${size}% - 1.3rem)`;
        let backFace = document.createElement("img");
        backFace.className = "back-face";
        backFace.src = "./img/question-mark.svg";
        let frontFace = document.createElement("img");
        frontFace.className = "front-face hidden";
        frontFace.src = images.get(Math.floor(j/2));
        myCard.element.appendChild(backFace);
        myCard.element.appendChild(frontFace);
        myCard.element.addEventListener("click", revealCard);
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



function revealCard(){
    this.element.classList.toggle("revealed");
}