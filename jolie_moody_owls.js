let sounder;
let env;

let att = 0.05;
let sus = 1.5;//multiply by 1000 to get dur time i think
let rel = 0.5;
let amp = 0.4;//suslevel too

let midi = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//notes go here... idk how many we want
let note;

let trigger = 0;

let owl;

let mood;
let bh, bs, bv;
let h, s, v;

const owls = [];

//note stuff: processing base64


function setup() {
  mood = 0;
  let cnv = createCanvas(displayWidth, displayHeight);
  colorMode(HSB, 360, 100, 100, 100);
  owls.push(new Owl(width / 2, height / 2));
  owls[0].setMood(mood);
  bh = 2;
  bs = 0;
  bv = 100;
  h = 2;
  s = 0;
  v = 100;

  cnv.mousePressed(playSound);
  noLoop();
}

function playSound() {
  sounder = new p5.Oscillator('sine');
  env = new p5.Envelope(0.1, 0.7, 0.3, 0.1);
  sounder.start();
  sounder.freq(midiToFreq(0), amp);
  env.play(sounder, 0.1, 0.7, 0.3, 0.1);
  loop();
}

function draw() {
  adjustBg();
  background(h, s, v);
  processOwls();
  playMusic();
  console.log(mood);
  // console.log(trigger);
}
//if this.mood == 1, at some point call set eye shape after they reach their positions

function playMusic() {
  //i think adjust the midi in moodswitcher
  // console.log(trigger);
  if (mood == 0) {
    trigger = millis();
  } else {
    if (millis() > trigger) {
      note = int(random(10));
      sounder.freq(midiToFreq(midi[note]), amp);
      env.play(sounder, att, sus, amp, rel);
      trigger = millis() + int(sus * 1000);
    }
  }
}

function midiToFreq(note) {
  return (pow(2, ((note - 69) / 12.0))) * 440;
}

function adjustBg() {
  if (h != bh) {
    h += 1 * int((bh - h) / abs(bh - h));
  }
  if (s != bs)
    s += 1 * int((bs - s) / abs(bs - s));
  if (v != bv)
    v += 1 * int((bv - v) / abs(bv - v));
}

function processOwls() {
  // for (Owl o : owls) {
  for (let i = 0; i < owls.length; i++) {
    owls[i].updateMotion();
    owls[i].drawOwl();
  }
  for (let i = owls.length - 1; i > 0; --i) {
    if (owls[i].getAlpha() <= 0) {
      owls.splice(i, 1);
    }
  }
}

//fix this.mood = 0

function keyPressed() {
  if (key >= '0' && key <= '5') {
    mood = (key - '0') % 6;
    moodSwitcher();
    for (let i = 0; i < owls.length; i++) {
      owls[i].setMood(mood);
    }
    musicSwitcher();
    setBg();
  }
  if (key == ' ')
    setBg();
  if (key == 'm' || key == 'M')
    musicSwitcher();
}

