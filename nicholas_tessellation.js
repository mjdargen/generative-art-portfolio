let numRows = 20;
let numCols = 15;
let hexWidth = 40;
let hexHeight = 40;

function setup() {
  createCanvas(600, 600);
  stroke(232, 172, 52);
  strokeWeight(5);
  fill(147, 99, 3);
  background(85, 58, 4);
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      drawHexagon(hexWidth * j, hexHeight * i, hexWidth, hexHeight);
      fill(random(130, 150), random(90, 110), random(0, 50));
    }
  }
}

function drawHexagon(x, y, w, h) {
  beginShape();
  vertex(x + w / 2, y);
  vertex(x + w, y + h / 4);
  vertex(x + w, y + h * 3 / 4);
  vertex(x + w / 2, y + h);
  vertex(x, y + h * 3 / 4);
  vertex(x, y + h / 4);
  endShape(CLOSE);
}
