const boxes = document.querySelectorAll(".box");

function createPlayer(name, marker) {
  const setMarker = () => {
    box.textContent = marker;
  };
  return { name, setMarker };
}

function setGame() {
  const user1 = createPlayer(prompt("Enter your name."), "X");
  console.log(user1);
  const user2 = createPlayer(prompt(`Enter your opponent's name.`), "O");
  console.log(user2);
}

const gameBoard = (function () {
  const board = [];
  boxes.forEach((box) => {
    board.push(box);
    let user1Turn = 1;
    if (user1Turn === 1) {
      user1.setMarker();
      user1Turn = 0;
    } else {
      user2.setMarker();
      user1Turn = 1;
    }
  });
  const reset = () => {
    board.textContent = "";
  };
  return { reset };
})();

setGame();
