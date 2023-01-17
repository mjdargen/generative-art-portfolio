// Title: "Dystopian Monotony"
class Building {
  xPos;
  yPos;
  width;
  height;
  rotation;
}

//Credits to kithy on openprocessing.org for simulating the shooting stars:
//https://openprocessing.org/sketch/926554
class Star {
  loc;
  vel;

  Star() {
    this.loc = createVector(random(width), random(height));
    this.vel = createVector(-1, 1);
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.loc.x, this.loc.y, random(6), random(6));
    this.loc.add(this.vel);
    if (this.loc.x < 0) {
      this.loc.x = width;
    }
    if (this.loc.y > height) {
      this.loc.y = 0;
    }
  }
}

let city;

const stars = [];
// stars.push(new Star());

const buildings = [];
let numBuildings = 35;
let minWidth = 50;
let maxWidth = 150;
let minHeight = 100;
let maxHeight = 400;
let xpos = 110;
let ypos = 195;

let numStars = 8;
xStars = [];
yStars = [];
flashTimers = [];
let flashDuration = 30;

function preload() {
  // Load and play a soundfile and loop it
  city = loadSound("assets/city.wav");
}



function setup() {
  let cnv = createCanvas(800, 800);
  cnv.mouseClicked(togglePlay);
  background(105, 197, 232);

  // buildings = new Building[numBuildings];
  for (let i = 0; i < numBuildings; i++) {
    buildings.push(new Building());
    buildings[i].xPos = random(0, width);
    buildings[i].yPos = height;
    buildings[i].width = random(minWidth, maxWidth);
    buildings[i].height = random(minHeight, maxHeight);
  }
  for (let i = 0; i < numStars; i++) {
    xStars[i] = random(0, width);
    yStars[i] = random(0, 500);
  }
  for (let i = 0; i < stars.length; i++) {
    stars.push(new Star());
  }
}

let sunX;
let sunY;
let radiusX = 800 + 450;
let radiusY = 800 + 400;
let angle = 0;
let angleSpeed = 0.004;

function draw() {
  background(105, 197, 232);

  //sounds
  if (!city.isPlaying()) {
    city.loop();
  }
  let a = map(mouseY, 0, height, 0.01, 0.3);
  city.amp(a);

  //sun cycle
  angle += angleSpeed;
  sunX = width / 2 + radiusX * cos(angle);
  sunY = height / 2 + radiusY * sin(angle);
  if (sunY > 500) {
    angleSpeed = 0.01;
  } else if (sunY < 100) {
    angleSpeed = 0.003;
  }

  let skyColor = 50 - map(sunY, 0, 200, 0, 130);
  background(skyColor);
  colorMode(RGB, 255, 255, 255);
  fill(255, 255, 0);
  ellipse(sunX, sunY + 250, 100, 100);

  //stars
  let opacity = int(map(skyColor, 50, 0, 0, 255));
  for (let i = 0; i < numStars; i++) {
    let starSize = random(3, 5);
    if (flashTimers[i] > 0) {
      flashTimers[i]--;
      fill(255, opacity);
      ellipse(xStars[i], yStars[i], starSize, starSize);
    } else {
      flashTimers[i] = int(random(0, flashDuration));
    }
  }

  //shooting star
  noStroke();
  let c1 = color(50, 50, 255);
  let c2 = color(10, 30, 50);

  for (let h = 0; h < width; h += 10) {
    let c3 = lerpColor(c2, c1, h / height);
    fill(c3, 50);
    rect(0, h, width, 10);
  }
  for (let i = 0; i < stars.length; i++) {
    stars[i].show();
  }


  //buildings
  for (let i = 0; i < numBuildings; i++) {
    push();
    translate(buildings[i].xPos, buildings[i].yPos);
    for (let floor = 0; floor < buildings[i].height / 10; floor++) {
      let gray = map(floor, 0, buildings[i].height / 10, 0, 255);
      fill(gray);
      rect(0, -(floor * 10), buildings[i].width, 10);
      if (floor % 2 == 0 && floor < (buildings[i].height / 10) - 2) {
        for (let win = 1; win < buildings[i].width / 10 - 1.5; win++) {
          colorMode(RGB, 255, 255, 255);
          let windowColor = int(map(skyColor, 60, 0, 0, 100));
          fill(0, windowColor, windowColor);
          rect((win * 10), -(floor * 10), 7, 7);
        }
      }
    }
    pop();
  }



  //clouds
  fill(80);
  noStroke();
  ellipse(xpos, ypos, 50, 50);
  ellipse(xpos + 80, ypos - 5, 60, 60);
  ellipse(xpos + 40, ypos - 25, 80, 80);
  rect(xpos, ypos + 5, 80, 20);

  ellipse(xpos + 490, ypos + 55, 50, 50);
  ellipse(xpos + 570, ypos + 50, 60, 60);
  ellipse(xpos + 530, ypos + 30, 80, 80);
  rect(xpos + 490, ypos + 60, 80, 20);

  xpos += 2;

  if (xpos > width + 80) {
    xpos = -600;
  }
}


function togglePlay() {
  if (city.isPlaying()) {
    city.pause();
  } else {
    city.loop();
  }
}