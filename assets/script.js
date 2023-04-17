//add new cards here, make sure to add images with same name in assets/images
let buttonList = [
    "cat1", "cat1",
    "cat2", "cat2",
    "cat3", "cat3",
    "cat4", "cat4",
    "cat5", "cat5",
    "cat6", "cat6",
    "cat7", "cat7",
    "cat8", "cat8",
    "cat9", "cat9",
];

//determine amount of user attempts and amount of points needed to win
const definedUserChances = 20;
const pointsToWin = 9;

//hide scoreboard until start is clicked
const scoreBoard = document.getElementById('score-board');
scoreBoard.hidden = true;

//hide cards before game starts
document.getElementById('content-list').style.display = 'none';
// starts game and displays cards
startGame = () => {
    document.getElementById('content-list').style.display = 'grid';
    //shuffles array
    const shuffle = (buttonList) => {
        return buttonList.sort(() => 0.5 - Math.random());
    }
    shuffle(buttonList);
    

    //disables start button so it can only clicked once
    document.getElementById('home').style.display = 'none';
    document.getElementById('title').style.display = 'none';
    document.getElementById('start').style.display = 'none';
    
    //displays scoreboard
    let userScore = 0;
    let userChances = definedUserChances;
    
    //adds buttons to div
    var display = document.getElementById('content-list');

    for (var i = 0; i < buttonList.length; i++) {
        
        var btn = document.createElement('button');
        btn.setAttribute('id', buttonList[i]);
        btn.setAttribute('class', 'card');
        //adding 'flip' to cards so they first display flipped
        btn.classList.add('flip');
        const img = document.createElement("img");
        img.src = '././assets/images/' + btn.id  + '.png';
        btn.appendChild(img);
        display.appendChild(btn);
    }

    // allows flipping card
    const cards = document.querySelectorAll('.card');

    //remove 'flip from cards' to flip cards
    setTimeout(() => {
        for (let card of cards) {
            if (card.classList.contains("flip")) {
                card.classList.remove("flip");
            }
          }
    }, 5000);
    
    
    let hasFlippedCard = false;
    let firstCard, secondCard;

    //check if cards match
    function flipCard() {
        this.classList.add('flip');
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        secondCard = this;
        hasFlippedCard = false;
        checkForMatch();
    }

    //checks if card matches  
    checkForMatch = () => {
        if (firstCard.id === secondCard.id) {
            //if match, disable cards
            disableCards();
            userScore += 1;
            userChances = userChances - 1;
            checkAttemptsLeft();
            return;
        }
        userChances = userChances - 1;
        checkAttemptsLeft();
        //-> if card doesn't match, run unflipCards function
        unflipCards();
       
    }
    let gameOver = document.getElementById('game-over');
    
    //display results
    function checkAttemptsLeft() {
        if (userChances <= 0) {
            gameOver.innerHTML = 'Game Over. Try again! <br>Your score is: ' + userScore;
            removeCards();
            scoreBoard.hidden = false;
            scoreBoard.classList.add('show-score');
            if (userChances == 0 && userScore >= pointsToWin) {
                gameOver.innerHTML = 'You did it! <br>Your score is: ' + userScore;
                removeCards();
                scoreBoard.hidden = false;
                scoreBoard.classList.add('show-score');
            }
        }
        else if (userScore >= pointsToWin) {
            gameOver.innerHTML = 'You did it! <br>Your score is: ' + userScore;
            removeCards();
            scoreBoard.hidden = false;
            scoreBoard.classList.add('show-score');
        }
 
    }
    //disables cards that matches
    disableCards = () => {
        firstCard.removeEventListener('click', flipCard);
        firstCard.classList.add('bounce');
        secondCard.removeEventListener('click', flipCard);
        secondCard.classList.add('bounce');
    }

    //unflips cards that do not match
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }, 1000);
    }

    //listens for a click
    cards.forEach(card =>
        card.addEventListener('click', flipCard)
    );

};

//deletes the div
function removeCards() {
    const buttons = document.getElementById('content-list');
    buttons.parentNode.removeChild(buttons);
}

//resets the game
function reset() {
    newDiv();
    startGame();
}

//creates new div to hold button after being deleted
function newDiv() {
    var div = document.createElement('div');
    div.setAttribute('id', 'content-list');
    document.getElementsByClassName('card-list')[0].appendChild(div);   
}







