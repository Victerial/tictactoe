let currentPlayer = 'X';
let cells = document.querySelectorAll('.cell');

function checkWinner() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
        return 'Draw';
    }

    return null;
}

function handleClick(event) {
    const cell = event.target;
    if (!cell.textContent) {
        cell.textContent = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            if (winner === 'Draw') {
                alert('Döntetlen!');
            } else {
                alert(`A(z) ${winner} nyert!`);
            }
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            if (currentPlayer === 'O') {
                setTimeout(computerMove, 500); // Számítógép lépése
            }
        }
    }
}

function computerMove() {
    const emptyCells = [...cells].filter(cell => !cell.textContent);
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            if (winner === 'Draw') {
                alert('Döntetlen!');
            } else {
                alert(`A(z) ${winner} nyert!`);
            }
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    }
}

function reset() {
    cells.forEach(cell => cell.textContent = '');
    cells.forEach(cell => cell.addEventListener('click', handleClick));
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));