const boxes = document.querySelectorAll(".box");
const resultMessage = document.querySelector(".result-message");
const turnMessage = document.querySelector(".whose-turn");

const gameBoard = (function () {
  const board = [];

  const render = () => {
    boxes.forEach((box) => {
      board.push(box);
    });
  };

  const update = (index, value) => {
    if (board[index].textContent === "") {
      board[index].textContent = value;
    } else {
      alert("Please select another box!");
    }
  };

  const resetBoard = () => {
    boxes.forEach((box) => {
      box.textContent = "";
      box.style.color = "black";
    });
  };

  const getBoard = () => board;

  return { render, update, resetBoard, getBoard };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

const game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(prompt("Enter your name."), "X"),
      createPlayer(prompt(`Enter your opponent's name.`), "O"),
    ];
    currentPlayerIndex = 0;
    turnMessage.textContent = `It's ${players[currentPlayerIndex].name}'s turn.`;
    gameOver = false;
    gameBoard.render();
    boxes.forEach((box) => {
      box.addEventListener("click", handleClick);
    });
  };

  const handleClick = (event) => {
    if (gameOver) return

    let index = event.target.id;
    gameBoard.update(index, players[currentPlayerIndex].marker);

    if (checkForWin(gameBoard.getBoard(), players[currentPlayerIndex].marker)) {
      gameOver = true;
      turnMessage.textContent = "";
      resultMessage.textContent = `${players[currentPlayerIndex].name} wins!`;
    } else if (checkForTie(gameBoard.getBoard())) {
      gameOver = true;
      turnMessage.textContent = "";
      resultMessage.textContent = `It's a tie.`;
    }

    if (currentPlayerIndex === 0) {
      currentPlayerIndex = 1;
      turnMessage.textContent = `It's ${players[currentPlayerIndex].name}'s turn.`;
    } else if (currentPlayerIndex === 1) {
      currentPlayerIndex = 0;
      turnMessage.textContent = `It's ${players[currentPlayerIndex].name}'s turn.`;
    } 

  };

  const restart = () => {
    gameBoard.resetBoard();
    currentPlayerIndex = 0;
    turnMessage.textContent = `It's ${players[currentPlayerIndex].name}'s turn.`;
    gameOver = false;
    gameBoard.render();
  };

  return { start, handleClick, restart };
})();

function checkForWin(board, value) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      board[a].textContent === value &&
      board[a].textContent === board[b].textContent &&
      board[a].textContent === board[c].textContent
    ) {
      board[a].style.color = "lime";
      board[b].style.color = "lime";
      board[c].style.color = "lime";
      return true;
    }
  }

  return false;
}

const checkForTie = (board) => {
  return board.every((box) => box.textContent !== "");
};

const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
  game.restart();
  resultMessage.textContent = "";
});

game.start();
