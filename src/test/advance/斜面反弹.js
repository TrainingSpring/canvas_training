import Ball from "../../components/Ball"
import Line from "../../components/Line"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let ball = new Ball({
  x:200,
  y:100,
  r:10,
  fillStyle:utils.createColor(),
  strokeStyle:utils.createColor()
});
let line = new Line({
  x: 100,
  y: 200,
  x1: 0,
  y1: 0,
  x2: 400,
  y2: 0,
  strokeStyle: "#fff",
  size:3,
  rotate:10
});
let g = 0.2, bounce = -0.8,f = 0.98,cos = Math.cos(line.rotate * Math.PI / 180),sin = Math.sin(line.rotate * Math.PI / 180);
function bounceBall(ball) {
  // 获取小球到中心点的位置  (中心点设为线段的起始位置);
  let rx = ball.x - line.x;
  let ry = ball.y - line.y;
  // 旋转球
  let x1 = rx * cos + ry * sin;
  let y1 = ry * cos - rx * sin;
  // 旋转速度
  let vx = ball.vx * cos + ball.vy * sin;
  let vy = ball.vy * cos - ball.vx * sin;
  // 碰撞检测
  if (x1 + ball.r >= line.x1 && x1 - ball.r <= line.x2){
    if (y1 + ball.r > 0 && vy > y1) {
      y1 = - ball.r;
      vy *= bounce;
    }
    if (y1 - ball.r < 0 && vy < y1){
      y1 = ball.r;
      vy *= bounce;
    }
  }
  // 旋转至初始位置
  rx = x1 * cos - y1 * sin;
  // ry = y1 * cos + x1 * sin;
  // 速度旋转回
  ball.vx = vx * cos - vy * sin;
  ball.vy = vy * cos + vx * sin;
  //
  ball.x = rx + line.x;
  // ball.y = ry + line.y;



}
(function move() {
  requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  ball.vy += g;
  ball.x += ball.vx;
  ball.y += ball.vy;
  bounceBall(ball);
  utils.handleEdge(ball,w,h,bounce);
  ball.render(ctx);
  line.render(ctx);
})();
