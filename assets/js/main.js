let score = 0;
const ROWS = 4, COLUMNS = 4;
const BOARD = [
  Array(4).fill(0),
  Array(4).fill(0),
  Array(4).fill(0),
  Array(4).fill(0),
];

window.addEventListener("load", setGame)

function setGame() {
  let num, tile;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      num = BOARD[r][c];

      updateTile(tile, num);
      document.querySelector(".game__board").append(tile);
    }
  }

  setTwo();
  setTwo();
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("game__tile");
  if (num > 0) {
    tile.innerText = num.toString();
    if (num <= 4096) {
      tile.classList.add("game__tile--x"+num.toString());
    } else {
      tile.classList.add("game__tile--x2048");
    }
  }
}

document.addEventListener('keyup', (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  }
  else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  }
  else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  }
  else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.querySelector(".game__points").innerText = score;
})

function filterZero(row){
  return row.filter(num => num != 0);
}

function slide(row) {
  row = filterZero(row);
  for (let i = 0; i < row.length-1; i++){
    if (row[i] == row[i+1]) {
      row[i] *= 2;
      row[i+1] = 0;
      score += row[i];
    }
  }
  row = filterZero(row);
  while (row.length < COLUMNS) {
    row.push(0);
  }
  return row;
}

function slideLeft() {
  for (let r = 0; r < ROWS; r++) {
    let row = BOARD[r];
    row = slide(row);
    BOARD[r] = row;
    for (let c = 0; c < COLUMNS; c++){
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = BOARD[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < ROWS; r++) {
    let row = BOARD[r];
    row.reverse();
    row = slide(row)
    BOARD[r] = row.reverse();
    for (let c = 0; c < COLUMNS; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = BOARD[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < COLUMNS; c++) {
    let row = [BOARD[0][c], BOARD[1][c], BOARD[2][c], BOARD[3][c]];
    row = slide(row);
    for (let r = 0; r < ROWS; r++){
      BOARD[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = BOARD[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < COLUMNS; c++) {
    let row = [BOARD[0][c], BOARD[1][c], BOARD[2][c], BOARD[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < ROWS; r++){
      BOARD[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = BOARD[r][c];
      updateTile(tile, num);
    }
  }
}

function setTwo() {
  if (!hasEmptyTile()) {
      return;
  }

  let found = false;

  while (!found) {
    let r = Math.floor(Math.random() * ROWS);
    let c = Math.floor(Math.random() * COLUMNS);
    if (BOARD[r][c] == 0) {
      BOARD[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("game__tile--x2");
      found = true;
    }
  }
}

function hasEmptyTile() {
  let count = 0;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      if (BOARD[r][c] == 0) {
        return true;
      }
    }
  }

  return false;
}