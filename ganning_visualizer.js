/**
 * Bouncy Bubbles  
 * based on code from Keith Peters. 
 * 
 * Multiple-object collision.
 */

// sound files are in `/data`
let rana;

// Declare the processing sound variables
let fft;
let file;
let prevAmp = -1;
let samples = 100;
let beatD;
// ArrayList < Number[] > wPointsFull = new ArrayList < Number[] > ();
// ArrayList < Number[] > drawingVertices = new ArrayList < Number[] > ();
let wPointsFull = [];
const drawingVertices = [];

let filename;
let numBalls = 5;
let spring = 0.05;
let gravity = 0.05;
let friction = -0.9;

// Ball[] balls = new Ball[numBalls];
const balls = [];

function preload() {
  // Load and play a soundfile and loop it
  file = loadSound("assets/sdafasdfa.mp3");
}

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.mouseClicked(togglePlay);
  fft = new p5.FFT();

  // let rms = fft.analyze();
  // let waveform = fft.waveform();

  // waveform = new Waveform(this, samples);
  // waveform.input(file);

  // s = new Sound(this);
  // s.volume(0.1);
  // file.setVolume(2);
  file.rate(1);
  // file.play();

  rms = new p5.Amplitude();
  rms.setInput(file);

  for (let i = 0; i < numBalls; i++) {
    let ball = new Ball(random(width), random(height), random(30, 70), i);
    balls.push(ball);
  }
  for (let i = 0; i < numBalls; i++) {
    balls[i].init(balls);
  }
  noStroke();
  fill(255, 204);
  noLoop();
  console.log(balls.length)
}

function draw() {
  background(0);

  if (!file.isPlaying()) {
    // file ended, show finished drawing 
    //println("Doing finished");
    stroke(144, 238, 144, 100);
    noFill();
    // for (Ball ball: balls) {
    for (let i = 0; i < numBalls; i++) {

      const poses = balls[i].positions;
      beginShape();

      // println(poses.size());

      for (let i = poses.length - 1; i >= 0; i--) {
        vertex(poses[i][0], poses[i][1]);
      }

      endShape();
    }

    textSize(40);
    fill(255);
    text(filename, width / 2 - textWidth(filename) / 2, 40);
    return;
  }

  let waveform = fft.waveform();

  noFill();
  strokeWeight(2);
  stroke(135, 206, 235, 100);

  beginShape();
  for (let i = 0; i < samples; i++) {
    let valX = map(i, 0, samples, 0, width);
    let valY = map(waveform[i], -1, 1, 0, height);
    vertex(
      valX,
      valY
    );

    if (i % 75 == 0) {
      wPointsFull.push([valX, map(waveform[i], -1, 1, 0, 50)]);
    }
  }
  endShape();

  let size = wPointsFull.length;
  if (size > 1000) {

    wPointsFull = wPointsFull.slice(size - 1000, size);
  }
  //println(wPointsFull.size());
  // create 
  beginShape();
  for (let i = 0; i < wPointsFull.length; i++) {
    let vaX = map(i, 0, wPointsFull.length, 0, width);
    let vaY = wPointsFull[i][1];

    vertex(vaX, vaY);

  }

  endShape();

  rana = rms.getLevel();
  rana = map(rana, 0, 1, -0.5, 2);

  //sum += (rana - sum) * 0.1;

  // rms.analyze() return a value between 0 and 1. It's
  // scaled to height/2 and then multiplied by a fixed scale factor
  //float rms_scaled = sum * (height / 2) * 2 + 50;
  //println(rms_scaled);  

  // draw balls

  // for (Ball ball: balls) {
  for (let i = 0; i < numBalls; i++) {
    //float change = rana * 2;
    //if (rms_scaled / 1000 < 30) {
    //  change = - rms_scaled / 1000;
    //}

    //ball.vx += (random(-10, 10)) / 10;
    //ball.vy += (change + random(-10, 10)) / 10;

    //println(ball.vx);
    balls[i].collide();
    balls[i].move();
    balls[i].display();
    // console.log(balls[i].x, balls[i].y);

  }

  stroke(144, 238, 144, 100);
  noFill();

  // for (Ball ball: balls) {
  for (let i = 0; i < numBalls; i++) {

    const poses = balls[i].positions;
    beginShape();

    //println(poses.size());
    if (poses.length > 101) {
      for (let i = poses.length - 1; i > poses.length - 100; i--) {
        vertex(poses[i][0], poses[i][1]);
      }
    }

    endShape();
  }

}

function mousePressed() {
  // for (Ball ball: balls) {
  for (let i = 0; i < numBalls; i++) {
    balls[i].vx += 5;
    balls[i].vy += 5;
  }
  fill(255);
  circle(mouseX, mouseY, 40);
}

class Ball {

  x;
  y;
  diameter;
  vx;
  vy;
  positions = [];

  id;
  c;
  others = [];

  constructor(xin, yin, din, idin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.positions = [];
    this.positions.push([this.x, this.y]);

    this.diameter = din;
    this.id = idin;
    this.others = [];
    this.c = color(random(0, 20), random(75, 200), random(0, 20));
  }

  init(oin) {
    this.others = oin;
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      if (distance < minDist) {
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;

    //if (frameCount
    //x2 = x;
    //y2 = y;
    //x3 = x2;
    //y3 = y2;
    //x4 = x3;
    //y4 = y3;
    this.positions.push([this.x, this.y]);
    let change = rana * 2;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx += change * 2;
      this.vx *= friction;
      //ball.vx += (random(-10, 10)) / 10;
      //ball.vy += (change + random(-10, 10)) / 10;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx -= change * 2;
      this.vx *= friction;
    }



    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy += change * 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy -= change * 2;
      this.vy *= friction;
    }
  }

  display() {
    fill(this.c);
    stroke(color("#90EE90"));

    let len = this.positions.length;
    if (len - 30 >= 0) {
      let x2 = this.positions[(len - 5)][0];
      let y2 = this.positions[(len - 5)][1];
      let x3 = this.positions[(len - 10)][0];
      let y3 = this.positions[(len - 10)][1];
      let x4 = this.positions[(len - 15)][0];
      let y4 = this.positions[(len - 15)][1];

      curve(this.x, this.y, x2, y2, x3, y3, x4, y4);
    }

    //if (len > 140) {

    //   positions = new ArrayList<Number[]>(positions.subList(len-140, len));
    //}

    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}


function togglePlay() {
  if (file.isPlaying()) {
    // file.pause();
    ;
  } else {
    file.play();
    loop();
  }
}