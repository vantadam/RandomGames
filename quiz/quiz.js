document.addEventListener('DOMContentLoaded', (event) => {
const startContainer = document.getElementById('start');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next');
const highScoreContainer = document.getElementById('high-score');

let highScore = localStorage.getItem('highScore') || 0;
highScoreContainer.innerText = 'High Score: ' + highScore;

const myQuestions = [
    {
        question: "Which method is used to select an element by its ID in JavaScript DOM?",
        answers: {
            a: "getElementById",
            b: "querySelector",
            c: "getElementsByClassName"
        },
        correctAnswer: "a"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: {
            a: "var",
            b: "let",
            c: "const"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the output of console.log(typeof [])?",
        answers: {
            a: "object",
            b: "array",
            c: "undefined"
        },
        correctAnswer: "a"
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        answers: {
            a: "To refer to the current object",
            b: "To create a new object",
            c: "To define a function"
        },
        correctAnswer: "a"
    }
];
let currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', showNextQuestion);

function startGame() {
    startContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    score = 0;
    currentQuestionIndex = 0;
    buildQuiz();
}

function buildQuiz() {
    const currentQuestion = myQuestions[currentQuestionIndex];
    const answers = [];
    for (letter in currentQuestion.answers) {
        answers.push(
            `<button class="answer-button" name="question" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
            </button>`
        );
    }
    quizContainer.querySelector('#quiz').innerHTML =
        `<div class="card">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>
        </div>`;
    
    const buttons = quizContainer.querySelectorAll('.answer-button');
    buttons.forEach(button => {
        button.addEventListener('click', handleAnswerSelection);
    });
}

function handleAnswerSelection(event) {
    const userAnswer = event.target.value;
    const answerButtons = quizContainer.querySelectorAll('.answer-button');
    const correctAnswer = myQuestions[currentQuestionIndex].correctAnswer;
    
    for (let i = 0; i < answerButtons.length; i++) {
        const answerButton = answerButtons[i];
        const answerValue = answerButton.value;
        
        if (answerValue === correctAnswer) {
            answerButton.style.backgroundColor = 'lightgreen';
        } else {
            answerButton.style.backgroundColor = 'initial';
        }
        
        if (answerValue === userAnswer) {
            if (userAnswer === correctAnswer) {
                answerButton.style.backgroundColor = 'lightgreen';
                score++;
            } else {
                answerButton.style.backgroundColor = 'red';
            }
        }
    }
    
    nextButton.disabled = false;
}

function showNextQuestion() {
    const answerContainer = quizContainer.querySelector('.answers');
    const answerLabels = answerContainer.querySelectorAll('label');
    
    for (let i = 0; i < answerLabels.length; i++) {
        const answerLabel = answerLabels[i];
        answerLabel.style.color = 'initial';
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < myQuestions.length) {
        buildQuiz();
    } else {
        endGame();
    }
}

function endGame() {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    resultsContainer.innerText = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreContainer.innerText = 'High Score: ' + highScore;
    }
    setTimeout(() => {
        resultsContainer.style.display = 'none';
        startContainer.style.display = 'block';
    }, 3000);
}
});