let t = 0;

class Shape {
  x;
  y;
  m;
  j;
  flag;
  blinking;
  c1;
  c2;
  c3;

  constructor(
    x,
    y,
    m,
    c1,
    c2,
    c3
  ) {
    this.x = x;
    this.y = y;
    this.m = m;
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
    this.j = m;
    this.flag = 2;
    this.blinking = false;
  }

  update() {
    let num = random(0.1, 15);
    if (num < 0.2) {
      this.blinking = true;
    } else if (this.flag == 0) {
      this.flag = 2;
    }
    if (this.blinking == true) {
      //int num = (int) random(1,5);
      //println(num);
      //int numb = (int) num*10;
      //println(numb);
      this.blink(2 + this.j / 100);
      //println(this.m);
      //if (this.m==401) {
      //  blinking = false;
      //}
    } else {//if (this.blinking == false) {
      //flag=2;
      //println("kaka");
      //fill(255);
      //ellipse(x+10,y,j,j);
    }
  }

  create() {
    fill(this.c1, this.c2, this.c3);
    ellipse(this.x, this.y, this.j, this.j);
    fill(255);
    ellipse(this.x, this.y, this.j, this.m - this.j / 2);
    ellipse(this.x, this.y, this.m - this.j / 2, this.m - this.j / 2);
    fill(255, 21, 21);
    ellipse(this.x, this.y, this.j - this.j * 0.005 - this.j / 2, this.m - this.j * 0.005 - this.j / 2);
  }

  blink(b) {
    //println(this.flag);
    fill(this.c1, this.c2, this.c3);
    ellipse(this.x, this.y, this.j, this.j);
    fill(255);
    ellipse(this.x, this.y, this.j, this.m - this.j / 2);
    ellipse(this.x, this.y, this.m - this.j / 2, this.m - this.j / 2);
    fill(255, 21, 21);
    ellipse(this.x, this.y, this.j - 1 - this.j / 2, this.m - 1 - this.j / 2);
    if (this.flag == 1) {
      this.m = this.m + b;
      if (this.m == this.j) {
        this.flag = 0;
        this.blinking = false;
      }
    } else if (this.m > this.j / 2 + b && this.flag == 2) {
      this.m = this.m - b;
      if (this.m <= this.j / 2 + b) {
        this.flag = 1;
      }
    }
  }
}

const shapes = [];

//Shape shape1 = new Shape(700/2,700/2,200);




function setup() {
  createCanvas(800, 800);
  background(0);
}

function draw() {
  background(0);
  //Shape shape = new Shape;
  t++;
  let r = int(random(10, 100));
  if (t % r == 0) {
    let w = int(random(50, 400));
    let r1 = int(random(w / 2, 800 - w / 2));
    let r2 = int(random(w / 2, 800 - w / 2));
    let c1 = int(random(255));
    let c2 = int(random(255));
    let c3 = int(random(255));
    shapes.push(new Shape(r1, r2, w, c1, c2, c3));
  }
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].create();
    shapes[i].update();
  }
}
