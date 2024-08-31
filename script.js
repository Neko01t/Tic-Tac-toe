const cells = document.querySelectorAll('.cell')
const currentStatus = document.getElementById('status')
const restartButton = document.getElementById('restart')
const clickSound = document.getElementById('click-sound')
const winSound = document.getElementById('win-sound')
const TheButton = document.querySelector('.button')

clickSound.volume = 0.5;
winSound.volume = 0.3;
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const xImage = 'url("Tic-Tac-Toe_asset/X.png")';
const oImage = 'url("Tic-Tac-Toe_asset/O.png")';

function playClickSound() {
    clickSound.play()
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
            // console.log("working");
            currentStatus.textContent = `Player ${currentPlayer} Wins!`;
            isGameActive = false;
            winSound.play()
            return;
        }
    }

    if (!board.includes('')) {
        // console.log("working");
        currentStatus.textContent = "It's a Draw!";
        isGameActive = false;

    }
};

const handleClick = (event) => {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);
    clickSound.play()
    if (board[index] || !isGameActive) return;
    board[index] = currentPlayer;
    cell.style.backgroundImage = currentPlayer === 'X' ? xImage : oImage;

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentStatus.textContent = `Player ${currentPlayer}'s Turn`;
    checkWinner();
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
