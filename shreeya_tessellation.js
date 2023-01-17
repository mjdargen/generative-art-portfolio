function setup() {
  createCanvas(800, 800);
  frameRate(0.5);
}


function draw() {
  background(0);
  hexagon();
  hexagon(5, 5);
  hexagon(228, 140);
  hexagon(451, 275);
  hexagon(674, 410);
  hexagon(897, 545);

  hexagon(5, 280);
  hexagon(228, 415);
  hexagon(451, 550);
  hexagon(674, 685);
  hexagon(897, 820);

  hexagon(5, 555);
  hexagon(228, 690);
  hexagon(451, 825);
  hexagon(674, 960);
  hexagon(897, 1095);

  hexagon(5, 830);

  hexagon(228, -135);
  hexagon(451, 0);
  hexagon(674, 135);
  hexagon(897, 270);
}


function hexagon(x, y) {
  push();
  translate(x, y);


  fill(random(170, 51, 106, 255, 182, 193, 255, 213, 128, 255, 255, 224));
  stroke(207, 159, 255);
  strokeWeight(20);

  beginShape();
  vertex(-75, -130);
  vertex(75, -130);
  vertex(150, 0);
  vertex(75, 130);
  vertex(-75, 130);
  vertex(-150, 0);
  endShape(CLOSE);

  pop();
}
