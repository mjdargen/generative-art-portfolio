class Circle {
    c;
    x;
    y;
    radius;
    constructor(c, x, y, radius) {
        this.c = c
        this.x = x
        this.y = y
        this.radius = radius
    }

    display() {
        fill(this.c)
        circle(this.x, this.y, this.radius)
    }
}

let circle_list = [];
let c = 0;
let alp = 100;
let rad = 20;
let for_incr = 25;

function setup() {
    createCanvas(800, 800);
    background(0);
    noStroke();
}

function mousePressed() {

    let mX = mouseX;
    let mY = mouseY;

    if (mX <= 400 && mY <= 400) {
        let c = color(255, 0, 0);
        showCircles(c);
    }

    else if (mX >= 400 && mY <= 400) {
        let c = color(0, 255, 0);
        showCircles(c);
    }

    else if (mX >= 400 && mY >= 400) {
        let c = color(255, 255, 0);
        showCircles(c);
    }

    else if (mX <= 400 && mY >= 400) {
        let c = color(0, 0, 255);
        showCircles(c);
    }
}

function showCircles(c) {
    circle_list = [];
    background(0);

    for (y = 10; y < height; y += for_incr) {
        for (x = 10; x < width; x += for_incr) {
            newCircle = new Circle(c, x, y, rad);
            circle_list.push(newCircle);
        }
    }

    for (let i = 0; i < circle_list.length; i++) {
        circle_list[i].display();
    }
}

function keyPressed() {

    if (keyCode == UP_ARROW) {
        alp += 20;
        showCircles(color(c, c, c, alp));
    }

    else if (keyCode == DOWN_ARROW) {
        alp -= 20;
        showCircles(color(c, c, c, alp));
    }

    else if (keyCode == RIGHT_ARROW) {
        rad += 10;
        for_incr += 10;
        showCircles(c)
    }

    else if (keyCode == LEFT_ARROW) {
        rad -= 10
        for_incr -= 10
        showCircles(c);
    }
}

