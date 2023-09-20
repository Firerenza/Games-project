const cells = document.querySelectorAll('.cell');
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let turn = 0;
let gameOver = false;
let aiPlayer = '';
let humanPlayer = '';
let aiDepth = 0;

const chooseX = document.querySelector('#choose-x');
const chooseO = document.querySelector('#choose-o');
const depthSelect = document.querySelector('#depth-select');
const restartBtn = document.querySelector('#restart-btn');

chooseX.addEventListener('click', () => {
    aiPlayer = 'O';
    humanPlayer = 'X';
    aiMove();
});

chooseO.addEventListener('click', () => {
    aiPlayer = 'X';
    humanPlayer = 'O';
});

depthSelect.addEventListener('change', () => {
    aiDepth = parseInt(depthSelect.value);
});

restartBtn.addEventListener('click', () => {
    resetBoard();
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameOver && !cell.textContent) {
            cell.textContent = humanPlayer;
            checkWinner();
            if (!gameOver) {
                aiMove();
            }
        }
    });
});

function aiMove() {
    const board = getBoard();
    const move = minimax(board, aiPlayer, aiDepth);
    cells[move.index].textContent = aiPlayer;
    checkWinner();
}

function minimax(board, player, depth) {
    const emptyCells = getEmptyCells(board);
    if (isWinning(board, humanPlayer)) {
        return { score: -10 };
    } else if (isWinning(board, aiPlayer)) {
        return { score: 10 };
    } else if (emptyCells.length === 0) {
        return { score: 0 };
    }

    if (depth ===