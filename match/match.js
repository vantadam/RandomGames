const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset');
const timerElement = document.getElementById('timer');
const movesElement = document.getElementById('moves');
let cards = ['red', 'red', 'blue', 'blue', 'green', 'green', 'yellow', 'yellow','brown','brown','grey','grey'];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer = 0;
let timerId;

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

function createCards(cards) {
    gameBoard.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cards[i];
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    }
}
function startTimer() {
    timerId = setInterval(() => {
        timer++;
        timerElement.innerText = `Time: ${timer}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}

function flipCard() {
    if (flippedCards.length === 2) return;
    this.style.backgroundColor = this.dataset.value;
    flippedCards.push(this);
    moves++;
    movesElement.innerText = `Moves: ${moves}`;
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        matchedCards.push(...flippedCards);
        flippedCards = [];
    } else {
        setTimeout(() => {
            flippedCards[0].style.backgroundColor = '';
            flippedCards[1].style.backgroundColor = '';
            flippedCards = [];
        }, 1000);
    }
}
function resetGame() {
    stopTimer();
    timer = 0;
    moves = 0;
    timerElement.innerText = `Time: ${timer}`;
    movesElement.innerText = `Moves: ${moves}`;
    flippedCards = [];
    matchedCards = [];
    shuffleCards(cards);
    createCards(cards);
    startTimer();
}

shuffleCards(cards);
createCards(cards);
startTimer();
resetButton.addEventListener('click', resetGame);