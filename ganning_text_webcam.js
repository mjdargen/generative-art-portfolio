let cam;
let symbols = "@#8&OLI)i=+;:,. ";
let paused = true;

function setup() {
  createCanvas(800, 800);
  background(0);
  cam = createCapture(VIDEO);
  cam.size(width, height);
  cam.hide();

  let txt = "Paused: " + paused;
  textSize(40);
  text(txt, width / 2 - textWidth(txt) / 2, height - 40);
  let size = width;
  textFont("Courier New");
  textSize(size);
  textAlign(LEFT, TOP);
  fill(255);
  smooth();


  noLoop();
}

function draw() {
  background(0);
  let txt = "Paused: " + paused;

  textSize(40);
  text(txt, width / 2 - textWidth(txt) / 2, height - 40);


  cam.loadPixels();
  let size = width / cam.width;
  textFont("Courier New");
  textSize(size);
  textAlign(LEFT, TOP);
  fill(255);
  smooth();


  for (let y = 0; y < cam.height; y++) {
    let line = "";
    for (let x = 0; x < cam.width; x++) {

      // Calculate the 1D pixel location
      let loc = (x + y * cam.width) * 4;

      // Get the R,G,B values from image
      let r, g, b;
      r = cam.pixels[loc];
      g = cam.pixels[loc + 1];
      b = cam.pixels[loc + 2];

      // get average and index
      let avg = int((r + g + b) / 3);
      let index = int(map(avg, 0, 255, 0, symbols.length - 1));
      line += symbols[index];
    }
    text(line, 0, y * size);

  }

}

function mouseReleased() {
  if (paused == false) {
    paused = true;
    noLoop();
  } else {
    paused = false;
    loop();
  }
}
