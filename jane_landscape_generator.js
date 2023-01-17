//landscape
//click the space bar the season will change
//click the mouse to create cloud; 
// if you click UP then you can draw one butterfly, 
// then the brush will change back to cloud

let bx, by;
let ang, re, gre, blu;
let update = false;
let cloud = true;
let count = 0;
let r;

const butterflies = [];

//color set
const sky = ["#DDF4FF", "#A4E1FF", "#72D0FF", "#39BDFF", "#00AAFF", "#2A90C3", "#2A4FC3", "#4A76FF", "#4A76FF", "#7395FF"];
const spring = ["#33FF46", "#13941F", "#5AAF62", "#0A6512", "#4B650A", "#A5CA4A", "#E8FFB0",
  "#BDFF1B", "#B7FF03", "#43BF18", "#DCFF78", "#FFFB07", "#A1D800", "#FF4307"];
const summer = ["#285400", "#3B7C01", "#008A22", "#00B62C", "#00BE51", "#45D180", "#00D88D"];
const fall = ["#8E6E17", "#DEA100", "#E87000", "#FDC400", "#FFD854", "#FF5726", "#FFDE09", "#FFF29E"];
const winter = ["#FFFFFF", "#D8D8D8", "#E8E8E8", "#E8E8E8", "#EAEFF0", "#EDFDFF", "#D6E7E8", "#FAFFFF"];

function setup() {
  createCanvas(600, 600);
  background(color("#F6FFFF"));

  frameRate(120);
}

function draw() {
  for (let i = 0; i < 16; i++) {
    drawHandler();
  }

  //cloud
  if (mouseIsPressed) {
    if (cloud) {
      let size = random(20, 50);
      fill(255);
      noStroke();
      ellipse(mouseX, mouseY, size, size);
      ellipse(mouseX + (size / 2), mouseY + (size / 4), random(10, 60), random(10, 40));
      ellipse(mouseX - (size / 2), mouseY + (size / 4), random(10, 60), random(10, 40));
    } else {
      bx = mouseX;
      by = mouseY;
      butterflies.push(createVector(bx, by));
      //for ...
      //  butterflies.get(i).x  
      butterfly(bx, by, ang, re, gre, blu);

    }
  }
}


function drawHandler() {
  //sky
  let sx = random(600);
  let sy = random(300);
  let sn = int(random(10));
  noStroke();
  fill(red(color(sky[sn])), green(color(sky[sn])), blue(color(sky[sn])), 50);
  ellipse(sx, sy, random(10), random(10));
  stroke(sky[sn]);
  strokeWeight(2);
  point(sx, sy);



  //plain
  let px = random(600);
  let py = random(600);
  let pn = int(random(14));
  let num = random(-0.3, 0.5);
  let trans = random(-10, 10);

  if (count == 0) {
    let tempC = color(spring[sn]);
    tempC.setAlpha(170);
    fill(tempC);
    //stroke(spring[pn]);
    r = 70;

  } else if (count == 1) {
    //sun
    noStroke();
    fill(255, random(70, 200), 58, 5);

    ellipse(450, 100, r, r);
    if (r < 130) {
      r += 0.01;
    }
    //color set
    // fill(summer[int(random(7))], 170);
    let tempC = color(summer[int(random(7))]);
    tempC.setAlpha(170);
    fill(tempC);

    //stroke (summer[int (random(7))]);
  } else if (count == 2) {
    // fill(fall[int(random(8))], 170);
    let tempC = color(fall[int(random(8))]);
    tempC.setAlpha(170);
    fill(tempC);
    //stroke (fall[int (random(8))]);
  } else {
    // fill(winter[int(random(8))], 210);
    let tempC = color(winter[int(random(8))]);
    tempC.setAlpha(210);
    fill(tempC);
    //stroke (winter[int (random(8))]);
    noStroke();
    ellipse(random(600), random(400), random(10), random(10));
  }



  noStroke();
  if (py >= num * (px + trans) + 400) {
    ellipse(px, py, random(20), random(20));
  } else if ((num > 0) && (py >= num * (px + trans) + 270)) {
    rectMode(CENTER);
    let angle = random(0.6);
    rotate(angle);
    rect(px, py, random(20), random(20));
    rotate(-angle);
  } else {
    if (count == 0) {
      stroke(spring[pn]);
    } else if (count == 1) {
      stroke(summer[int(random(7))]);

    } else if (count == 2) {
      stroke(fall[int(random(8))]);
    } else {
      stroke(winter[int(random(8))]);
    }
    strokeWeight(2);
    point(random(600), random(300, 600));


  }

}

function keyPressed() {
  if (key == ' ') {
    update = true;
    //rectMode(CENTER);
    //fill(255,70);
    //rect (width/2, height/2, 800,800);
    count++;
    count = count % 4;
  }

  if (key == 'c' || key == 'C') {
    if (cloud) {
      cloud = false;
    } else {
      cloud = true;
    }
  }

  if (keyCode == BACKSPACE) {
    background(255);
  }
}

function keyReleased() {
  update = false;
}
function butterfly(x, y, angle, rr, gg, bb) {
  push();
  translate(x, y);
  rotate(angle);
  //scale (random(0.5,2));
  noStroke();
  fill(rr, gg, bb);
  ellipse(12, -9, 25, 25);
  ellipse(-12, -9, 25, 25);
  ellipse(7, 7, 20, 20);
  ellipse(-7, 7, 20, 20);
  fill(rr / 2, gg, bb);
  rectMode(CENTER);
  rect(0, 0, 6, 30, 10);
  pop();
}

function mouseReleased() {
  ang = random(-1, 1);
  re = random(100, 255);
  gre = random(100, 255);
  blu = random(100, 255);
}
