import Ball from "../../components/Ball"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let ball  = new Ball({
  x:w/2 + 20,y:h/2 + 20,r:30,vx:0,vy:0
});
let spring = 0.2,friction =0.9,g = 0.2;
let mouse = {x:w/2,y:h/2};
can.onmousemove = (ev)=>{
  mouse.x = ev.offsetX;
  mouse.y = ev.offsetY;
};
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  let ax = (mouse.x - ball.x)*spring;
  let ay = (mouse.y - ball.y)*spring;

  ball.vx += ax;
  ball.vy += ay;
  ball.vy += g;

  ball.vx *= friction;
  ball.vy *= friction;

  ball.x += ball.vx;
  ball.y += ball.vy;
  ctx.beginPath();
  ctx.strokeStyle = "pink";
  ctx.moveTo(mouse.x,mouse.y);
  ctx.lineTo(ball.x,ball.y);
  ctx.stroke();
  ball.render(ctx);
})()
