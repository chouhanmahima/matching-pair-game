const gameBoard = document.getElementById('game-board')
const restartButton = document.getElementById('restart')
const DisplayAttempts = document.getElementById('attempts')


// data stored i array (Card Element)
const cardsArray = [
    '🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍉', '🍉', 
    '🍓', '🍓', '🍒', '🍒', '🍑', '🍑', '🍍', '🍍'
];

let attempts = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

// Shuffle Card
function shuffle (array)  {
    array.sort(() => Math.random() - 0.5);
};

// Create Card
function createBoard() {
    cards = [...cardsArray];
    gameBoard.innerHTML = '';
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.innerText = '';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    
}

// Card Flip
function flipCard() {
    if (lockBoard || this === firstCard)
         return;

    this.classList.add('face-up');
    this.innerText = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;

    checkForMatch();
}

// Check for Match pairs
function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
    attempts++;
    DisplayAttempts.innerText = attempts;
}

// Card Disable
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matchedPairs++;

    if(matchedPairs === cards.length / 2){
        setTimeout(() => {
            alert(`Congratulations!🎊 You've matched all the pairs in ${attempts} attempts!`);
        }, 500);
    }
    resetBoard();
}

// Card Unflip
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.innerText = '';
        secondCard.innerText = '';
        firstCard.classList.remove('face-up');
        secondCard.classList.remove('face-up');
        resetBoard();
    }, 1000);
}

// Reset Board
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}


// Restart Game
const restartGame = () => {
    attempts = 0;
    matchedPairs = 0;
    DisplayAttempts.innerText = attempts;
    resetBoard();
    createBoard();
};

createBoard();
restartButton.addEventListener('click', restartGame)