function musicSwitcher() {//not putting under moodSwitcher to make code clearer
  let base;
  switch (mood) {//doesn't play if mood==0
    case 1:
      //slow, blendy, major
      att = 0.05;//??
      sus = 1.5;
      rel = 0.5;
      amp = 0.4;
      base = int(random(60, 72));
      //60 60+2 60+4 59+6 59+8 59+10 59+12 58+14 58+16 58+18
      for (let i = 0; i < midi.length; ++i) {
        if (i == 3 || i == 7)
          base--;
        midi[i] = base + i * 2;
      }
      break;
    case 2:
      //slow, blendy, minor
      att = 0.05;//??
      sus = 1.5;
      rel = 0.5;
      amp = 0.5;
      base = int(random(60, 72));
      //60 60+2 59+4 59+6 59+8 58+10 59+12 58+14 58+16 57+18
      for (let i = 0; i < midi.length; ++i) {
        if (i == 2 || i == 5 || i == 9 || i == 7)
          base--;
        if (i == 6)
          base++;
        midi[i] = base + i * 2;
      }
      break;
    case 3:
      //fast sharp minor
      att = 0.001;//??
      sus = 0.15;
      rel = 0.004;
      amp = 0.9;
      base = int(random(33, 45));//higher?
      //60 60+2 59+4 59+6 59+8 58+10 58+12 58+14 58+16 57+18
      for (let i = 0; i < midi.length; ++i) {
        if (i == 2 || i == 5 || i == 9 || i == 7)
          base--;
        if (i == 6)
          base++;
        midi[i] = base + i * 2;
      }
      break;
    case 4:
      //fast sharp random
      att = 0.001;//??
      sus = 0.25;
      rel = 0.004;
      amp = random(0.3, 0.9);
      for (let i = 0; i < midi.length; ++i) {
        midi[i] = int(random(48, 108));
      }
      break;
    case 5:
      //fast sharp minor
      att = 0.025;//??
      sus = 0.75;
      rel = 0.025;
      amp = 0.75;
      base = int(random(60, 72));//higher?
      //60 60+2 60+4 61+6 61+8 62+10 62+12 62+14 63+16 63+18
      for (let i = 0; i < midi.length; ++i) {
        if (i == 3 || i == 5 || i == 8)
          base++;
        midi[i] = base + i * 2;
      }
      break;
  }
}

function moodSwitcher() {
  let numowls;
  switch (mood) {
    case 1:
      //2 owls, so set all other owl alphas to 0 then remove
      for (let i = 2; i < owls.length; ++i)
        owls[i].fade();
      if (owls.length < 2)
        owls.push(new Owl(width, height / 2));
      owls[0].setTargetPos(width / 2 - 65, height / 2);//???
      owls[1].setTargetPos(width / 2 + 65, height / 2);//???
      break;
    case 0:
      break;
    case 2:
      break;
    case 3:
      //1 owl, remove all others
      for (let i = 1; i < owls.length; ++i) {
        owls[i].fade();
      }
      owls[0].setTargetPos(width / 2, height / 2);//don't think I need this
      break;
    case 4:
      //random number of owls
      numowls = int(random(10)) + 1;
      for (let i = numowls; i < owls.length; ++i) {
        owls[i].fade();
        owls[i].setTargetPos(owls[i].getX(), owls[i].getY());
      }
      while (owls.length < numowls)
        owls.push(new Owl(random(width - 100) + 50, random(height - 100) + 50));//may need to change to make sure not vibrating against wall
      break;
    case 5:
      //also random number
      numowls = int(random(15)) + 5;
      for (let i = numowls; i < owls.length; ++i) {
        owls[i].fade();
        owls[i].setTargetPos(owls[i].getX(), owls[i].getY());
      }
      while (owls.length < numowls)
        owls.push(new Owl(random(width), random(height)));//may need to change to make sure not vibrating against wall
      break;
  }
}


function setBg() {
  switch (mood) {
    case 0:
      bh = 2;
      bs = 0;
      bv = 100;
      break;
    case 1:
      bh = int(random(300, 360));
      bs = int(random(50));
      bv = int(random(90, 100));
      break;
    case 2:
      bh = int(random(200, 260));
      bs = int(random(75, 100));
      bv = int(random(25));
      break;
    case 3:
      bh = int(random(40));
      bs = int(random(90, 100));
      bv = int(random(50));
      break;
    case 4:
      h = 0;
      s = 0;
      v = 100;
      bh = 0;
      bs = 100;
      bv = 0;
      break;
    case 5:
      bh = 187;
      bs = 93;
      bv = 100;
      break;
  }
}


/*
this.mood reflector almost
 1. love, 2. alone, 3. anger, 4. stressed, 5. happy
 moods:
 in love<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< (2)
 - major, slow? med?
 - smile eyes
 - pinkish light reddish
 isolated/alone<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< (1)
 - minor, slow
 - tired eyes
 - probably grays or blueish
 angry/frustrated/brooding<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< (1)
 - minor, slow, low
 - alternate between normal and tired
 - minor fast harsh
 - angry eyes
 stressed/crazy/overwhelmed/all over the place<<<<<<<<<<<<<<<<<<<<<<<<<<< (1)
 - minor major mix fast uneven
 - normal eyes?
 - no key, just all over the place
 - normal eyes?
 happy<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< (many)
 - major, steady fast-ish
 - smile eyes
 
 
 music: major notes scale random, minor notes scale random, irregularity of notes, loudness, etc.
 
 owls reflecting stuff, colors also reflecting this.mood stuff etc.
 
 eyes can look in different directions probably
 
 */


