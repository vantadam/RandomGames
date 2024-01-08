let word = ['tekup', 'adam', 'borhen', 'mohamed', 'random'];
let randomWord = '';
let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
let hangmanStages = [
    '____',
    '|/ \n|\n|\n|\n|____',
    '|/ \n|  O\n|\n|\n|____',
    '|/ \n|  O\n|  |\n|\n|____',
    '|/ \n|  O\n| /|\n|\n|____',
    '|/ \n|  O\n| /|\\\n|\n|____',
    '|/ \n|  O\n| /|\\\n| /\n|____',
    '|/ \n|  O\n| /|\\\n| / \\\n|____'
];

document.getElementById('bestScore').innerText = 'Best Score: ' + bestScore;
function newGame() {
    randomWord = word[Math.floor(Math.random() * word.length)];
    document.getElementById('wordSpotlight').innerText = '_ '.repeat(randomWord.length);
    document.getElementById('guesses').innerText = 'Guessed letters:';
    document.getElementById('hangman').innerText = hangmanStages[0]; // Reset hangman display
    if (!document.getElementById('wordSpotlight').innerText.includes('_')) {
        score = 0;
    }
    document.getElementById('score').innerText = 'Score: ' + score;
}

document.getElementById('reset').addEventListener('click', newGame);

document.addEventListener('keypress', (event) => {
    let guess = event.key;
    if (document.getElementById('wordSpotlight').innerText === 'Failed') {
        return; 
        //ken famma failure ma ykamelch el jeu
    }
    if (randomWord.includes(guess)) {
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
        let wordArray = document.getElementById('wordSpotlight').innerText.split(' ');
        for (let i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === guess) {
                wordArray[i] = guess;
            }
        }

        //el guess
        
        document.getElementById('wordSpotlight').innerText = wordArray.join(' ');
        if (!document.getElementById('wordSpotlight').innerText.includes('_')) {
            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem('bestScore', bestScore);
                document.getElementById('bestScore').innerText = 'Best Score: ' + bestScore;
            }
            newGame();
        }
    } else {
        document.getElementById('guesses').innerText += ' ' + guess;
        let guessedLetters = document.getElementById('guesses').innerText.split(' ').length - 1;
        if (guessedLetters < hangmanStages.length) {
            document.getElementById('hangman').innerText = hangmanStages[guessedLetters];
            
        }
        if (guessedLetters === hangmanStages.length) {
            document.getElementById('wordSpotlight').innerText = 'Failed';
        }
    }
});

newGame();