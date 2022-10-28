 let game = document.querySelector("#game");
/*
let cards = [...game.querySelectorAll(".card-row")];

cards.forEach((element,index,array) => array[index] = [...element.querySelectorAll(".card")]);

cards.forEach(row => {
    row.forEach(card => card.style.backgroundColor = "blue");
}); */
class Card {
    constructor(id){
        this.id = id;
        this.flipped = false;
        this.solved = false;
    }
}

let cardsPerRow = 4;

let cards = [];

for (let i = 0; i < cardsPerRow; i++){
     cards.push([]);
    for (let j = 0; j < cardsPerRow; j++){
        cards[i][j] = new Card(j);
    }
}

cards.forEach(row => {
    let myRow = document.createElement("div");
    myRow.className = "card-row";
    row.forEach(card => {
        let myCard = document.createElement("div");
        myCard.className = "card hidden";
        myCard.textContent = card.id;
        myCard.addEventListener("click", () => myCard.className = "card revealed");
        myRow.appendChild(myCard)
    });
    game.appendChild(myRow);
});



