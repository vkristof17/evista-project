class Card{
    constructor(id, link) {
        this.id = id;
        this.link = link;
    }
}

function isPair(first, second){
    return first.firstChild.src === second.firstChild.src;
}

function setOpacity(element, opacity){
    element.firstChild.style.opacity = opacity;
}

let counter;
let rounds;
let chosenCard;
let chosenCard2;
let best;
let points;
let difficulty = 0;

function CardAdder(){
    points = 0;
    document.getElementById('points').innerHTML = `Points: ${points}`

    let newDif = document.getElementById('cardNumber').value;
    if (difficulty !== newDif){
        difficulty = newDif;
        best = 0;
        document.getElementById('best').innerHTML = 'Best: ∞'
    }
    let images = ["cards/angular.png", "cards/d3.png", "cards/evista.png", "cards/jenkins.png", "cards/postcss.png", "cards/react.png", "cards/redux.png", "cards/sass.png", "cards/ts.png", "cards/webpack.png"];
    if (difficulty > 10)
        difficulty = 10;
    if (difficulty < 3)
        difficulty = 3;
    let playingCards = []
    for(let i = 0; i < difficulty; i++){
        let c1 = new Card(playingCards.length, images[i]);
        playingCards.push(c1);
        let c2 = new Card(playingCards.length, images[i]);
        playingCards.push(c2);
    }

    let cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    while(playingCards.length > 0){
        let randomID = Math.floor(Math.random() * playingCards.length);
        let card = playingCards[randomID];

        for(;randomID < playingCards.length-1; randomID++){
            playingCards[randomID] = playingCards[randomID+1];
        }
        playingCards.pop();

        let newCard = document.createElement("div");
        newCard.classList.add('card');
        newCard.id = card.id;
        newCard.style.boxShadow = '0px 0px 10px black';

        let picture = document.createElement("img");
        picture.src = card.link;
        picture.style.opacity = "0";

        newCard.addEventListener('click', flip2);

        newCard.appendChild(picture);
        cardContainer.appendChild(newCard);

        counter = 0;
        chosenCard = null;
        chosenCard2 = null;
        rounds = 0;
        points = 0;
    }
}

function flip2(){
    if (chosenCard === null) {
        chosenCard = this;
        setOpacity(chosenCard, '1');
    }
    else if(chosenCard2 === null && chosenCard.id !== this.id){
        chosenCard2 = this;
        setOpacity(chosenCard2, '1');
        rounds++;
        document.getElementById('rounds').innerHTML = `Steps: ${rounds}`;

        if (isPair(chosenCard,chosenCard2)){
            points++;
            document.getElementById('points').innerHTML = `Points: ${points}`

            chosenCard.removeEventListener('click', flip2);
            chosenCard2.removeEventListener('click', flip2);
            chosenCard.style.boxShadow = '';
            chosenCard2.style.boxShadow = '';


            setOpacity(chosenCard, '0.5');
            setOpacity(chosenCard2, '0.5');
            chosenCard = null;
            chosenCard2 = null;
        } else{
            setTimeout(function (){
                setOpacity(chosenCard, '0');
                setOpacity(chosenCard2, '0');
                chosenCard = null;
                chosenCard2 = null;
                },1200);
        }
    }
    if (difficulty == points){
        console.log("kitana wins");
        let container = document.getElementById('container');
        let win = document.createElement('div');
        let text = document.createElement('h1');
        text.id = 'win';

        if(best === 0 || best > rounds) {
            best = rounds;
            document.getElementById('best').innerHTML = `Best: ${best}`
        }
    }

}