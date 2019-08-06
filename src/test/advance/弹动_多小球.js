import Ball from "../../components/Ball"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let balls = [];
let targetBall = null;
for (let i = 0; i < 8; i++) {
  balls.push(new Ball({
    x:utils.rp([30,w-30]),
    y:utils.rp([30,h-30]),
    r:30,
    vx:0,
    vy:0,
    strokeStyle:"rgba(0,0,0,0)",
    fillStyle:"pink"
  }))
}
can.onmousedown = ev=>{
  let ox = ev.offsetX;
  let oy = ev.offsetY;
  balls.forEach((item, index)=>{

    if (item.isPoint({x: ox, y: oy})) {
      targetBall = item;
    }
  })
};
can.onmousemove = ev => {
  let ox = ev.offsetX;
  let oy = ev.offsetY;
  if (targetBall) {

    targetBall.x = ox;
    targetBall.y = oy;
  }
};
can.onmouseup = ev=>{
  targetBall = null;
};
function linkLink(){
  ctx.beginPath();
  ctx.strokeStyle = "#1dcc29";
  ctx.moveTo(ball1.x,ball1.y);
  ctx.lineTo(ball2.x,ball2.y);
  ctx.stroke();
}
let spring = 0.05,offset = 300,friction = 0.8;
function springTo (b1,b2){
  let dx = b2.x - b1.x;
  let dy = b2.y - b1.y;
  let angle = Math.atan2(dy,dx);
  let targetX = b2.x - offset * Math.cos(angle);
  let targetY = b2.y - offset * Math.sin(angle);
  b1.vx += (targetX - b1.x) * spring;
  b1.vy += (targetY - b1.y) * spring;
  b1.vx *= friction;
  b1.vy *= friction;
  b1.x += b1.vx;
  b1.y += b1.vy;

}

(function move(){
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  ctx.beginPath();
  ctx.strokeStyle = "#a1fa51";
  for (let ball of balls) {
    ctx.lineTo(ball.x,ball.y);
  }
  ctx.closePath();
  ctx.stroke();

  balls.forEach((item,index)=>{
    if (targetBall !== item) {
      let b = Object.assign([],balls);
      b.splice(index,1);
      for (let ball of b){
        springTo(item,ball);
      }
    }
    item.render(ctx);
  })
})();
