function setup() {
    createCanvas(1600, 1200);
    background(0);
    colorMode(HSB, 100);
    rectMode(CENTER);

}
function draw() {
    noStroke();
    background(0);
    fill(0);
    frameRate(30);
    strokeWeight(4);
    for (let yCord = 0; yCord <= 1200; yCord += 5) {
        stroke(60, rand(30, 90), rand(40, 75))
        line(0, yCord, 800, 600);
    }
    for (let yCord = 0; yCord <= 1200; yCord += 5) {
        line(1600, yCord, 800, 600);
        stroke(60, rand(30, 90), rand(40, 75))
    }
    for (let xCord = 0; xCord <= 1600; xCord += 5) {
        line(xCord, 0, 800, 600);
        stroke(60, rand(30, 90), rand(40, 75))
    }
    for (let xCord = 0; xCord <= 1600; xCord += 5) {
        line(xCord, 1200, 800, 600);
        stroke(60, rand(30, 90), rand(40, 75))
    }
    noStroke();
    fill(0);
    ellipse(800, 600, 100, 100)
}

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

document.addEventListener('click', function (e) {
    console.log(Math.floor(e.x - boundingRect.x), Math.floor(e.y - boundingRect.y));
});