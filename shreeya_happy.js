function setup() {
  createCanvas(400, 400);
  frameRate(1);
}


function draw() {
  background(0);
  
  for (let i = 0; i < 100; i++){
    x = int(random(400));
    y = int(random(400));
    smile(x, y);
  }
  
}


function smile(x,y){
  push();
  translate(x, y);
  
  fill(random(255), random(255), random(255)); 
  noStroke();
  ellipse(20, 20, 30, 30);
  
  fill(0); 
  noStroke();
  ellipse(15, 15, 7, 7);
  
  fill(0); 
  noStroke();
  ellipse(25, 15, 7, 7);
  
  stroke(0); 
  strokeWeight(3);
  arc(20, 22, 10, 10, 0, PI, CHORD);
  
  pop();
  
  
}
