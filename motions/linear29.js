let ax_slider;

class linear_object{
 constructor(x, y, vx, vy, ax, r, time, c){
   this.pos = createVector(x, y);
   this.vel = createVector(vx,vy);
   this.acc = createVector(ax, 0);
   
   this.r = r;
   this.t = 0; //시간
   this.c = c;
 }
  
 update(){
   this.t += 1;
   this.vel.add(this.acc);
   this.pos.add(this.vel);
   if(this.pos.x > width){this.pos.x = 0}
   if(this.pos.x < 0){this.pos.x = width}
   if(this.pos.y > height){this.pos.y = 0}
   if(this.pos.y < 0){this.pos.y = height}
 }
  
 show(){
   fill(this.c);
   ellipse(this.pos.x, this.pos.y, this.r, this.r);
 }
  
}

function setup() {
  frameRate(60);
  let Canvas = createCanvas(600, 400);
  Canvas.parent('canvas-container');
  
  ax_slider = createSlider(-0.5, 0.5, 0, 0.1);
  ax_slider.position(20, 75);
  ax_slider.size(200);
  
  ob2 = new linear_object(300, 200, 0, 0, ax_slider.value(), 10, 120, 'black');
}

function acc_update(){
  ob2.acc.x = ax_slider.value();
}

function draw() {
  background(220);

  acc_update()
  ob2.update();
  ob2.show();
  text('현재 가속도: ' + ob2.acc.x, 20, 30);
  text('현재 속도: ' + round(ob2.vel.x,2) , 20, 45);
}