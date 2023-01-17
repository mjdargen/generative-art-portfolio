let img_1;

let img_2;

let img_3;

let sound;

let sizes = 7

let startX = 200;
let startY = 200;

function preload() {
  img_1 = loadImage("assets/back.jpg");
  img_2 = loadImage("assets/dance.jpg");
  img_3 = loadImage("assets/download.png");
  sound = loadSound("assets/sound.mp3");
}

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.mouseClicked(togglePlay);
  img_2.loadPixels();
  img_2.updatePixels();

  img_3.loadPixels();
  img_3.updatePixels();


  frameRate(5);

}

function draw() {
  clear();


  let sizes = floor(map(mouseX, 0, width, 7, 40));

  for (var startY = 0; startY < img_2.height; startY++) {
    for (var startX = 0; startX < img_2.width; startX++) {
      const index = (startX + startY * img_2.width) * 4;
      let r = img_2.pixels[index];
      let g = img_2.pixels[index + 1];
      let b = img_2.pixels[index + 2];

      let pixel_color = ((0.3 * r) + (0.59 * g) + (0.11 * b));

      fill(pixel_color);
      rect(startX, startY, sizes, sizes);

      startX = startX + sizes - 1;
    }
    startY = startY + sizes - 1;
  }
}


function keyPressed() {
  if (key == "w") {
    clear();
    background(0);
    image(img_3, 200, 200);

  }
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}