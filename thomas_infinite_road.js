function preload() {
    img = loadImage('assets/road-horizon-path-travel.png');
}
function setup() {
    createCanvas(1000, 1000);
    background(255);
    boundingRect = document.getElementById('defaultCanvas0').getBoundingClientRect();
    new newImage;

}
var imageList = []
class newImage {
    constructor() {
        this.start = frameCount;
        this.image = imageList.length;
        imageList.push(this);
        this.Scale = 1;
        this.width = 500;
        this.dad = false;
    }
    draw() {
        image(img, 0, 0, this.width, this.width);
        this.width += this.width / 100;
        if (this.width > 1000 && !this.dad) {
            new newImage;
            this.dad = true;
        }
        if (this.width > 2000) {
            this.draw = function () { };
        }
    }
}
function draw() {
    imageMode(CENTER);
    translate(500, 500);
    imageList.forEach(function (e) {
        e.draw();
    });
}
document.addEventListener('click', function (e) {
    console.log(Math.floor(e.x - boundingRect.x), Math.floor(e.y - boundingRect.y));
});