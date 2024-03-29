let score = 0;
let bestScore = localStorage.getItem('SnakeBestScore') || 0;
document.getElementById('best-score').innerText = 'Best Score: ' + bestScore;

let isGameStarted = false;

document.getElementById('start-button').addEventListener('click', function() {
    if (isGameStarted) {
       
        clearInterval(game);
        score = 0;
        document.getElementById('score').innerText = 'Score: ' + score;
       
    } else {
    
        game = setInterval(startGame, 100);
        isGameStarted = true;
        this.innerText = 'Restart';
    }
});


let canvas = document.getElementById('game-board');
let context = canvas.getContext('2d');

let box = 25;
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function startGame() {
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            if(score > bestScore) {
                bestScore = score;
                localStorage.setItem('SnakeBestScore', bestScore);
                document.getElementById('best-score').innerText = 'Best Score: ' + bestScore;
            }
            score = 0;
            document.getElementById('score').innerText = 'Score: ' + score;
            alert('Game Over :(');
            snake = []; 
            snake[0] = { x: 10 * box, y: 10 * box }; 
        }
    }

    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++; 
        document.getElementById('score').innerText = 'Score: ' + score; 
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);