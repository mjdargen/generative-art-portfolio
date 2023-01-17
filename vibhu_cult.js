let b = 120;
let n = 5;

function setup() {
    createCanvas(b * n, b * n);
    background(40, 5, 5);
    noStroke();
    frameRate(480);
}


function draw() {
    let f = 40;
    let start = 180;
    let finish = 1080;
    if (frameCount == start) what(.5 * b * n, .5 * b * n, 1);
    if (frameCount == finish) {
        fill(40, 5, 5);
        rect(0, 0, b * n, b * n);
        what(-1.5 * b, -1.5 * b, 5);
    }
    if (frameCount == finish + 180) {
        fill(0, 0, 0);
        rect(0, 0, b * n, b * n);
    }
    if (frameCount > start + 120 && frameCount < finish) {
        if (frameCount % f == 0) {
            let x = int(random(0, b * n + .5 * b));
            let y = int(random(0, b * n + .5 * b));
            let scalar = random(.5, 1);
            what(x, y, scalar);
            if (f > 5) f -= 6;
            else if (f > 2) f -= 2;
        }
    }
    if (frameCount > .5 * (start + finish) && frameCount < finish) {
        let x = int(random(0, b * n + .5 * b));
        let y = int(random(0, b * n + .5 * b));
        let scalar = random(.5, 1);
        what(x, y, scalar);
    }
    if (frameCount > .8 * (start + finish) && frameCount < finish) {
        let x = int(random(0, b * n + .5 * b));
        let y = int(random(0, b * n + .5 * b));
        let scalar = random(.5, 1);
        what(x, y, scalar);
    }
}


function what(x, y, s) {
    push();
    translate(x - b, y - b);
    scale(s);
    fill(224, 142, 138);
    ellipse(b, b, 100, 100);
    fill(152, 89, 97);
    ellipse(b, b, 90, 90);
    fill(98, 66, 74);
    ellipse(b, b, 80, 80);
    fill(169, 133, 172);
    ellipse(b, b, 70, 70);
    fill(195, 153, 192);
    ellipse(b, b, 60, 60);
    fill(0, 0, 0);
    ellipse(b, b, 40, 40);
    pop();
}