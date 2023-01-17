
function setup() {
  createCanvas(1000, 1000);
  background(0);
  strokeWeight(5);
  stroke(255);
  ellipseMode(CENTER);
  for (let i = 100; i < width; i += 100) {
    for (let j = 100; j < height; j += 100) {
      square(i, j, 100);
      fill(random(255), random(255), random(255));
      ellipse(i + 50, j + 50, random(10, 88), random(10, 88));
    }
  }
}

function square(x, y, l) {
  rectMode(CENTER);
  fill(random(255), random(255), random(255));
  rect(x, y, l, l);
}
