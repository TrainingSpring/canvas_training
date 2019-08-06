import Ball from "../components/Ball"
import utils from "../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let balls = [];
for (let i = 0; i < 10; i ++) {
  balls.push(new Ball({
    x:utils.rp([100,w-100]),
    y:utils.rp([100,h-100]),
    r:utils.rp([15,30]),
    vx:utils.rp([5,10]),
    vy:utils.rp([5,10]),
    ar:utils.rp([0,Math.PI*2]),
  }))
}

function ballHandle(ball) {
  ball.x += Math.cos(ball.ar)*ball.vx;
  ball.y += ball.vy * Math.sin(ball.ar);
  if (ball.y + ball.r >= h ) {
    // ball.ar *= -1;
    // ball.y = h - ball.r;
    ball.vy *= -1;
    ball.y = h - ball.r;
  }else if ( ball.y - ball.r <= 0){
    ball.y = ball.r;
    ball.vy *= -1;
  }
  else if (ball.x + ball.r >= w ) {
    ball.x = w - ball.r;
    ball.vx *= -1;
  }else if ( ball.x - ball.r <= 0){
    ball.x = ball.r;
    ball.vx *= -1;
  }

  ball.render(ctx);

}
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  balls.forEach(ballHandle);
})()
