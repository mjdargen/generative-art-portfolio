let img;
const w = 8;
const shapes = [];
const shapesM = [];
p5.disableFriendlyErrors = true;

class Shape {
  x;
  y;
  c;
  pos;
  vel;
  acc;
  xi;
  yi;

  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    this.xi = x;
    this.yi = y;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.c = c;
  }

  draw() {
    let d = distSquared(this.x, this.y, mouseX, mouseY);
    if (d <= w * 2) {
      let dir = p5.Vector.sub(mx(), pmx());
      let magnitude = dir.mag();
      this.acc.setMag(magnitude / 2);
      this.acc.add(dir);
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.vel.mult(0.95);
    this.vel.add(this.acc);
    this.acc.mult(0);
    fill(this.c);
    rect(this.x, this.y, w, w);

    const precompute = int(w / 2);
    if (this.x > width - precompute) {
      this.vel.x = -this.vel.x;
    }

    if (this.x < precompute) {
      this.vel.x = -this.vel.x;
    }

    if (this.y > height - precompute) {
      this.vel.y = -this.vel.y;
    }

    if (this.y < precompute) {
      this.vel.y = -this.vel.y;
    }
  }
}

function mx() {
  return new createVector(mouseX, mouseY);
}

function pmx() {
  return new createVector(pmouseX, pmouseY);
}

function distSquared(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return dx * dx + dy * dy;
}

function preload() {
  img = loadImage("assets/mountain_landscape.jpg"); //https://pixabay.com/photos/mountain-landscape-steps-stones-2031539/
}


function setup() {
  // createCanvas(1280, 720);
  createCanvas(640, 360);
  img.resize(width, height);
  image(img, 0, 0);

  for (let i = w / 2; i < width; i += w) {
    for (let j = w / 2; j < height; j += w) {
      let c = get(i, j);
      shapes.push(new Shape(i, j, c));
    }
  }
  frameRate(30);
}

function draw() {
  background(0);
  rectMode(CENTER);
  fill(0);
  noStroke();
  let i = 0;
  while (i < shapes.length) {
    shapes[i].draw();
    if (shapes[i].x != shapes[i].xi) {
      shapesM.push(shapes[i]);
      shapes.splice(i, 1);
    }
    else i++;
  }

  for (let i = 0; i < shapesM.length; i++) {
    shapesM[i].draw();
  }
}
