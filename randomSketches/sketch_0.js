let p5Canvas;

let funis=[];
let h=0,s=0,b=0;

function setup(){
  p5Canvas=createCanvas(800,500);
  p5Canvas.parent("field");

  document.querySelector("#field").style.width=width+"px";
  document.querySelector("#field").style.height=height+"px";

  colorMode(HSB,255);
}

function draw(){
  h=125+125*sin(radians(frameCount*3));
  s=125+125*sin(radians(frameCount*2));
  b=50+50*sin(radians(frameCount*1));
  background(h,s,b);

  stroke(255,100);
  noFill();
  ellipse(mouseX,mouseY,40,40);

  fill(255,random(200));
  noStroke();
  textAlign(CENTER,CENTER);
  textSize(100);
  text("Vapor",width/2,height/2);
  textSize(50);
  text(funis.length,width/2,height/4*3);

  if(mouseIsPressed){
    if(mouseButton==RIGHT && funis.length>0){
      funis.shift();
    }else if(funis.length<200){
      let funi=new Funi(mouseX,mouseY,radians(random(360)),10,200);
      funis.push(funi);
    }
  }

  for (funi of funis) {
    funi.step();
    funi.display();
  }
}

//--

class Funi {
  constructor(x,y,theta,v,size) {
    this.x=x;
    this.y=y;
    this.theta=theta;
    this.v=v;
    this.size=size;
  }

  step(){
    this.x+=this.v*cos(this.theta);
    if(this.x>width+this.size/2) this.x=-this.size/2;
    if(this.x<-this.size/2) this.x=width+this.size/2;
    this.y+=this.v*sin(this.theta);
    if(this.y>height+this.size/2) this.y=-this.size/2;
    if(this.y<-this.size/2) this.y=height+this.size/2;
  }

  display(){
    fill(255,10);
    noStroke();
    ellipse(this.x,this.y,this.size,this.size);
  }
}
