//add new cards here, make sure to add images with same name in assets/images
let buttonList = [
    "cat", "cat",
    "dog", "dog",
    "bird", "bird",
    "hamster", "hamster",
];

//determine amount of user attempts and amount of points needed to win
const definedUserChances = 5;
const pointsToWin = 4;

//hide scoreboard until start is clicked
const scoreboard = document.getElementById('score-board');
scoreboard.hidden = true;

// starts game and displays cards
startGame = () => {
    
    //shuffles array
    const shuffle = (buttonList) => {
        return buttonList.sort(() => 0.5 - Math.random());
    }
    shuffle(buttonList);
    

    //disables start button so it can only clicked once
    const startButton = document.getElementById('start');
    startButton.hidden = true;
    
    //displays scoreboard
    scoreboard.hidden = false;
    let userScore = 0;
    let userChances = definedUserChances;
    let score = document.getElementById('score');
    score.innerHTML = userScore;
    let attemptsLeft = document.getElementById('attempts');
    attemptsLeft.innerHTML = userChances;
    
    //adds buttons to div
    var display = document.getElementById('content-list');

    for (var i = 0; i < buttonList.length; i++) {
        
        var btn = document.createElement('button');
        btn.setAttribute('id', buttonList[i]);
        btn.setAttribute('class', 'card');
        //adding 'flip' to cards so they first display flipped
        btn.classList.add('flip');
        const img = document.createElement("img");
        img.src = '/assets/images/' + btn.id  + '.jpg';
        btn.appendChild(img);
        display.appendChild(btn);
    }

    // allows flipping card
    const cards = document.querySelectorAll('.card');

    //remove 'flip from cards' to flip cards
    setTimeout(() => {
        for (let card of cards) {
            if (card.classList.contains("flip")) card.classList.remove("flip");
          }
    }, 5000);
    
    
    let hasFlippedCard = false;
    let firstCard, secondCard;

    // **DANIO QUESTION: WHY WON'T THE FUNCTION BELOW
    // WORK WITH ARROW FUNCTION ?**
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
            score.innerHTML = userScore;
            userChances = userChances - 1;
            attemptsLeft.innerHTML = userChances;
            checkAttemptsLeft();
            return;
        }
        userChances = userChances - 1;
        attemptsLeft.innerHTML = userChances;
        checkAttemptsLeft();
        //-> if card doesn't match, run unflipCards function
        unflipCards();
       
    }

    function checkAttemptsLeft() {
        if (userChances <= 0) {
            display.innerHTML = 'Try again!';
            if (userScore >= pointsToWin) {
                display.innerHTML = 'You did it!';
            }
        }
        else if (userScore >= pointsToWin) {
            display.innerHTML = 'You did it!';
        }
    }
    //disables cards that matches
    disableCards = () => {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }

    //unflips cards that do not match
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }, 1500);
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
    removeCards();
    newDiv();
    startGame();
}

//creates new div to hold button after being deleted
function newDiv() {
    var div = document.createElement('div');
    div.setAttribute('id', 'content-list');
    document.getElementsByClassName('card-list')[0].appendChild(div);   
}







