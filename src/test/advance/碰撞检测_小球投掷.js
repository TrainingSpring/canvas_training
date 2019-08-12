import Ball from "../../components/Ball"
import Rect from "../../components/Rect"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let ball = new Ball({
  x:50,
  y:h - 50,
  r : 20,
  fillStyle:utils.createColor(),
  strokeStyle:"rgba(0,0,0,0)"
});

let rect = new Rect({
  x:w - 100,
  y: h - 100,
  w:80,
  h:50,
  fillStyle: utils.createColor()
});
let mouse = utils.mouseInfo(can);
let moving = false;
let g = 0.2,f = 0.98,ease = 0.05;
let lastX,lastY;
let animationId = null;
function drawLine(){
  let ox = mouse.x || ball.x;
  let oy = mouse.y || ball.y;
  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.moveTo(ball.x,ball.y);
  ctx.lineTo(ox,oy);
  ctx.stroke();
  ctx.closePath();
}
can.onclick=ev=>{
  if (!moving) {
    moving = true;
    let dx = mouse.x - ball.x;
    let dy = mouse.y - ball.y;
    ball.vx = dx * ease;
    ball.vy = dy * ease;
    lastX = ball.x;
    lastY = ball.y;
  }

};
function checkBall() {
  // 方法一: 使用小球以及盒子的各边界进行检测!
/*  if (ball.x - ball.r >= rect.x && ball.x + ball.r <= rect.x + rect.w && ball.y - ball.r >= rect.y && ball.y + ball.r <= rect.h + rect.y) {
    moving = false;
    ball.x = 50;
    ball.y = h - 50;
  }*/
  // 方法二: 使用线性函数(y = kx + b)检测  k : 斜率  b : 距离Y轴的偏移
  // ball:  y1 = k1x + b1;
  // box : y2 = k2x + b2;
  let k1 = (ball.y - lastY) / (ball.x - lastX); // 因为粗心导致的比例搞反了 需谨记
  let b1 = ball.y - k1 * ball.x;
  let k2 = 0;
  let b2 = rect.y;
  let intersectX = (b2 - b1 )/ (k1 - k2);
  let intersectY = k1 * intersectX + b1;
  if (intersectX - ball.r > rect.x && intersectX + ball.r < rect.x + rect.w && ball.y - ball.r > rect.y){
    return true;
  }
}
function ballRun() {
  ball.vx *= f;
  ball.vy *= f;
  ball.vy += g;
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (checkBall() || ball.x - ball.r > w || ball.x + ball.r < 0 || ball.y - ball.r > h ) {
    moving = false;
    ball.x = 50;
    ball.y = h - 50;
  }
  lastY = ball.y;
  lastX = ball.x;
}

(function move() {
  animationId = window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  if (moving) {
    ballRun();
  }else {
    drawLine();
  }
  ball.render(ctx);
  rect.render(ctx);
})();
