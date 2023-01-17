let song;
let img_arr = [];

function preload() {
  song = loadSound('assets/videoplayback.m4a');
  for (let i = 1; i < 21; i++) {
    let img;
    let name = "assets/" + str(i);
    name += '.jpg';
    img = loadImage(name);
    img_arr.push(img);
  }
}

function setup() {
  noStroke();
  createCanvas(1366, 768);
  background(20, 30, 20);
  //song.loop();
  frameRate(35);
  textSize(24);
  textAlign(LEFT, TOP);
  fft = new p5.FFT();
}

let count = 0;

function draw() {
  fft.analyze();
  //what(width/2, height/2, 2);
  //print(count);
  if (song.isPlaying()) {
    for (let i = 0; i < 20; i++) {
      if (count == int(beat_to_frame(i) * 1.5)) {
        background(20, 30, 20);
        img = img_arr[i];
        image(img, width / 2 - img.width / 2, height / 2 - img.height / 2);
      }
    }

    count += 1;
    fill(130, 50, 50);
    text("playing...", width - 200, height - 100);
  } else {
    fill(130, 50, 50);
    text("paused", width - 200, height - 100);
  }
  textAlign(LEFT, TOP);
  fill(20, 30, 20);
  rect(0, 0, 250, 100);
  fill(130, 50, 50);
  //text(str(count), 50, 50);

  //if (count > 575 && count < 830) {
  //  tint(20, 30, 20, 830-count);
  //  img = img_arr[19];
  //  image(img, width/2-img.width/2, height/2-img.height/2);
  //}
  //if (count == 830) {
  //  background(20, 30, 20);
  //}
  if (count > 833) {
    if (count > 2165) {
      background(40, 5, 5);
    } else {
      background(20, 30, 20);
    }
    let rms = fft.getEnergy("bass");
    what(width / 2, height / 2, rms * 10 / 255 - 5);
    let shift = 250;
    rms = fft.getEnergy("lowMid");
    what(width / 2 - shift, height / 2 - shift, rms * 6 / 255 - 3);
    rms = fft.getEnergy("mid");
    what(width / 2 + shift, height / 2 - shift, rms * 5 / 255 - 1.5);
    rms = fft.getEnergy("highMid");
    what(width / 2 - shift, height / 2 + shift, rms * 7 / 255 - 2);
    rms = fft.getEnergy("treble");
    what(width / 2 + shift, height / 2 + shift, rms * 6 / 255 - 1);

  }
}

function beat_to_frame(beat) {
  return (26) * beat;
}

function what(x, y, s) {
  push();
  translate(x, y);
  scale(s);

  fill(205, 170, 130);
  ellipse(0, 0, 80, 80);

  fill(235, 230, 235);
  ellipse(0, 0, 70, 70);

  fill(130, 50, 50);
  ellipse(0, 0, 60, 60);

  fill(105, 40, 40);
  ellipse(0, 0, 50, 50);

  fill(0, 0, 0);
  ellipse(0, 0, 40, 40);

  pop();
}

function mousePressed() {
  if (count == 0) {
    song.play();
    song.jump(97.9);
    return;
  }
  background(20, 30, 20);
  //fill(220, 220, 255);
  if (song.isPlaying()) {
    song.pause();
    //text("paused", width-200, height-200);
  } else {
    song.play();
    //text("playing...", width-200, height-200);
  }
}

function keyReleased() {
  //print("HERE")
  if (key == 's' || key == 'S') {
    save(`$ {
      timestamp()
    }
    _$ {
      frameCount
    }
    .png`);
  } else if (key == 'q' || key == 'w') {
    exit();
    return;
  }
}

// timestamp
function timestamp() {
  let now = new Date();
  return `$ {
    now.getFullYear()
  }
  $ {
    now.getMonth()
  }
  $ {
    now.getDate()
  }
  _$ {
    now.getHours()
  }
  $ {
    now.getMinutes()
  }
  $ {
    now.getSeconds()
  }
  `;
}


function togglePlay() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}