class Owl { //<>//
  x;
  y;
  tx;
  ty;
  vx;
  vy;
  size;
  tsize;
  hue;
  sat;
  val;//current values
  alpha;
  thue;
  tsat;
  tval;//target values
  talpha;
  baseline;//for bouncing
  eyeType;
  eyex;
  eyey;//center
  mood;//1. love, 2. alone, 3. anger, 4. stressed, 5. happy
  angle;
  startSize = true;
  alphaMod = 1;
  speedMod = 20;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tx = this.x;
    this.ty = this.y;
    this.size = 100;
    this.tsize = this.size;
    this.hue = int(random(360));
    this.sat = int(random(50, 100));
    this.val = int(random(50, 100));
    this.alpha = 200;
    this.eyex = 0;
    this.eyey = 0;
    this.angle = 0;
  }

  //get 0 this.mood ready

  setMood(mood) {
    this.speedMod = 20;
    if (this.alphaMod == 1) {
      this.mood = mood;
      this.talpha = 200;
      switch (this.mood) {
        case 0:
          this.thue = this.hue;
          this.tsat = this.sat;
          this.tval = this.val;
          this.tsize = 100;
          this.eyeType = 0;
          break;
        case 1:
          //set tcolor: reddish pinkish, will change every once in a while
          this.thue = int(random(300, 360));
          this.tsat = int(random(100));
          this.tval = int(random(90, 100));
          //set the this.tx and this.ty... somewhere and vx and vy
          this.tsize = 200;//or something
          //set eyetype later
          this.eyeType = 0;
          this.speedMod = 2;
          break;
        case 2:
          //set tcolor: bluish, blackish, grayish... cool if change the alpha at the end too
          this.thue = int(random(200, 260));
          this.tsat = int(random(100));
          this.tval = int(random(50));
          // println(this.thue+" "+this.tsat+" "+this.tval);
          //change alpha somewhere
          // this.tx = width / 2;
          // this.ty = width / 2;
          this.vx = (this.tx - this.x) / 30;
          this.vy = (this.ty - this.y) / 30;
          this.eyeType = 2;
          this.tsize = 25;
          this.talpha = 0;
          this.speedMod = 2;
          break;
        case 3:
          //set tcolor: reddish, pulsing, blackish but not brown. dark greys
          this.thue = int(random(40));
          this.tsat = int(random(75, 100));
          this.tval = int(random(80));
          //this.x and this.y will be oscilating around very quickly somehow
          this.eyeType = 3;
          this.tsize = 300; //slowly growing
          break;
        case 4:
          //color randomly changes every once in a while
          this.vx = random(150, 400) * (random(2) > 1 ? -1 : 1);
          // println(this.vx);
          this.vy = random(150, 400) * (random(2) > 1 ? -1 : 1);
          //bounce around randomly
          this.eyeType = 0;
          this.tsize = 100;
          break;
        case 5:
          //random bright color
          this.thue = int(random(360));
          this.tsat = 100;
          this.tval = 100;
          this.vy = random(15, 30);
          this.tx = this.x;
          this.eyeType = 1;
          this.tsize = random(100, 300);
          this.baseline = this.y + random(min(height - this.y - this.tsize / 2, 200));
          if (this.y > this.baseline)
            this.vy = -this.vy;
          break;
      }
    }
  }

  updateColors() {
    if (this.mood != 4 && this.mood != 1) {
      if (this.hue != this.thue) {
        this.hue += abs((this.thue - this.hue) / 2) > 1 ? (this.thue - this.hue) / 2 : 1 * int((this.thue - this.hue) / abs(this.thue - this.hue));
        // println(this.hue);
      }
      if (abs(this.hue - this.thue) < 1)
        this.hue = this.thue;
      if (this.sat != this.tsat)
        this.sat += abs((this.tsat - this.sat) / 2) > 1 ? (this.tsat - this.sat) / 2 : 1 * int((this.tsat - this.sat) / abs(this.tsat - this.sat));
      if (abs(this.sat - this.tsat) < 1)
        this.sat = this.tsat;
      if (this.val != this.tval)
        this.val += abs((this.tval - this.val) / 2) > 1 ? (this.tval - this.val) / 2 : 1 * int((this.tval - this.val) / abs(this.tval - this.val));
      if (abs(this.val - this.tval) < 1)
        this.val = this.tval;
    }
    if (this.alpha != this.talpha) {
      if (this.mood != 2 || this.mood == 2 && this.size < 100)
        this.alpha += this.alphaMod * (abs(this.talpha - this.alpha) / (this.talpha - this.alpha));
    }
    if (this.mood == 1) {
      if (this.hue != this.thue) {
        this.hue += 0.5 * int((this.thue - this.hue) / abs(this.thue - this.hue));
      }
      if (this.sat != this.tsat) {
        this.sat += 0.5 * int((this.tsat - this.sat) / abs(this.tsat - this.sat));
      }
      if (this.val != this.tval) {
        this.val += 0.5 * int((this.tval - this.val) / abs(this.tval - this.val));
      }
    }
    switch (this.mood) {
      case 1:
        // println((this.thue == this.hue)+" "+(this.tsat == this.sat)+" "+(this.tval == this.val));
        if (this.thue == this.hue && this.tsat == this.sat && this.tval == this.val) {
          this.thue = int(random(300, 360));
          this.tsat = int(random(100));
          this.tval = int(random(90, 100));
          // println("weeeeeeeeeee");
        }
        //set tcolor: reddish pinkish, will change every once in a while
        break;
      case 3:
        //set tcolor: reddish, pulsing, blackish but not brown. dark greys
        if (random(100) < 20) {
          this.thue = int(random(40));
          this.tsat = int(random(75, 100));
          this.tval = int(random(80));
        }
        break;
      case 4:
        if (random(100) < 40) {
          this.hue = int(random(360));
          this.sat = int(random(100));
          this.val = int(random(100));
        }
        break;
    }
  }

  updateSize() {
    let mod = this.mood == 2 ? 0.5 : 1.5;
    if (this.size != this.tsize)
      this.size += mod * (abs(this.tsize - this.size) / (this.tsize - this.size));
    if (abs(this.size - this.tsize) < 1)
      this.size = this.tsize;
    if (this.mood == 3 && this.size == this.tsize) {
      this.tsize += int(random(25, 30)) * (random(2) > 1 ? 1 : -1);
      if (this.tsize < 100)
        this.tsize += 100;
      if (this.tsize > 600)
        this.tsize -= 100;
    }
  }

  //update motion
  fade() {
    this.alphaMod = 10;
    this.talpha = 0;
    this.mood = 0;
  }

  setAlpha(alpha) {
    this.talpha = this.alpha;
  }

  getAlpha() {
    return this.alpha;
  }

  drawOwl() {
    if (this.startSize)
      this.updateSize();
    this.updateColors();

    push();
    translate(this.x, this.y);
    rotate(this.angle);//fix later<<<<<<<<<<<<<<<<<<
    scale(this.size / 100.0);
    stroke(this.hue, this.sat, this.val, this.alpha);
    fill(this.hue, this.sat, this.val, this.alpha);
    strokeWeight(70);
    line(0, 15, 0, -15); // Body
    //adding to body
    strokeWeight(1);
    bezier(-34, 15, -35, 40, -25, 50, 0, 50);//adjust d, e
    bezier(34, 15, 35, 40, 25, 50, 0, 50);//adjust d, e
    //then add feet!
    stroke(50, 92, 97, this.alpha);
    strokeWeight(2);
    line(-14, 47, -14, 53);
    line(-11, 47, -11, 53);
    line(-17, 47, -17, 53);
    line(14, 47, 14, 53);
    line(11, 47, 11, 53);
    line(17, 47, 17, 53);

    noStroke();
    fill(0, 0, 100, this.alpha);
    ellipse(-17.5, -15, 35, 35); // Left eye dome
    ellipse(17.5, -15, 35, 35); // Right eye dome
    arc(0, -15, 70, 70, 0, PI); // Chin
    fill(0, 100, 0, this.alpha);
    quad(0, -8, 4, -1, 0, 6, -4, -1); // Beak
    switch (this.eyeType) {
      case 0://normal
        ellipse(this.eyex - 14, this.eyey - 15, 9, 12); // Left eye
        ellipse(this.eyex + 14, this.eyey - 15, 9, 12); // Right eye
        break;
      case 1://smiling
        stroke(0, 10, 0, this.alpha);
        noFill();
        arc(this.eyex - 18, this.eyey - 13, 12, 10, PI, 2 * PI);
        arc(this.eyex + 18, this.eyey - 13, 12, 10, PI, 2 * PI);
        break;
      case 2://down/tired etc.
        stroke(0, 10, 0, this.alpha);
        noFill();
        arc(this.eyex - 14, this.eyey - 15, 16, 10, 0, PI);
        arc(this.eyex + 14, this.eyey - 15, 16, 10, 0, PI);
        break;
      case 3://mad eyes
        noStroke();
        arc(this.eyex - 14, this.eyey - 15, 9, 12, PI / 6, 5 * PI / 4);
        arc(this.eyex + 14, this.eyey - 15, 9, 12, -PI / 4, 5 * PI / 6);
        break;
    }
    pop();
  }

  setTargetPos(x, y) {
    this.tx = this.x;
    this.ty = this.y;
  }

  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }

  updateMotion() {
    //1
    //either move to left or right
    //then just sit there and vibe
    //2
    //move to middle and that's it
    //3
    //vibrate in middle
    // println(this.speedMod);
    if (this.mood != 4) {
      if (this.angle != 0)
        this.angle -= PI / 48;
      if (this.angle < PI / 48)
        this.angle = 0;
    }
    if (this.mood == 2) {
      // println(this.x+";"+this.tx+";"+this.y+";"+this.ty);
      if (this.x == this.tx && this.y == this.ty) {
        this.startSize = true;
      } else {
        this.startSize = false;
      }
    } else {
      this.startSize = true;
    }
    if (this.mood != 5 && this.mood != 4) {
      if (this.x != this.tx) {//also it still moves too quickly
        this.x += this.speedMod * int((this.tx - this.x) / abs(this.tx - this.x));
      }
      if (abs(this.x - this.tx) < this.speedMod)
        this.x = this.tx;
      if (this.y != this.ty) {
        this.y += this.speedMod * int((this.ty - this.y) / abs(this.ty - this.y));
      }
      if (abs(this.y - this.ty) < this.speedMod)
        this.y = this.ty;
    }//create a switch of some sort for when to start this.alpha this.size changes etc.<<<<<<<<<<<

    switch (this.mood) {
      case 1:
        if (this.tx == this.x && this.ty == this.y) {
          this.eyeType = 1;
        }
        break;
      case 3://make less angry
        if (this.x == this.tx)
          this.x += random(-5, 5);
        if (this.y == this.ty)
          this.y += random(-5, 5);
        break;
      case 4:
        //rotate and bounce somehow uhhh treat owl like a ball?
        this.angle += random(PI / 6);//adjust...
        this.angle %= 2 * PI;
        if (min(this.x, width - this.x) < this.size / 2) {//fix<<<<<<<<<<<<<<<<<<
          this.vx = -this.vx;
        }
        this.x += this.vx * 0.1;
        if (min(this.y, height - this.y) < this.size / 2) {
          this.vy = -this.vy;
        }
        this.y += this.vy * 0.1;
        break;
      case 5:
        // println("this.y"+this.y);
        this.y += this.vy * 0.1;
        if (this.y >= this.baseline) {
          // println("woop");
          this.vy = -1 * abs(this.vy);
        } else
          this.vy += 9.8 * 0.1;
        break;
    }
  }
}
