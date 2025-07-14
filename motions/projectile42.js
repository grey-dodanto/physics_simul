let ob3;

let start_button;

let vx_input;
let vx_button;
let vx_value = 0;

let vy_input;
let vy_button;
let vy_value = 0;

let ay_input;
let ay_button;
let ay_value = 0.1;

class projectile_object{
 constructor(x, y, vx, vy, ay, r, c){
   this.pos = createVector(x, y);
   this.vel = createVector(vx,vy);
   this.acc = createVector(0, ay);
   
   this.r = r;
   this.t = 0; //시간
   this.c = c;
   
   this.cos_seta = 0;
   this.sin_seta = 0;
 }
  
 update(){
   this.t += 1;
   this.vel.add(this.acc)
   this.pos.add(this.vel);
   
   if(this.vel.x != 0 && this.vel.y != 0){
     this.cos_seta  = (vx_value)/sqrt(((vx_value)**2)+(vy_value)**2)
     this.sin_seta  = (vy_value)/sqrt(((vx_value)**2)+(vy_value)**2)
   }
   
   if(this.pos.y > 350){
     this.acc.set(0,0);
     this.vel.set(0,0);
     this.pos.set(this.pos.x, 350);
   }
   if(this.pos.x > width){this.pos.x = 0}
   if(this.pos.x < 0){this.pos.x = width}
 }
  
 show(){
   fill(this.c);
   ellipse(this.pos.x, this.pos.y, this.r, this.r);
 }
  
}

function setup(){
  frameRate(60);
  let Canvas = createCanvas(600, 400);
  Canvas.parent('canvas-container');
  ob3 = new projectile_object(50, 350, vx_value, vy_value, 0, 10, 'black');
  
  vx_input = createInput(vx_value);
  vx_input.position(20, 75);
  vx_input.size(50, 37)
  vy_input = createInput(vy_value);
  vy_input.position(20, 120);
  vy_input.size(50, 37)
  ay_input = createInput(ay_value);
  ay_input.position(width-120, 75);
  ay_input.size(50, 37)
  
  vx_button = createButton('속도 x성분 ➡️');
  vx_button.position(vx_input.x + vx_input.width, 65);
  vy_button = createButton('속도 y성분 ⬆️');
  vy_button.position(vy_input.x + vy_input.width, 110);
  ay_button = createButton('중력');
  ay_button.position(ay_input.x + ay_input.width, 65);
  start_button = createButton('발사')
  start_button.parent('controls');
  
  vx_button.mousePressed(value_update);
  vx_input.changed(value_update);
  vy_button.mousePressed(value_update);
  vy_input.changed(value_update);
  ay_button.mousePressed(value_update);
  ay_input.changed(value_update);
  
  value_update();
  
  start_button.mousePressed(start)
}

function value_update(){
  vx_value = vx_input.value();
  vy_value = vy_input.value();
  ay_value = ay_input.value();
  
  vx_value = parseFloat(vx_value);
  vy_value = parseFloat(vy_value)*(-1);
  ay_value = parseFloat(ay_value);
}

function start(){
  ob3.vel.x = vx_value
  ob3.vel.y = vy_value
  ob3.acc.y = ay_value
  /*ob3.vel.set(vx_value, vy_value);
  ob3.acc.set(0, ay_value);*/
}

function draw() {
  background(220);
  
  ob3.update();
  ob3.show();
  
  fill(0)
  text('최고점 높이: ', 15, 105);
  text('처음 높이 도달시간(s): ', 15, 120);
  text('수평 도달 거리: ', 15, 135);
  
  if(ob3.acc.y != 0){
    text('최고점 높이: ' + round(((vy_value)*(vy_value))*((ob3.sin_seta)*(ob3.sin_seta))/2*(ay_value), 2), 15, 105);
    text('처음 높이 도달시간(s): ' + round((2*(vy_value)*(ob3.sin_seta)/(ay_value))/60, 2), 15, 120);
    text('수평 도달 거리: ' + round((2*(vx_value)**2)*(ob3.sin_seta)*(ob3.cos_seta)/(ay_value)*(-1),2), 15, 135);
}

  fill(240)
  rect(0, 355, 600, 45);
}