let co2stats;
let i, seed, waiter;
let targetA, alpha;
let count;
// ArrayList < Cloud > clouds = new ArrayList <> ();
const clouds = [];
let pause = false;


function preload() {
    co2stats = loadTable('assets/co2levels.csv', 'csv');
}

function setup() {
    createCanvas(800, 800);

    i = 0;

    seed = second();

    textFont("Comic Sans MS");
    textSize(128);
    textAlign(CENTER, CENTER);

    targetA = 0;
    alpha = 0;
    waiter = 0;
    count = 4;
}

/*
get rid of circle overlap
*/

//Year,Total,Gas Fuel,Liquid Fuel,Solid Fuel,Cement,Gas Flaring,Per Capita

function draw() {
    if (keyIsPressed) {
        if (key == 'p')
            pause = true;
        if (key == 'g')
            pause = false;
    }
    if (!pause) {
        background(69, 183, 255);

        let year = co2stats.getNum(i, 0);
        let totals = co2stats.getNum(i, 1) - 3;

        stroke(255);
        fill(255);
        text(year, width / 2, height / 2);
        // println(year+" "+totals);

        targetA = sqrt(totals / 8247.6) * 255;
        while (clouds.length < (int)(totals / 18.328)) {
            clouds.push(new Cloud());
        }
        for (let i = clouds.length - 1; i >= int((totals / 18.328)); --i) {
            clouds[i].setInc(0, count);
        }

        // while(clouds.size() > (int)(totals/18.328)){
        //     clouds.remove(clouds.size()-1);
        // }

        if (waiter == 0) {
            for (let i = 0; i < int((totals / 18.328)); ++i) {
                clouds[i].setInc(targetA, count);
            }
        }

        for (let i = 0; i < clouds.length; i++) {
            clouds[i].drawCloud();
        }

        waiter++;
        if (waiter == count) {
            i++;
            waiter = 0;
            while (clouds.length > (int)(totals / 18.328)) {
                clouds.splice(clouds.length - 1, 1);
            }
        }

        if (i >= co2stats.getRowCount()) {
            i = 0;
            seed = second();
        }
    }
}
//3-9167
//0-9164



class Cloud {
    x;
    y;
    s;
    alpha;
    inc;
    rx;
    ry;
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.s = random(0.5, 1);
        this.rx = random(30, 80);
        this.ry = random(100);
        this.alpha = 0;
    }

    setInc(targetAlpha, count) {
        this.inc = (targetAlpha - this.alpha) / count;
    }

    drawCloud() {
        push();
        this.alpha += this.inc;
        fill(48, 48, 48, this.alpha);
        noStroke();
        translate(this.x, this.y);
        scale(this.s);
        ellipse(0, 0, 200, 130);
        ellipse(-100, 25, 125, 75);
        ellipse(100, 25, 125, 75);
        ellipse(this.rx, this.ry, 50, 70);
        pop();
    }
}
