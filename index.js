const WHITE = 0;
const BLACK = 1;

const getBoard = () => {
  const board = Array.from({ length: 8 }).map(e => Array.from({ length: 8 }).map(e => ({
    piece: "blank",
    color: -1,
    child: null,
  })))
  const boardEl = document.querySelector("#main-wrap > main > div.analyse__board.main-board > div.cg-wrap.cgv1.orientation-white.manipulable > cg-container > cg-board");
  const width = boardEl.clientWidth;
  const height = boardEl.clientHeight;
  for (let child of boardEl.childNodes) {
    if (child.className.indexOf("last-move") !== -1) continue;
    const spClass = child.className.split(" ");
    const color = { black: BLACK, white: WHITE }[spClass[0]];
    const type = spClass[1];
    const pos = child.style.transform.split("(")[1].split(")")[0].split(",").map(e => parseInt(e.replace("px", "").trim()))
    const x = Math.floor(pos[0] / width / 0.125);
    const y = Math.floor(pos[1] / height / 0.125);
    board[y][x] = { piece: type, color, child };
  }
  return board;
};

const printboard = (board) => {
  let final = ""
  for (let line of board) {
    let str = ""
    for (let point of line) {
      if (point.piece !== "blank") {
        str += " X "
      } else {
        str += " . "
      }
    }
    final += `${str}\n`
  }
  console.log(final);
};

; (async () => {
  while (true) {
    const board = getBoard();
    printboard(board);
    await new Promise(r => setTimeout(r, 500));
  }
})()