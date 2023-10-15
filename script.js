const boxes = document.querySelectorAll(".box");
const resultMessage = document.querySelector(".result-message");
const playersMessage = document.querySelector(".players");

const gameBoard = (function () {
  const board = [];

  const render = () => {
    boxes.forEach((box) => {
      board.push(box);
      box.addEventListener("click", game.handleClick);
    });
  };

  const update = (index, value) => {
    board[index].textContent = value;
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
    playersMessage.textContent = `Player 1: ${players[0].name} // Player 2: ${players[1].name}`;
    gameBoard.render();
  };

  const handleClick = (event) => {
    if (gameOver) return;

    let index = event.target.id;

    if (gameBoard.getBoard()[index].textContent === "") {
      gameBoard.update(index, players[currentPlayerIndex].marker);
      if (checkForWin(gameBoard.getBoard(), players[currentPlayerIndex].marker)) {
        resultMessage.textContent = `${players[currentPlayerIndex].name} wins!`
        gameOver = true;
      } else if (checkForTie(gameBoard.getBoard())) {
        resultMessage.textContent = `It's a tie.`;
        gameOver = true;
      }
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    } else {
      alert("Please select another box!");
    }
  };

  const restart = () => {
    gameBoard.resetBoard();
    currentPlayerIndex = 0;
    resultMessage.textContent = "";
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
});

game.start();