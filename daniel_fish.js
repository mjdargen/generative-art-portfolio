let count = 0;
let fishNum = 200;

function setup() {
  createCanvas(800, 800);
  background(173, 216, 230);
}

function draw() {
  drawFish(int(random(100, 700)), int(random(100, 700)), int(random(1, 4)), int(random(10, 255)), int(random(10, 255)), int(random(10, 255)));
  count++;
  if (count == fishNum) noLoop();
}

function drawFish(x, y, scale, r1, r2, r3) {
  push();
  translate(x, y);
  stroke(0);
  fill(r1, r2, r3); //orange 244, 115, 24
  //Tail
  triangle(scale * 70, scale * 25, scale * 70, scale * -25, scale * 35, 0);
  //Body
  ellipse(0, 0, scale * 100, scale * 50);
  //Eye
  fill(0);
  ellipse(scale * -25, scale * -8, scale * 5, scale * 5);
  //Gills
  line(scale * -20, scale * 8, scale * -13, scale * -5);
  line(scale * -14, scale * 8, scale * -7, scale * -5);
  line(scale * -8, scale * 8, scale * -1, scale * -5);
  pop();
}
