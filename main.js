const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

// Initial snake position and size
let snake = [{ x: 10, y: 10 }];

// Initial food position
let food = { x: 5, y: 5 };

// Initial direction
let direction = 'right';

// Score
let score = 0;

// Snake speed (200 milliseconds)
const speed = 100;

// Variable to store the game interval ID
let gameInterval;

// Function to draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

// Function to update the game state
function update() {
    // Move the snake
    let head = { ...snake[0] };
    if (direction === 'right') head.x++;
    if (direction === 'left') head.x--;
    if (direction === 'up') head.y--;
    if (direction === 'down') head.y++;

    // Update the snake's movement based on key presses
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
        }
    });

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food.x = Math.floor(Math.random() * (canvas.width / 20));
        food.y = Math.floor(Math.random() * (canvas.height / 20));
    } else {
        // Remove the tail segment
        snake.pop();
    }

    // Check for collision with walls or itself
    if (
        head.x < 0 ||
        head.x >= canvas.width / 20 ||
        head.y < 0 ||
        head.y >= canvas.height / 20 ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        endGame();
        return;
    }

    // Add the new head to the snake
    snake.unshift(head);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the snake and food
    drawSnake();
    drawFood();

    // Update the score
    scoreDisplay.textContent = score;
}

// Function to restart the game
function restartGame() {
    // Reset snake, food, score, and direction
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    score = 0;
    direction = 'right';

    // Hide game over message and update the score display
    gameOverMessage.style.display = 'none';
    scoreDisplay.textContent = score;

    // Start the game
    startGame();
}

// Function to start the game
function startGame() {
    // Clear the previous game interval (if any)
    clearInterval(gameInterval);

    // Start the game loop
    gameInterval = setInterval(update, speed);
}

// Event listener for the start button
const startButton = document.getElementById('start-button');
startButton.addEventListener('click', () => {
    startGame();
    startButton.style.display = 'none';
});

// Event listener for the restart button
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
    restartGame();
});

// Event listener for keypress (Enter key) to restart the game
document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && gameOverMessage.style.display === 'block') {
        restartGame();
    }
});

// Function to update the high score
function updateHighScore() {
    const currentHighScore = localStorage.getItem('snakeHighScore') || 0;
    if (score > currentHighScore) {
        localStorage.setItem('snakeHighScore', score);
        highScoreDisplay.textContent = score;
    }
}

// Function to end the game
function endGame() {
    clearInterval(gameInterval);
    updateHighScore();
    gameOverMessage.style.display = 'block';
    finalScore.textContent = score;
}

// Initialize high score
const highScoreDisplay = document.getElementById('high-score-value');
highScoreDisplay.textContent = localStorage.getItem('snakeHighScore') || 0;

// Initialize score
const scoreDisplay = document.getElementById('score-value');

// Initialize game over message and final score
const gameOverMessage = document.getElementById('game-over');
const finalScore = document.getElementById