import Ball from "../components/Ball"
import utils from "../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let balls = [];
for (let i = 0; i < 100; i++) {
  balls.push(new Ball({
    x:w/2,
    y:h,
    r:Math.random()>0.9?utils.rp([25,40]):utils.rp([10,20]),
    vx:utils.rp([-3,3]), // x的速度
    vy:utils.rp([0,-10]), // y的速度
    // as:utils.rp([0,0.01]), // 加速度
    fillStyle:utils.createColor(),
    strokeStyle:utils.createColor(),
  }))
}
let as = 0.1;
function draw(ball) {
  ball.x += ball.vx;
  ball.y += ball.vy;
  // ball.vx += ball.as;

  ball.vy += as;
  if (ball.x - ball.r >= w || ball.x + ball.r <= 0 || ball.y - ball.r >= h || ball.y + ball.r <= 0) {
    ball.x = w/2;
    ball.y = h;
    ball.vx = utils.rp([-3,3]);
    ball.vy = utils.rp([-3,-10]);
    ball.as = utils.rp([-1,2]);
    ball.fillStyle = utils.createColor()
  }
  ball.render(ctx);
}
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  balls.forEach(draw);
})()
