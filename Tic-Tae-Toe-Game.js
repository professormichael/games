const board = document.getElementById('game-board');
const cells = document.getElementsByClassName('cell');
const alphabet = "X";
const enemy_alphabet = "O";
let currentPlayer = alphabet;

board.addEventListener('click', handleCellClick);

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.dataset.index;

  if (cell.innerText === "") {
    cell.innerText = currentPlayer;
    if (checkWin(currentPlayer)) {
      alert(currentPlayer + " wins!");
      resetGame();
      return;
    }

    if (checkDraw()) {
      alert("It's a draw!");
      resetGame();
      return;
    }

    currentPlayer = currentPlayer === alphabet ? enemy_alphabet : alphabet;
    if (currentPlayer === enemy_alphabet) {
      computerMove();
    }
  }
}

function computerMove() {
  const emptyCells = Array.from(cells).filter(cell => cell.innerText === "");
  console.log(emptyCells)
  const randomIndex = Math.floor( emptyCells.length);

  cell.innerText = enemy_alphabet;

  if (checkWin(enemy_alphabet)) {
    alert(enemy_alphabet + " wins!");
    resetGame();
    return;
  }

  if (checkDraw()) {
    alert("It's a draw!");
    resetGame();
    return;
  }

  currentPlayer = alphabet;
}

function checkWin(player) {
  const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
    [1, 5, 9], [3, 5, 7] // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a - 1].innerText === player && cells[b - 1].innerText === player && cells[c - 1].innerText === player) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return Array.from(cells).every(cell => cell.innerText !== "");
}

function resetGame() {
Array.from(cells).forEach(cell => cell.innerText = "");
currentPlayer = alphabet;
}