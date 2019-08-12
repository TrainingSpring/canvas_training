import Ball from "../../components/Ball"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let num = 1000,balls = [],bounce = -0.07,spring = 0.1,friction = 1,mouseSize = 50;
for (let i = 0; i < num; i++) {
  balls.push(new Ball({
    x:utils.rp([0,w]),
    y:utils.rp([0,h]),
    r:utils.rp([8,10]),
    vx:utils.rp([-3,3]),
    vy:utils.rp([-3,3]),
    fillStyle:utils.createColor(),
    strokeColor:utils.createColor()
  }))
}
can.onmousemove = ev =>{
  let ox = ev.offsetX;
  let oy = ev.offsetY;
  balls[0].x = ox;
  balls[0].y = oy;
  balls[0].r = mouseSize;
};
can.onclick = ev=>{
  mouseSize += 50;
  if (mouseSize > h / 2) {
    mouseSize = 50;
  }
  balls[0].r = mouseSize;
}
function moveBall(item,i) {
  if (!i)return;
  utils.handleEdge(item,w,h,bounce);
  item.x += item.vx;
  item.y += item.vy;
}
function springBall(item,i) {
  // if (!i)return;
  for (let j = i + 1; j < num; j++) {
    let ball = balls[j];
    let dist = utils.getDistance([item.x,item.y],[ball.x,ball.y]);
    let dx = ball.x - item.x,dy =  ball.y - item.y ;
    let minDist = ball.r + item.r;
    if (dist <= minDist) {
      let tx = item.x + dx / dist * minDist; //  将item和ball的最小距离的坐标算出来
      let ty = item.y + dy / dist * minDist;
      let ax = (tx - ball.x ) * spring; // 做最小X轴距离弹动
      let ay = (ty - ball.y ) * spring; // 做最小Y轴距离弹动
      item.vx = (item.vx - ax) * friction; // 做弹跳运动  然后使用摩擦力停止运动
      item.vy = (item.vy - ay) * friction;
      ball.vx = (ball.vx + ax) * friction;
      ball.vy = (ball.vy + ay) * friction;
    }
  }
}
function renderBall(item,i) {
  // if (!i)return;
  item.render(ctx)
}
(function  move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  balls.forEach(springBall)
  balls.forEach(moveBall);
  balls.forEach(renderBall);
})();
