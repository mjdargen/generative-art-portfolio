let song;

function preload() {
  song = loadSound('assets/ExitMusic.mp3');
}

function setup() {
  createCanvas(800, 800);
  song.loop();
  background(255);
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  analyzer.setInput(song);
  colorMode(HSB);
}

function draw() {
  colorMode(HSB);
  fft.analyze();
  bassVal = (int)(fft.getEnergy(200, 300));
  lMidVal = (int)(fft.getEnergy("lowMid"));
  midVal = (int)(fft.getEnergy("mid"));
  hMidVal = (int)(fft.getEnergy("highMid"));
  trebVal = (int)(fft.getEnergy("treble"));
  let rms = analyzer.getLevel();
  background(202, rms * 300, rms * 300);

  noStroke();
  fill(213, 88.6, 62.0);
  ellipse(width / 2, height / 2, bassVal * 2, bassVal * 2);

  noStroke();
  fill(202, 59.4, 81.2);
  ellipse(width / 2, height / 2, lMidVal * 2, lMidVal * 2);

  noStroke();
  fill(197, 30.5, 74.5);
  ellipse(width / 2, height / 2, midVal * 2, midVal * 2);

  noStroke();
  fill(359, 86.5, 81.6);
  ellipse(width / 2, height / 2, hMidVal * 4, hMidVal * 4);

  noStroke();
  fill(194, 32.7, 87.5);
  ellipse(width / 2, height / 2, trebVal * 2, trebVal * 2);

  noStroke();
  colorMode(RGB);
  for (i = 0; i < 100; i++) {
    let particleheight = random((height) - 20, (height) + 50);
    var particleheightC = random((height / 2) - 20, (height / 2) + 50);
    fill(random(200, 240) + (particleheightC - (height / 2)), random(76, 86) + (particleheightC - (height / 2)), random(32, 42), (rms * 6) ** 6);
    ellipse(random((width / 2) + 400, (width / 2) - 400), particleheight, (particleheight - (height / 2)) / 2 + 30 + random(20), (particleheight - (height / 2)) / 2 + 30);
  }
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}