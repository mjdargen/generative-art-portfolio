let leftThird;
let rightThird;
let x;
let y;
let direction;
let deltaX;

function setup() {
  createCanvas(1000, 1000);
  background(176, 204, 226);
  rectMode(CENTER);

  leftThird = width / 3 + 100;
  rightThird = 2 * width / 3 - 100;

  x = width - 100;
  y = height - 50;
  direction = -1;

  deltaX = float(direction) * float(width - x) * 0.01 + 0.0;
  console.log(deltaX);
}


function draw() {
  // draw the background
  background(176, 204, 226);
  // troposphere line

  strokeWeight(4);
  let tropMaxAlt = 700;
  let spaceMaxAlt = 400;
  let marsMaxAlt = 100;

  stroke(141, 177, 204);
  line(0, tropMaxAlt, width, tropMaxAlt);
  textSize(20);
  fill(141, 177, 204);
  text("Trophosphere", width / 2, tropMaxAlt - 10);

  stroke(97, 162, 212);
  line(0, spaceMaxAlt, width, spaceMaxAlt);
  textSize(20);
  fill(97, 162, 212);
  text("Space-o-sphere", width / 2, spaceMaxAlt - 10);

  stroke(4, 129, 224);
  line(0, marsMaxAlt, width, marsMaxAlt);
  textSize(20);
  fill(4, 129, 224);
  text("Mars-o-sphere", width / 2, marsMaxAlt - 10);

  noStroke();

  fill(0);
  // determine what stage we'ere in
  let stage = "Trophoshere";
  if (y > tropMaxAlt) {
    stage = "Trophoshere";
  } else if (y > spaceMaxAlt) {
    stage = "Space-o-sphere";
  } else if (y > marsMaxAlt) {
    stage = "Mars-o-sphere";
  } else {
    stage = "Too high!";
  }

  text("Stage = " + stage, 10, 30);

  tarmac();



  if (x < width / 2) { // width/2 is takeoff point
    y--;

    let factor = 1;
    if (direction == 1) {
      factor = 11;
    }


    push();
    translate(x, y);
    rotate(factor * PI / 6);
    drawPlane(0, 0);
    pop();
    //drawPlane(x, y);
  } else {
    drawPlane(x, y);
  }


  if (x <= 10) {
    direction *= -1;
  } else if (x > width - 100) {
    direction *= -1;
  }
  deltaX = direction * (width - x + 20) * 0.01;
  x += deltaX;

  if (y <= 0) {
    background(0);
    drawPlane(500, 450);
    fill(255);

    textSize(128);
    text("airplanes :)", 200, 650);
  }
}

function drawPlane(PX, PY) {
  if (direction == -1) {
    airplaneLeft(PX, PY);
  } else {
    airplaneRight(PX, PY);
  }
}
function tarmac() {
  fill(0);
  rect(width / 2, height - 20, width, 40); // x, y, width, height


  // yellow rectangeles in the middle of hte runway

  let num = 10;
  let increment = width / num;
  fill(252, 233, 3);
  for (let x = increment; x < width; x += increment) {
    rectMode(CENTER);
    rect(x, height - 20, 40, 10);
  }
}

function airplaneLeft(REPX, REPY) {
  // draw the airplane
  push();
  fill(43);
  noStroke();
  //let REPX = 0;
  //let REPY = 0;
  rect(REPX, REPY, 200, 40);

  fill(43);
  // add rounding
  ellipse(REPX - 100, REPY, 40, 40);

  fill(255, 165, 0);
  noStroke();
  ellipse(REPX + 100, REPY, 40, 40);

  // draw the airplane
  fill(43);
  noStroke();
  rect(REPX, REPY, 200, 40);

  let dup = 200 / 5;
  for (let x = REPX - 100; x < REPX + 100; x += dup) {
    fill(255);
    ellipse(x, REPY, 10, 10);
  }

  fill(43);
  triangle(REPX + 50, REPY - 20, REPX + 50, REPY - 75, REPX - 25, REPY - 20);

  triangle(REPX + 50, REPY + 20, REPX + 50, REPY + 75, REPX - 25, REPY + 20);
  pop();
}

function airplaneRight(REPX, REPY) {
  // draw the airplane
  push();
  fill(43);
  noStroke();
  //let REPX = 0;
  //let REPY = 0;
  rect(REPX, REPY, 200, 40);

  fill(43);
  // add rounding
  ellipse(REPX + 100, REPY, 40, 40);

  fill(255, 165, 0);
  noStroke();
  ellipse(REPX - 100, REPY, 40, 40);

  // draw the airplane
  fill(43);
  noStroke();
  rect(REPX, REPY, 200, 40);

  let dup = 200 / 5;
  for (let x = REPX + 100; x > REPX - 100; x -= dup) {
    fill(255);
    ellipse(x, REPY, 10, 10);
  }

  fill(43);

  triangle(REPX - 50, REPY + 20, REPX - 50, REPY + 75, REPX + 25, REPY + 20);


  triangle(REPX - 50, REPY - 20, REPX - 50, REPY - 75, REPX + 25, REPY - 20);
  pop();
}
