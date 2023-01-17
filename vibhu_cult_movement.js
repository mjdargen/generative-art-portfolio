let b = 120;
let n = 5;

let gridCount = n + 1;
let actRandomSeed = 42;
let x = 600;
let y = 0;


function setup() {
    createCanvas(b * n, b * n);
    background(40, 5, 5);
    noStroke();
    frameRate(480);
}


function draw() {
    frameRate(30);  // reset
    translate(width / gridCount / 2, height / gridCount / 2);
    background(0, 0, 0);
    smooth();
    noFill();
    strokeWeight(y / 60);

    // resets to make it produce the same sequence of "random" values
    randomSeed(actRandomSeed);

    for (let gridY = 0; gridY < gridCount; gridY++) {
        for (let gridX = 0; gridX < gridCount; gridX++) {
            let posX = width / gridCount * gridX + random(-30, 30);
            let posY = height / gridCount * gridY + random(-30, 30);

            let shiftX = random(-x, x) / 20;
            let shiftY = random(-x, x) / 20;

            what(posX + shiftX, posY + shiftY, .5, (600 - x) / 600);
        }
    }
    x -= 5;
    y += 5;
    if (x < 0) {
        actRandomSeed = int(random(10000));
        x = 600;
        y = 0;
        frameRate(2);  // slow for a frame
    }
}


function what(x, y, s, y_ellipse) {
    push();
    translate(x - .5 * b, y - .5 * b);
    scale(s);
    fill(224, 142, 138);
    ellipse(b, b, 100, int(100 * y_ellipse));
    fill(152, 89, 97);
    ellipse(b, b, 90, 90 * y_ellipse);
    fill(98, 66, 74);
    ellipse(b, b, 80, 80 * y_ellipse);
    fill(169, 133, 172)
    ellipse(b, b, 70, 70 * y_ellipse);
    fill(195, 153, 192);
    ellipse(b, b, 60, 60 * y_ellipse);
    fill(40, 5, 5);
    ellipse(b, b, 40, 40);
    pop();
}