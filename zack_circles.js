const shapes = [];

function setup() {
  createCanvas(800, 800);
  background(0);
  noStroke();
  for (let i = 2300; i > 10; i -= 50) {
    let colors = newColors(3);
    shapes.push(new Shape(mouseX, mouseY, i, colors[0], colors[1], colors[2]));
  }
}


function draw() {
  for (let i = 0; i < shapes.length; i++) {
    if (mouseIsPressed == true) {
      let colors = newColors(3);
      shapes[i].updateColor(colors[0], colors[1], colors[2]);
    } else {
      shapes[i].update();
    }
  }

}

function newColors(size) {
  const colors = [];
  for (let i = 0; i < size; i++) {
    let c = int(random(255));
    if (c < 127) {
      c = 0;
    } else {
      c = 255;
    }
    colors.push(c);
  }
  return colors;
}

class Shape {
  x;
  y;
  w;
  c1;
  c2;
  c3;

  constructor(
    x,
    y,
    w,
    c1,
    c2,
    c3
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
  }

  update() {
    fill(this.c1, this.c2, this.c3);
    ellipse(mouseX, mouseY, this.w, this.w);
  }

  updateColor(c1, c2, c3) {
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
  }

}
