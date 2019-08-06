import Ball from "../components/Ball"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let ball = new Ball(
  {
    x:20,y:20,r:20
  }
).render(ctx);

let angle = 0*Math.PI/180,a = 0.5,vx = 1,vy = 1;
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  let ax = Math.cos(angle) * a;
  let ay = Math.sin(angle) * a;
  // ball.x += vx;
  ball.y += vy;
  // vx += ax;
  vy += a;
  if (ball.y >= h - 20) console.log(ball.y);
  if (ball.r + ball.y > h) {
    vy *= -0.8;
  }else if (ball.r + ball.x > w) {
    vx *= -0.8;
  }
  ball.render(ctx);
})();
