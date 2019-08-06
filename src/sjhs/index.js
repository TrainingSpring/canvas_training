// 三角函数相关的运动
let can = document.getElementById('canvas');
let w = can.width;
let h = can.height;
let ctx = can.getContext('2d');
let x = w/2,y = h/2;
class Ball {
  constructor(props){
    this.x = 0;
    this.y = 0;
    this.r = 20;
    this.fillStyle = "blue";
    this.strokeStyle = "red";
    this.alpha = 1;
    Object.assign(this,props);
    return this;
  }
  render(ctx){
    let {x,y,r,fillStyle,strokeStyle,alpha} = this;
    ctx.save();
    ctx.fillStyle = fillStyle;
    // ctx.translate(x,y);
    ctx.scale(1,1);
    ctx.strokeStyle = strokeStyle;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
let arc_x_r = 210; // 椭圆的宽度
let arc_y_r = 70;  // 椭圆的高度
let ball = new Ball({x:w/2,y:h/2,r:30}); // 创建小球
let angle = 0 * Math.PI / 180;  // 弧度
let SWING = 60;   // 振幅
let direction = 1; // 方向
let vx = 2, vy = 2;
// 小球左右移动  那么Y轴是不变的
// 正玄波公式(以Y轴为例): y = A sin(Bx +C)+D;
// A 表示振幅  B影响周期 B越小  周期越长  x代表x轴的位置(如果在画面上显示正玄波,那么x必须持续改变  否则看不出来)
// Bx  也可以是弧度
// C控制左右移动
// D控制上下移动
(function move(){
  window.requestAnimationFrame(move);

  ctx.clearRect(0,0, can.width, can.height);
  // 小球朝着某个角度  匀速移动
  ball.x = w/2 + vx * Math.cos(angle);
  ball.y = h/2 + vy * Math.sin(angle);
  vx+=2;
  vy +=2;
  /*  ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#ccc";
    ctx.translate(w/2,h/2);
    ctx.scale(1,0.3);
    ctx.arc(0,0,arc_x_r,0,Math.PI*2);
    ctx.stroke();
    ctx.restore();*/
  // 椭圆运动
  /*
    ball.x = w/2+ Math.cos(angle) * arc_x_r;
    ball.y = h/2 + Math.sin(angle) * arc_y_r;
    angle += 0.02;
    angle %= Math.PI * 2;
  */

  // 圆的运动
  /*  ball.x = x + Math.cos(angle) * arc_r;
    ball.y = y + Math.sin(angle) * -arc_r;
    console.log(ball.x, ball.y);
    angle += 0.05;
    angle %= Math.PI * 2*/
// 脉冲运动
  /*  ball.r = SWING + 20+ Math.sin(angle) * SWING;
    angle += 0.05;
    angle %= Math.PI * 2;*/
// 波形运动
  /*  if (ball.x >= w+20) {
     direction = 0;
   }else if(ball.x <=0){
     direction = 1;

   ball.y = h/2+Math.sin(angle)* SWING;
   angle += 0.05;
   angle %= Math.PI*2;
   if (direction) {
     ball.x += 2;
   }else{
     ball.x = -20;
     ball.x += 2;
   }*/
// 平滑运动
  // ball.x = w/2+Math.sin(y*angle-1)*SWING; // 利用正玄波  来平滑运动
  // ball.y = h/2+Math.sin(angle*ball.x)*SWING;
  // angle+=0.05;
  // angle %= Math.PI *2;
  // y += 2;
  ball.render(ctx);
})();
