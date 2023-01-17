//mathematical beauty: perspective theory; 1 dimension
let add = false;
let left = false;


function setup() {
  createCanvas(500, 500);
  rectMode(CORNERS);
  background(255);
}

function draw() {
  if (add) {
    let xx = random(10, 490);
    let yy = random(10, 490);
    let w = random(-20, 20);
    let h = random(-40, 40);

    let red = random(255);
    let blue = random(255);
    let green = random(255);

    stroke(red, green, blue);
    strokeWeight(random(0.5, 2));
    fill(red, green, blue, 70);
    rect(xx, yy, xx + w, yy + h);
    line(mouseX, mouseY, xx, yy);
    line(mouseX, mouseY, xx + w, yy + h);
    line(mouseX, mouseY, xx, yy + h);
    line(mouseX, mouseY, xx + w, yy);
  }
  if (left) {
    background(255);
  }

}

function keyPressed() {
  if (key == ' ') {
    add = true;
  } else if (keyCode == BACKSPACE) {
    left = true;
  }
}

function keyReleased() {
  add = false;
  left = false;
}
