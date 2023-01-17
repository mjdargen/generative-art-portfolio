//%, index = # of $5,000
var income = [3.5, 4.25, 6, 6.2, 5.9, 5.75, 5.2, 5, 4.75, 4.1, 4.25, 3.5, 3.7, 3, 3.15, 2.6, 2.6, 2.25, 2.1, 1.75, 2.1, 1.5, 1.5, 1.25, 1.25, 1, 1, .9, .8, .6, .8, .5, .5, .4, .4, .2, .25, .2, .18, .18, .18, .18, .18, .18, .18, .18, .18, .18, 2];
//[x * .01% of population, income]
var income2 = [];
income.forEach(function (e, I) {
    income2.push([e * 100, (I + 1) * 5]);
});
income2.push([150, 245])
function peopleInPercent(start, stop) {
    var topCnt = 0;
    var top = 0;
    income2.forEach(function (e) {
        for (var i = 0; i < e[0]; i++) {
            if (topCnt < stop && topCnt > start) {
                top += e[1];
            }
            topCnt++;
        }
    });
    return top;
}
var pA, pB, pC, rA, rB, rC;
var smallCircles = [];
var rings = [3000, 600, 1000, 1400];
class Circle {
    constructor(which5, ring, dt) {
        this.dr = rings[ring];
        this.dt = dt;
        this.dx = this.dr * Math.cos(dt);
        this.dy = this.dr * Math.sin(dt);
        this.r = peopleInPercent(10000 - (500 * which5), 10000 - (500 * which5 - 500)) / 300;
        smallCircles.push(this);
    }
    draw() {
        circle(this.dx, this.dy, this.r);
    }
}
function setup() {
    createCanvas(3300, 2900);
    background(255);
    angleMode(DEGREES);
    boundingRect = document.getElementById('defaultCanvas0').getBoundingClientRect();
    //draw graph
    fill(0);
    stroke(150);
    strokeWeight(1);
    var x = 0;
    income2.forEach(function (e) {
        for (var i = 0; i < e[0]; i++) {
            x += width / 10000;
            line(x, height, x, height - e[1]);
        }
    });

    //draw center formation
    rC = peopleInPercent(8500, 9000) / 300;
    rB = peopleInPercent(9000, 9500) / 300;
    rA = peopleInPercent(9500, 10000) / 300;
    var sA = (rA + rB) / 2;
    var sB = (rB + rC) / 2;
    var sC = (rC + rA) / 2;
    var aA = Math.acos(((sC * sC) + (sB * sB) - (sA * sA)) / (2 * sC * sB));
    var aB = Math.acos(((sA * sA) + (sC * sC) - (sB * sB)) / (2 * sA * sC));
    var aC = Math.acos(((sB * sB) + (sA * sA) - (sC * sC)) / (2 * sA * sB));
    pA = { x: 0, y: 0 };
    pB = { x: sA * Math.cos(aA + aB), y: sA * Math.sin(aA + aB) };
    pC = { x: pB.x + sB * Math.cos(2 * (aB + aA + aC)), y: pB.y + sB * Math.sin(aB + aA + aC) }
    var c = { x: (pA.x + pB.x + pC.x) / 3, y: (pA.y + pB.y + pC.y) / 3 }
    pA.x += 1 - c.x; pA.y += 1 - c.y;
    pB.x += 1 - c.x; pB.y += 1 - c.y;
    pC.x += 1 - c.x; pC.y += 1 - c.y;
    circle(pA.x, pA.y, rA);
    circle(pB.x, pB.y, rB);
    circle(pC.x, pC.y, rC);

    //draw outer circles
    noFill();
    strokeWeight(10);
    stroke(0);

    for (var i = 4; i < 12; i++) {
        new Circle(i, 1, (i - 4) * TWO_PI / 8);
    }
    for (var i = 7; i < 12; i++) {
        new Circle(i, 2, (i - 7) * TWO_PI / 5);
    }
    for (var i = 15; i < 18; i++) {
        new Circle(i, 3, (i - 15) * TWO_PI / 3);
    }

}
var R = 0;
function draw() {
    background(255);
    translate(width / 2, height / 2);
    rotate(R);

    fill(0);
    stroke(0);
    strokeWeight(0);
    circle(pA.x, pA.y, rA);
    circle(pB.x, pB.y, rB);
    circle(pC.x, pC.y, rC);
    rotate(1 - R);
    rotate(R / -5);

    noFill();
    strokeWeight(10);
    stroke(0);
    rings.forEach(function (e) {
        circle(0, 0, 2 * e);
    })
    fill(0);
    var bench = 0;
    smallCircles.forEach(function (e, I) {
        if (I > 7 && bench == 0) {
            rotate(-R / 5);
            bench++;
        }
        if (I > 12 && bench == 1) {
            rotate(-R / 5);
            bench++;
        }
        e.draw();
    });
    R++;
}
document.addEventListener('click', function (e) {
    console.log(Math.floor(e.x - boundingRect.x), Math.floor(e.y - boundingRect.y));
});