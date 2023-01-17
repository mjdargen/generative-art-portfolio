var drops = [];
let r = random(20, 30);
let rip = [];
let h = 0;
let aa = 255;
let clouds = [50, 150, 250, 350, 450, 550, 650];
let rain;
function preload() {
  rain = loadSound('assets/Rain.mp3');
}

function setup() {
  angleMode(DEGREES);
  rectMode(CORNERS);
  let cnv = createCanvas(800, 800);
  cnv.mouseClicked(togglePlay);
  background(175);
  for (var i = 0; i < 500; i++) {
    drops[i] = new Drop();
  }
  boundingRect = document.getElementById('defaultCanvas0').getBoundingClientRect();
}

function draw() {
  background(175);
  noStroke();
  fill(124, 13, 14);
  ellipse(125, 125, 100, 100)
  drawMountain();
  cloud(3);
  fill(130);
  rect(0, 800, 800, 450);
  push();
  translate(400, 650);
  if (h < 90) {
    branch(h, r, 255);
    h += 0.1;
  }
  else if (h >= 90 && h < 93) {
    branch(h, r, aa);
    h += 0.01;
    aa--;
  }
  else {
    translate(200, 200)
    h = 0;
    r = random(10, 35);
    aa = 255;
  }
  pop();
  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }
}

class Drop {
  constructor() {
    this.x = random(width);
    this.y = random(-500, -50);
    this.z = random(0, 20);
    this.len = map(this.z, 0, 20, 10, 20);
    this.yspeed = map(this.z, 0, 20, 1, 20);
  }
  fall() {
    this.y = this.y + this.yspeed;
    var grav = map(this.z, 0, 20, 0, 0.2);
    this.yspeed = this.yspeed + grav;

    if (this.y + (220) - (this.z * 10) > height) {
      noFill();
      stroke(80);
      ellipse(this.x, this.y, 10, 10);
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 0, 2);
    }
  }
  show() {
    let thick = map(this.z, 0, 20, 1, 3);
    strokeWeight(thick);
    stroke(80);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}

function branch(h, a, aa) {
  h *= 0.8;
  stroke(0, 0, 0, aa);
  if (h > 20) {
    push();
    rotate(a);
    line(0, 0, 0, -h * 1.5);
    translate(0, -h * 1.5);
    branch(h, a, aa);
    pop();
    push();
    rotate(-a);
    line(0, 0, 0, -h * 1.5);
    translate(0, -h * 1.5);
    branch(h, a, aa);
    pop();
  }
  else {
    noStroke();
    fill(124, 13, 14, aa);
    ellipse(0, 0, 10, 10);
    translate(0, -h * 1.5);
  }
}

function drawMountain() {
  stroke(0);
  fill(90);
  beginShape();
  vertex(-50, 450);
  vertex(165, 300);
  vertex(350, 250);
  vertex(550, 260);
  vertex(800, 380);
  vertex(800, 450);
  endShape();
  beginShape();
  vertex(0, 450)
  vertex(0, 400);
  vertex(240, 310);
  vertex(540, 225);
  vertex(820, 450);
  endShape();
}

function cloud(s) {
  noStroke()
  fill(255, 255, 255, 100);
  for (let i = 0; i < 3; i++) {
    clouds[i] = clouds[i] + s;
  }
  for (let i = 3; i < 6; i++) {
    clouds[i] = clouds[i] + (s / 2);
  }
  for (let i = 5; i < 7; i++) {
    clouds[i] = clouds[i] + (s / 3);
  }
  ellipse(clouds[0], 100, 100, 10);
  ellipse(clouds[1], 150, 200, 15);
  ellipse(clouds[2], 50, 50, 10);
  ellipse(clouds[3], 175, 300, 20);
  ellipse(clouds[4], 80, 200, 5);
  ellipse(clouds[5], 200, 100, 10);
  ellipse(clouds[6], 150, 100, 10);
  for (let i = 0; i < 7; i++) {
    if (clouds[i] > 800) {
      clouds[i] = 0;
    }
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

document.addEventListener('click', function (e) {
  console.log(Math.floor(e.x - boundingRect.x), Math.floor(e.y - boundingRect.y));
});

function togglePlay() {
  if (rain.isPlaying()) {
    rain.pause();
  } else {
    rain.loop();
  }
}