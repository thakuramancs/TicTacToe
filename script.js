// JavaScript code for the TicTacToe game

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        checkWinner();
        togglePlayer();
    }
}

function updateBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.innerText = gameBoard[i];
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleMove(i));
        board.appendChild(cell);
    }
}

function togglePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            displayWinner(gameBoard[a]);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        displayDraw();
    }
}

function displayWinner(winner) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = `Player ${winner} wins!`;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    let winningCells = [];
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            winningCells = [a, b, c];
            break;
        }
    }

    animateWinningCells(winningCells);

    gameActive = false;
}

function displayDraw() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = 'It\'s a draw!';
    gameActive = false;
}

function animateWinningCells(winningCells) {
    const board = document.getElementById('board');
    for (const index of winningCells) {
        const cell = board.children[index];
        cell.classList.add('winning-cell');
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    updateBoard();

    const board = document.getElementById('board');
    for (const cell of board.children) {
        cell.classList.remove('winning-cell');
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerText = '';

    const resetButton = document.getElementById('resetButton');
    resetButton.style.animation = 'none';
    void resetButton.offsetWidth; // Trigger reflow to restart the animation
}

