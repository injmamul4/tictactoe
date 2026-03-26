let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusText = document.getElementById("status");
const boardDiv = document.getElementById("board");

function createBoard() {
    boardDiv.innerHTML = "";

    board.forEach((cell, index) => {
        const div = document.createElement("button");
        div.classList.add("cell");
        div.innerText = cell;
        div.onclick = () => handleClick(index);
        boardDiv.appendChild(div);
    });
}

function handleClick(index) {
    if (!gameActive || currentPlayer !== "X") return;

    if (board[index] === "") {
        board[index] = "X";
        createBoard();
        checkWinner();

        if (gameActive) {
            currentPlayer = "O";
            statusText.innerText = "Computer's turn";
            setTimeout(computerMove, 500);
        }
    }
}

function computerMove() {

    const winCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    // 🎲 50% RANDOM
    if (Math.random() < 0.5) {
        let empty = board.map((v,i) => v === "" ? i : null).filter(v => v !== null);
        if (empty.length > 0) {
            board[empty[Math.floor(Math.random() * empty.length)]] = "O";
            return afterMove();
        }
    }

    // 🧠 TRY WIN
    for (let combo of winCombos) {
        let [a,b,c] = combo;
        let values = [board[a], board[b], board[c]];
        if (values.filter(v => v === "O").length === 2 && values.includes("")) {
            board[combo[values.indexOf("")]] = "O";
            return afterMove();
        }
    }

    // 🛑 BLOCK
    for (let combo of winCombos) {
        let [a,b,c] = combo;
        let values = [board[a], board[b], board[c]];
        if (values.filter(v => v === "X").length === 2 && values.includes("")) {
            board[combo[values.indexOf("")]] = "O";
            return afterMove();
        }
    }

    // ⭐ CENTER
    if (board[4] === "") {
        board[4] = "O";
        return afterMove();
    }

    // 🎯 CORNERS
    let corners = [0,2,6,8].filter(i => board[i] === "");
    if (corners.length > 0) {
        board[corners[Math.floor(Math.random() * corners.length)]] = "O";
        return afterMove();
    }

    // 🔄 RANDOM fallback
    let empty = board.map((v,i) => v === "" ? i : null).filter(v => v !== null);
    if (empty.length > 0) {
        board[empty[Math.floor(Math.random() * empty.length)]] = "O";
    }

    afterMove();
}

function afterMove() {
    createBoard();
    checkWinner();

    if (gameActive) {
        currentPlayer = "X";
        statusText.innerText = "Player X's turn";
    }
}

function checkWinner() {
    const winCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let combo of winCombos) {
        let [a,b,c] = combo;

        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.innerText = board[a] === "X" ? "You Win 😎" : "Computer Wins 🤖";
            gameActive = false;
            setTimeout(resetGame, 5000);
            return;
        }
    }

    if (!board.includes("")) {
        statusText.innerText = "Match Draw!";
        gameActive = false;
        setTimeout(resetGame, 5000);
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = "Player X's turn";
    createBoard();
}

createBoard();
