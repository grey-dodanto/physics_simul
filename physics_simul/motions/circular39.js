let ob1;
let cycle_input;
let cycle_button;
let cycle_value = 60;

let angle_input;
let angle_button;
let angle_value = 360;

let radius_input;
let radius_button;
let radius_value = 100;

class object{
 constructor(x, y, vx, vy, r, kr, angle, time, c){
   this.pos = createVector(x, y);
   this.vel = createVector(vx,vy);
   this.r = r; //물체 반지름
   this.kr = kr; //원운동 반지름
   this.w = radians(angle)/time; //각속도
   this.time = time
   this.t = 0; //시간
   this.c = c;
 }
  
 angular_velocity(angle, time){
   this.w = radians(angle)/time; //각속도 업데이트
 }
  
 update(){
   this.t += 1
   this.pos.set(300+this.kr*cos(this.w*this.t),300+this.kr*sin(this.w*this.t))
 }
  
 show(){
   fill(this.c);
   ellipse(this.pos.x, this.pos.y, this.r, this.r);
 }
  
}

function setup() {
  frameRate(60);
  let Canvas = createCanvas(600, 600);
  Canvas.parent('canvas-container');
  ob1 = new object(300, 200, 0, 0, 20, radius_value, angle_value, cycle_value, 'black');
  
  angle_input = createInput(angle_value);
  angle_input.position(20, 75);
  angle_input.size(50, 37)
  cycle_input = createInput(cycle_value);
  cycle_input.position(20, 120);
  cycle_input.size(50, 37)
  radius_input = createInput(radius_value);
  radius_input.position(width-170, 75);
  radius_input.size(50, 37)
  
  angle_button = createButton('각도 변경');
  angle_button.position(angle_input.x + angle_input.width, 65);
  cycle_button = createButton('주기 변경');
  cycle_button.position(cycle_input.x + cycle_input.width, 110);
  radius_button = createButton('반지름 변경');
  radius_button.position(radius_input.x + radius_input.width, 65);
  
  angle_button.mousePressed(w_update);
  angle_input.changed(w_update);
  cycle_button.mousePressed(w_update);
  cycle_input.changed(w_update);
  radius_button.mousePressed(w_update);
  radius_input.changed(w_update);
  
  w_update();
}

function w_update(){
  angle_value = angle_input.value();
  cycle_value = cycle_input.value();
  radius_value = radius_input.value();
  
  ob1.w = radians(angle_value)/cycle_value;
  ob1.kr = radius_value;
}

function draw() {
  background(220);
  
  text('현재 각속도: ' + ob1.w, 15, 105);
  text('현재 구심 가속도: ' + ((ob1.w)*(ob1.w)*(ob1.kr)), 15, 120);
  ob1.update();
  ob1.show();
}