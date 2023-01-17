let hspacing, vspacing;
const lines = [];
let h, s, v;
let lastx, lasty;
let currx, curry;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100);
    h = int(random(360));
    s = int(random(30, 100));
    v = int(random(70));
    hspacing = 60;
    vspacing = 10;
    lastx = -1;
    lasty = -1;
    linesreset();
}

function linesreset() {
    for (let i = 0; i < vspacing; ++i) {
        lines.push(new Line(hspacing, height / (vspacing + 1) * (i + 1), h, s - 30, v + 30));//higher v, lower s
    }
}

function draw() {
    background(h, s, v);
    if (mouseIsPressed) {
        if (lastx > 0) {
            //drag
            currx = mouseX;
            curry = mouseY;
            for (let i = 0; i < lines.length; i++) {
                lines[i].update(lastx, lasty, currx - lastx, curry - lasty);
            }
            lastx = currx;
            lasty = curry;
        }
        else {
            //1st click
            lastx = mouseX;
            lasty = mouseY;
        }
        // System.out.println(currx);
    }
    else {
        lastx = -1;
        lasty = -1;
    }
    for (let i = 0; i < lines.length; i++) {
        lines[i].drawLine();
    }
    if (keyIsPressed) {
        if (key == 'r')
            linesreset();
    }
}


/*
have a line class which has a set of points
and then have a set of points
and if the mouse is clicked, start tracking with that x and y set
if the mouse drags down, then all the ys also drag down
if the mouse drags left, then compress etc. sorta thing
*/


class Line {
    points;
    h;
    s;
    v;

    constructor(numpoints, y, h, s, v) {
        this.h = h;
        this.s = s;
        this.v = v;
        this.points = [];
        for (let i = 0; i < numpoints; ++i) {
            this.points.push(new Point(round(width / (numpoints - 1) * i), y));
        }
    }

    drawLine() {
        push();
        stroke(this.h, this.s, this.v);
        noFill();
        for (let i = 0; i < this.points.length - 1; ++i) {
            line(this.points[i].gx(), this.points[i].gy(), this.points[i + 1].gx(), this.points[i + 1].gy());
        }
        pop();
    }

    update(mx, my, cx, cy) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].update(mx, my, cx, cy);
        }
        // println(points[0].gx());
    }
}





class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    gx() {
        return this.x;
    }
    gy() {
        return this.y;
    }

    update(mx, my, cx, cy) {
        //if it's really close, moves more, close to cx/cy. else, if far, moves less to none
        //1/x
        //1/(x+1)
        //dont update end xs
        let distance = sqrt(pow(mx - this.x, 2) + pow(my - this.y, 2));
        if (abs(this.x - mx) <= 3 && abs(this.y - my) <= 3) {
            this.x -= cx / 4;
            this.y -= cy / 4;
            // println("eeeeee");
        }
        if (this.x >= 5 && this.x <= width - 5)
            this.x += distance == 0 ? cx / 4 : (int)(cx / pow(distance, 0.5));
        this.y += distance == 0 ? cy / 4 : (int)(cy / pow(distance, 0.5));
    }
}
