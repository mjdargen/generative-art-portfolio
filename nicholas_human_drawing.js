let drop = false;

function setup() {
    createCanvas(600, 400)
    background(65, 150, 150)
    frameRate(20)
    noCursor()
}

function draw() {
    if (mouseIsPressed) {
        let r = int(random(255));
        let g = int(random(255));
        let b = int(random(255));
        fill(r, g, b);
        ellipse(mouseX, mouseY, 20, 20);
        stroke(r, g, b);
        line(mouseX, mouseY, pmouseX, pmouseY + 50);
        stroke(r, g, b);
        line(mouseX, mouseY + 20, pmouseX - 20, pmouseY + 30);
        stroke(r, g, b);
        line(mouseX, mouseY + 20, pmouseX + 20, pmouseY + 30);
        stroke(r, g, b);
        line(mouseX, mouseY + 50, pmouseX - 10, pmouseY + 70);
        stroke(r, g, b);
        line(mouseX, mouseY + 50, pmouseX + 10, pmouseY + 70);
    }
    else {
        background(65, 150, 150);
        fill(0);
        ellipse(mouseX, mouseY, 20, 20);
        strokeWeight(5);
        stroke(0);
        line(mouseX, mouseY, pmouseX, pmouseY + 50);
        line(mouseX, mouseY + 20, pmouseX - 20, pmouseY + 30);
        line(mouseX, mouseY + 20, pmouseX + 20, pmouseY + 30);
        line(mouseX, mouseY + 40, pmouseX - 10, pmouseY + 70);
        line(mouseX, mouseY + 40, pmouseX + 10, pmouseY + 70);
        // textSize(18);
        // text('Press Space to Color', 230, 350);
    }
}