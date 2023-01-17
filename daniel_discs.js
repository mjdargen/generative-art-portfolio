const xpos = new Array(100);
const ypos = new Array(100);

function setup() {
  createCanvas(800, 800);
  frameRate(60);
  background(255);
  for (let i = 0; i < xpos.length; i++) {
    xpos[i] = 0;
    ypos[i] = 0;
  }
}

function draw() {
  background(255);
  //Shape
  for (let i = 0; i < xpos.length - 1; i++) { //Update position
    xpos[i] = xpos[i + 1];
    ypos[i] = ypos[i + 1];
  }
  xpos[xpos.length - 1] = mouseX;
  ypos[ypos.length - 1] = mouseY;
  for (let i = 0; i < xpos.length; i++) {
    drawBubble(xpos[i], ypos[i], i);
  }
}

function drawBubble(x, y, p) {
  stroke(0);
  for (let i = 1; i < 5; i++) {
    fill(255 / i, 137 / i, 255 / i);
    ellipse(x, y, p / i, p / i);
  }
}
