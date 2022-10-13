const WHITE = 0;
const BLACK = 1;



; (async () => {
  const board = Array.from({ length: 8 }).map(e => Array.from({ length: 8 }).map(e => ({
    piece: "blank",
    color: -1,
    child: null,
    hud: null,
    huColor: null,
  })))

  const chien = document.getElementsByTagName("cg-board")[0]

  // const chien = document.querySelector("#main-wrap > main > div.analyse__board.main-board > div.cg-wrap.cgv1.orientation-white.manipulable > cg-container > cg-board");
  const container = document.createElement("div");
  container.style.width = `${chien.clientWidth}px`;
  container.style.height = `${chien.clientHeight}px`;
  container.style["pointer-events"] = `none`;
  // container.style.background = "red";
  container.style["z-index"] = "8888";
  container.style.transform = "rotate(0deg)";

  for (let line of board) {
    const divLine = document.createElement("div");
    divLine.style.with = "100%";
    divLine.style.display = "flex";
    container.appendChild(divLine);
    for (let point of line) {
      const hud = document.createElement("div");
      hud.style.width = `${chien.clientWidth / 8}px`;
      hud.style.height = `${chien.clientHeight / 8}px`;
      hud.style.outline = "1px solid blue";
      point.hud = hud;
      divLine.appendChild(hud)
    }
  }
  chien.appendChild(container)

  const getBoard = () => {
    // const boardEl = document.querySelector("#main-wrap > main > div.analyse__board.main-board > div.cg-wrap.cgv1.orientation-white.manipulable > cg-container > cg-board");
    const boardEl = document.getElementsByTagName("cg-board")[0]

    const width = boardEl.clientWidth;
    const height = boardEl.clientHeight;
    for (let line of board) {
      for (let point of line) {
        point.piece = "blank";
        point.huColor = null;
      }
    }
    for (let child of boardEl.childNodes) {
      if (child.className.indexOf("last-move") !== -1) continue;
      if (child === container) continue;
      const spClass = child.className.split(" ");
      const color = { black: BLACK, white: WHITE }[spClass[0]];
      const type = spClass[1];
      const pos = child.style.transform.split("(")[1].split(")")[0].split(",").map(e => parseInt(e.replace("px", "").trim()))

      const x = Math.floor(pos[0] / width / 0.125);
      const y = Math.floor(pos[1] / height / 0.125);
      board[y][x].piece = type;
      board[y][x].color = color;
      board[y][x].child = child;
    }
    return board;
  };

  const blit = () => {
    for (let line of board) {
      for (let point of line) {
        if (point.huColor) {
          point.hud.style.background = point.huColor;
        } else {
          point.hud.style.background = "none";
        }
      }
    }
  }

  const printboard = () => {
    let final = ""
    for (let line of board) {
      let str = ""
      for (let point of line) {
        if (point.piece === "pawn") {
          str += " X "
        } else {
          str += " . "
        }
      }
      final += `${str}\n`
    }
    console.log(final);
  };

  const analyse = () => {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const piece = board[y][x];
        if (piece.piece === "pawn") {
          piece.huColor = "red";
        }
      }
    }
  };


  while (true) {
    try {
        getBoard();
        analyse(board);
        printboard()
        blit();
    } catch (e) {
      console.log(e);
    }
    await new Promise(r => setTimeout(r, 300));
  }
})()