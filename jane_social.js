let colorfb = ["#4267B2", "#2C59B5", "#0042C8", "#0017BC", "#2031AA"];
let colorig = ["#C13584", "#FD1D1D", "#C13584", "#833AB4", "#F56040"];
let colorsc = ["#FFFC00", "#FFFF02", "#FFEC02", "#FFF360", "#FFFABE"];
let colortw = ["#1DA1F2", "#009EFF", "#8FD4FF", "#AFCFE3", "#D2EEFF"];
let colorNone = ["#C4C4C4", "#B5B5B5 ", "#A1A1A1", "#696969", "#AEAEAE"];
let table;

function preload() {
  table = loadTable('assets/data.csv', 'csv', 'header');
}


function setup() {
  createCanvas(800, 800);
  background(255);

  table.getRows().forEach((row) => {
    let answer = row.getString("Answer");
    let number = row.getNum("Count");
    pattern(answer, number);
  });

}


function pattern(type, num) {
  let rand = int(random(4));
  let ymax;
  let ymin;
  let choco;
  if (type == "Facebook") {
    //based on the type find the region
    ymax = int(height / 5) - 50;
    ymin = 0;
    //color chose
    choco = colorfb[rand];
  } else if (type == "Snapchat") {
    //based on the type find the region
    ymax = int(height * 2 / 5) - 50;
    ymin = int(height * 1 / 5) - 50;
    //color chose
    choco = colorsc[rand];

  } else if (type == "Instagram") {
    //based on the type find the region
    ymax = int(height * 3 / 5) - 50;
    ymin = int(height * 2 / 5) - 50;
    //color chose
    choco = colorig[rand];
  } else if (type == "Twitter") {
    //based on the type find the region
    ymax = int(height * 4 / 5) - 50;
    ymin = int(height * 3 / 5) - 50;
    //color chose
    choco = colortw[rand];
  } else {
    //based on the type find the region
    ymax = height - 50;
    ymin = int(height * 4 / 5) - 50;
    //color chose
    choco = colorNone[rand];
  }
  let angle = random(-1.5, 1.5);
  rotate(angle);

  if (num == 0) {
    noFill();
    ellipse(random(20, width - 20), random(ymax, ymin), 10, 10);
  } else {
    fill(choco);
    stroke(choco);
    strokeWeight(2);
    rectMode(CENTER);
    rect(random(20, width - 20), random(ymax, ymin), int(num / 100) * 4, num % 100, random(5));


    num = num % 100;
    fill(red(color(choco)), green(color(choco)), blue(color(choco)), int(random(100, 180)));
    ellipse(random(20, width - 20), random(ymax, ymin), int(num / 10) * 2, int(num / 10) * 2);
    num = num % 10;
    fill(choco);
    ellipse(random(20, width - 20), random(ymax, ymin), num, num);
  }
  rotate(-angle);
}

