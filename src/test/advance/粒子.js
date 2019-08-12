/**
 * @Author: Training
 * @desc 粒子  小到一粒沙粒,大到一个星球都可以称之为粒子
 * @params
 */
import Ball from "../../components/Ball"
import Rect from "../../components/Rect"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let balls = [];
let nums = 100;
for (let i = 0; i < nums; i++) {
  balls.push(new Ball({
    x:utils.rp([10,w-10]),
    y:utils.rp([10,h-10]),
    r:10,
    fillStyle:"#fff",
    strokeStyle:"rgba(0,0,0,0)",
    m:1
  }))
}
function drawBall() {
  balls.forEach(item=>{
    item.render(ctx);
  })
}
// 计算引力和加速度
function gravity(item,i) {
  item.x += item.vx;
  item.y += item.vy;
  for (let j = i + 1; j < nums; j++) {
    let t = balls[j];
    if (item !== t) {
      let dx = -item.x + t.x;
      let dy = -item.y + t.y;
      // console.log(dx, dy);
      let distSQ = dx **2 + dy **2;
      let dist = Math.sqrt(distSQ);
      // let G = 6.67*10^-11;
      let G = 0.8;
      let F = G * (item.m* t.m)/distSQ;  //计算万有引力
      let ax = F * dx / dist;
      let ay = F * dy / dist;
      item.vx += ax/item.m;
      item.vy += ay/item.m;
      t.vx -= ax / t.m;
      t.vy -= ay / t.m;
    }
  }
}
(function move() {
  requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  balls.forEach(gravity);
  drawBall();
})();
