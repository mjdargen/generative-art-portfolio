let x = 0;
let y = 0;
let px = 0;
let py = 0;
let step = 1;
let state = 0;
let numSteps = 1;
let turnCounter = 1;
let arrIndex = 0;

let max = 200;

let stepSize = 10;
let totalSteps;

function setup() {
  createCanvas(500, 500);
  let cols = width / stepSize;
  let rows = height / stepSize;
  totalSteps = cols * rows;
  px = x;
  py = y;
  background(0);
  x = width / 2;
  y = height / 2;
  fillPrimes(max);
}
const primes = [];

function fillPrimes(x) { //good
  let n = 2;
  while (primes.length < max) { //x number of primes found
    for (let i = 2; i < int(n / 2); i++) {
      if (n % i == 0) {
        n++;
        break;
      }
    }
    n++;
    primes.push(n);
  }
}

function draw() {
  if (step == primes[arrIndex]) {
    fill(255);
    stroke(255);
    circle(x, y, stepSize * 0.5);
    arrIndex++;
  }
  line(x, y, px, py);
  px = x;
  py = y;

  switch (state) {
    case 0:
      x += stepSize;
      break;
    case 1:
      y -= stepSize;
      break;
    case 2:
      x -= stepSize;
      break;
    case 3:
      y += stepSize;
      break;
  }
  if (step % numSteps == 0) {
    state = (state + 1) % 4;
    turnCounter++;
    if (turnCounter % 2 == 0) {
      numSteps++;
    }
  }
  step++;
  if (step > totalSteps) {
    noLoop();
  }
  if (arrIndex == max) {
    noLoop();
  }
}

