// JavaScript code for Tic-Tac-Toe with AI

const board = document.getElementById('board');
const restartButton = document.getElementById('restart-button');
const cells = Array.from(document.querySelectorAll('.cell'));

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerTurn = true; // Flag to track the player's turn

// Winning combinations
const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Function to handle a cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cells.indexOf(cell);

    if (boardState[cellIndex] === '' && gameActive && playerTurn) {
        placeMark(cell, cellIndex);
        if (checkWin(currentPlayer)) {
            endGame(false);
        } else if (isBoardFull()) {
            endGame(true);
        } else {
            currentPlayer = 'O';
            // setMessage(`Player ${currentPlayer}'s turn`); // Removed page alert
            
            playerTurn = false; // Player's turn is over
            setTimeout(aiMove, 500); // AI move with a slight delay
        }
    }
}

// Function to place a mark (X or O) on the board
function placeMark(cell, cellIndex) {
    cell.textContent = currentPlayer;
    boardState[cellIndex] = currentPlayer;
}

// Function to check if the current player has won
function checkWin(player) {
    return winCombos.some(combination => {
        return combination.every(index => boardState[index] === player);
    });
}

// Function to check if the board is full (tie)
function isBoardFull() {
    return boardState.every(cell => cell !== '');
}

// Function to end the game
function endGame(isTie) {
    if (isTie) {
        setMessage("It's a Tie!");
    } else {
        setMessage(`${currentPlayer} Wins!`);
    }
    gameActive = false;
}

// Function to display a message on the screen
function setMessage(message) {
    setTimeout(() => {
        alert(message);
    }, 100);
}

// Function to restart the game
function restartGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

// AI move using the minimax algorithm
function aiMove() {
    if (gameActive && !playerTurn) { //Check if it's the AI's turn
        let bestScore = -Infinity;
        let move;

        for (let i = 0; i < 9; i++) {
            if (boardState[i] === '') {
                boardState[i] = 'O';
                let score = minimax(boardState, 0, false);
                boardState[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }

        if (move !== undefined) {
            placeMark(cells[move], move); // Place AI move
            if (checkWin('O')) {
                endGame(false);
            } else if (isBoardFull()) {
                endGame(true);
            } else {
                currentPlayer = 'X';
                // setMessage(`Player ${currentPlayer}'s turn`); // removed page alert
            }
        }
        
        playerTurn = true; // AI's turn is over
    }
}

// Minimax algorithm for AI move
function minimax(board, depth, isMaximizing) {
    const scores = {
        X: -1,
        O: 1,
        Tie: 0
    };

    const result = checkWin('O') ? 'O' : checkWin('X') ? 'X' : isBoardFull() ? 'Tie' : null;

    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
