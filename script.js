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

        // 🔥 TOUCH EFFECT (mobile)
        div.style.transition = "0.2s";
        div.addEventListener("touchstart", () => {
            div.style.background = "#ddd";
        });
        div.addEventListener("touchend", () => {
            div.style.background = "white";
        });

        div.onclick = () => handleClick(index);

        boardDiv.appendChild(div);
    });
}

function handleClick(index) {
    if (!gameActive) return;

    // 👉 apna move hata sakte ho
    if (board[index] === currentPlayer) {
        board[index] = "";
        createBoard();
        return;
    }

    if (board[index] === "") {
        board[index] = currentPlayer;
        createBoard();
        checkWinner();
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
            statusText.innerText = `Player ${board[a]} Wins!`;
            gameActive = false;
            setTimeout(resetGame, 5000); 
            return;
        }
    }

    if (!board.includes("")) {
        statusText.innerText = "Match Draw!";
        gameActive = false;
        setTimeout(resetGame, 5000);
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = `Player ${currentPlayer}'s turn`;
    createBoard();
}

createBoard();