/**
 * @Author: Training
 * @desc 鼠标点击图像,拖拽图像 投掷图像
 */
import Ball from "../../components/Ball"
import utils from "../../plugin/utils"
import mouse from "../../plugin/getMouse"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let getMouse =new mouse(can,0,0);
let ball = new Ball({
  x:utils.rp([100,w-100]),
  y:utils.rp([100,h-100]),
  r:30
});

let isDrop = false;
let startX,startY;
function dropBall() {
 can.onmousedown = (ev)=>{
   if (ball.isPoint({x:ev.offsetX,y:ev.offsetY})) {
     isDrop = true;
     let sx = startX = ev.offsetX;  // 给startX一个初始值
     let sy = startY = ev.offsetY;  // 给startY一个初始值
     let rx = sx - ball.x;
     let ry = sy - ball.y;
     can.onmousemove = (ev)=>{
       let ox = ev.offsetX;
       let oy = ev.offsetY;
       ball.x = ox - rx;
       ball.y = oy - ry;
     }
   }
   can.onmouseup = ev => {
     can.onmousemove = null;
     isDrop = false;
   }
 };

  ball.render(ctx);
}
let vx = utils.rp([-1,1]);
let vy = 6;
let g = 0.2;
function ballRun(){
  vy += g;
  ball.x += vx;
  ball.y += vy;
  if (ball.x + ball.r >= w) {
    ball.x = w-ball.r;
    vx *= -0.8;
  }else if(ball.x - ball.r <= 0) {
    ball.x = ball.r;
    vx *= -0.8;
  }
  if (ball.y + ball.r >= h){
    ball.y = h - ball.r;
    vy *= -0.8;
  } else if(ball.y - ball.r <= 0 ){
    ball.y = ball.r;
    vy *= -0.8;
  }
}
/**
 * @Author: Training
 * @desc 投掷
 * @params
 */
function throwBall() {
  vx = ball.x - startX; // 改变速度向量  获取最后一帧数据的移动距离
  vy = ball.y - startY; // 改变速度向量  获取最后一帧数据的移动距离
  startX = ball.x;      // 因为每一帧的 小球的位置会随时改变  所以需要重新赋值
  startY = ball.y;      // 因为每一帧的 小球的位置会随时改变 所以需要重新赋值
}
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  dropBall();
  if (!isDrop) // 判断是否拖拽
    ballRun();
  else
    throwBall();
  ball.render(ctx);
})();

