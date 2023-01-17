function setup(){
    createCanvas(400,600);
    boundingRect = document.getElementById('defaultCanvas0').getBoundingClientRect();
    background(0);
    strokeWeight(0);
    frameRate(120);
    angleMode(DEGREES);
    new firework;
}
var fireworks = [];
class firework{
    constructor(){
        this.xf = r(70,width-70);
        this.yf = r(100,height-200);
        this.dxi = this.xf+r(-50,50);
        this.c = r(0,18);
        this.size = r(30,80);
        this.ti = frameCount;
        this.age = 0;
        this.trailTime = r(100,200);
        this.trailPX = this.dxi;
        this.trailPY = height;
        this.trailAX = (this.dxi-this.xf)/1600;
        this.trailVY = (height-this.yf)/this.trailTime; 
        this.trailPP = 0;
        this.listI = fireworks.length;
        fireworks.push(this);
    }
    draw(){
        this.age = frameCount - this.ti;
        if(this.age < this.trailTime){
            this.trail();
        }else if(this.age < this.trailTime+100){
            this.pattern();
        }
    }
    pattern(){
        if(this.lines == undefined){
            this.lines = r(7,16);
        }
        for(var i=0;i<this.lines;i++){
            push();
            translate(this.xf,this.yf);
            rotate(i*360/this.lines);
            strokeWeight(1);
            stroke(this.c,100,100);
            line(0,0,this.size,0);
            pop();
        }
        for(var i=0;i<2*this.lines;i++){
            push();
            translate(this.xf,this.yf);
            rotate(i/2*360/this.lines);
            strokeWeight(1);
            stroke(this.c,100,100);
            line(0,0,this.size/1.5,0);
            pop();
        }
    }
    trail(){
        this.trailPP = 100*(height-this.trailPY)/(height-this.yf);
        this.trailPY -= this.trailVY;
        fill(this.c,100,100);
        if(this.trailPP > 40){
            this.trailPX = (-.50*this.trailAX*(this.trailPP-40)*(this.trailPP-40))+this.dxi;
        }
        ellipse(this.trailPX,this.trailPY,5,5);
    }

}
function r(min,max){
    max = max+1;
    return Math.floor(Math.random()*(max-min))+min;
}
function draw(){
    colorMode(RGB,255);
    background(0,0,0,20);
    colorMode(HSB,100);
    fireworks.forEach(function(e){
        e.draw();
    });
    if(frameCount%75 == 0){
        new firework;
    }
}
document.addEventListener('click',function(e){
    console.log(Math.floor(e.x-boundingRect.x),Math.floor(e.y-boundingRect.y));
});