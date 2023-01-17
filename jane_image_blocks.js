let img;
let smallPoint, largePoint;

//String[] symbols = "@#8&OLI)i=+;:,. ".split("");

function preload() {
  img = loadImage("assets/parrot.jpg");
}

function setup() {
  createCanvas(800, 800);
  background(255);

  smallPoint = 4;
  largePoint = 40;
  imageMode(CENTER);
  noStroke();
  background(255);
  frameRate(120);
}

function draw() {
  for (let i = 0; i < 16; i++) {
    let pointillize = map(mouseX, 0, width, smallPoint, largePoint);
    let x = int(random(img.width));
    let y = int(random(img.height));
    let r = red(img.get(x, y));
    let g = green(img.get(x, y));
    let b = blue(img.get(x, y));
    //color pix = img.get(x, y);
    fill(r, g, b, 128);
    rectMode(CENTER);
    rect(x, y, pointillize, pointillize);
  }
}
