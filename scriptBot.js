const cells = document.querySelectorAll('.cell');
const currentStatus = document.getElementById('status');
const restartButton = document.getElementById('restart');
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');

clickSound.volume = 0.5;
winSound.volume = 0.3;
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const xImage = 'url("Tic-Tac-Toe_asset/X.png")';
const oImage = 'url("Tic-Tac-Toe_asset/O.png")';

function playClickSound() {
    clickSound.play();
}

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            currentStatus.textContent = `Player ${board[a]} Wins!`;
            isGameActive = false;
            winSound.play();
            return;
        }
    }

    if (!board.includes('')) {
        currentStatus.textContent = "It's a Draw!";
        isGameActive = false;
    }
};

const handleClick = (event) => {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);
    playClickSound();
    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    cell.style.backgroundImage = currentPlayer === 'X' ? xImage : oImage;

    checkWinner();

    if (isGameActive && currentPlayer === 'X') {
        currentPlayer = 'O';
        currentStatus.textContent = `Player ${currentPlayer}'s Turn`;
        setTimeout(botMove, 500);
    }
};

const botMove = () => {
    if (!isGameActive || currentPlayer !== 'O') return;

    const availableCells = Array.from(cells).filter((_, index) => !board[index]);
    if (availableCells.length === 0) return;

    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    const index = Array.from(cells).indexOf(randomCell);

    board[index] = 'O';
    randomCell.style.backgroundImage = oImage;

    checkWinner();

    if (isGameActive) {
        currentPlayer = 'X';
        currentStatus.textContent = `Player ${currentPlayer}'s Turn`;
    }
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    currentStatus.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.style.backgroundImage = '');
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
