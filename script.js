const boxes = document.querySelectorAll(".box");
const message = document.querySelector(".message");

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
      box.style.color = 'black';
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
    gameOver = false;
    gameBoard.render();
    boxes.forEach((box) => {
      box.addEventListener("click", handleClick);
    });
  };

  const handleClick = (event) => {
    if (gameOver) return;

    let index = event.target.id;
    gameBoard.update(index, players[currentPlayerIndex].marker);

    if (checkForWin(gameBoard.getBoard(), players[currentPlayerIndex].marker)) {
      gameOver = true;
      message.textContent = `${players[currentPlayerIndex].name} wins!`;
    } else if (checkForTie(gameBoard.getBoard())) {
      gameOver = true;
      message.textContent = `It's a tie.`;
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const restart = () => {
    gameBoard.resetBoard();
    currentPlayerIndex = 0;
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
      board[a].style.color = 'lime';
      board[b].style.color = 'lime';
      board[c].style.color = 'lime';
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
  message.textContent = "";
});

game.start();
