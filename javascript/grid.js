function createBoard(rows, columns) {
    contenuElt.innerHTML = "";
    let tableElt = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        board[i] = new Array();
        let rowElt = document.createElement('tr');
        rowElt.id = "R" + i;
        for (let j = 0; j < columns; j++) {
            board[i][j] = 0;
            let cellElt = document.createElement('td');
            cellElt.id = "R" + i + "C" + j;
            rowElt.appendChild(cellElt);
        }
        tableElt.appendChild(rowElt);
    }
    contenuElt.appendChild(tableElt);
}

function newGame() {
    createBoard(rows, columns);
    createEventListeners(rows, columns);
}

function createEventListeners(rows, columns) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cellElt = document.getElementById("R" + i + "C" + j);
            cellElt.addEventListener('click', handleClickEvent);
        }
    }
}

function handleClickEvent() {
    let column = Number(this.id.charAt(3));
    let row = rows - 1;
    while (row >= 0) {
        if (board[row][column] == 0) {
            let cellElt = document.getElementById("R" + row + "C" + column);
            let discElt = document.createElement('div');
            discElt.className = "player";
            cellElt.appendChild(discElt);
            discElt.style.backgroundColor = player == 1 ? "red" : "yellow";
            board[row][column] = player;
            checkVictory(row, column);
            player *= -1;
            break;
        } else {
            row--;
        }
    }
}

function checkVictory(row, column) {
    if (checkDirection(row, column, 1, 0) || // Horizontal
        checkDirection(row, column, 0, 1) || // Vertical
        checkDirection(row, column, 1, 1) || // Diagonal
        checkDirection(row, column, 1, -1)) { // Anti-Diagonal
        
        displayVictoryMessage();
        disableAllCells();
    } else {
        console.log("Next turn");
    }
}

function checkDirection(row, column, rowIncrement, columnIncrement) {
    let count = 0;
    for (let step = -3; step <= 3; step++) {
        let newRow = row + step * rowIncrement;
        let newColumn = column + step * columnIncrement;
        if (newRow >= 0 && newRow < rows && newColumn >= 0 && newColumn < columns && board[newRow][newColumn] == player) {
            count++;
            if (count == 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function displayVictoryMessage() {
    victoire = true;
    let winner = (player == 1) ? "Red" : "Yellow";
    let victoryElt = document.createElement('div');
    victoryElt.innerHTML = "<h2>The winner is " + winner + "</h2>";
    contenuElt.appendChild(victoryElt);
}

function disableAllCells() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cellElt = document.getElementById("R" + i + "C" + j);
            cellElt.style.backgroundColor = "blue";
            cellElt.removeEventListener('click', handleClickEvent);
        }
    }
}

let columns = 5;
let rows = 5;
let board = new Array();
let contenuElt = document.getElementById('contenu');
contenuElt.innerHTML = "Puissance 4 in JavaScript | Author: Ambroise Bosch";
let player = 1;

let newGameBtn = document.getElementById('newGame');
newGameBtn.addEventListener("click", function () {
    player = 1;
    newGame();
});
