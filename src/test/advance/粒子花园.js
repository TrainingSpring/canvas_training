import Ball from "../../components/Ball"
import Rect from "../../components/Rect"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w;
let h;
let particle = [];
window.onresize = ()=>{
  w = window.innerWidth;
  h = window.innerHeight;
  can.width = w;
  can.height = h;
  createParticle( w * h / 15000);
};
onresize();
function createParticle(nums) {
  particle = [];
  for (let i = 0; i < nums; i++) {
    let size = utils.rp([3,10]);
    particle.push(new Ball({
      x:utils.rp([0,w]),
      y:utils.rp([0,h]),
      r:size,
      fillStyle:"#fff",
      strokeStyle:"rgba(0,0,0,0)",
      m:size,
      vx:utils.rp([-2,2]),
      vy:utils.rp([-2,2])
    }))
  }
}
function renderParticle(p) {
  p.render(ctx);
}
function animate(item,i) {
  item.x += item.vx;
  item.y += item.vy;
  let len = particle.length;
  for (let j = i+1;j<len;j++){
    let target = particle[j];
    speedCount(item,target);
  }
  if (item.x - item.r > w) {
    item.x = - item.r;
  }else if(item.x + item.r < 0){
    item.x = w + item.r;
  }
  if (item.y + item.r < 0) {
    item.y = h + item.r;
  }else if(item.y - item.r > h){
    item.y = - item.r;
  }
}
function speedCount(p1,p2) {
  let dx = -p1.x + p2.x;
  let dy = -p1.y + p2.y;
  let distSQ = dx **2 + dy **2;
  let dist = Math.sqrt(distSQ);
  let minDist = w / 10;
  if (dist < minDist) {
    let G = 1;
    // let F = G * (p1.m * p2.m)/distSQ;
    let F = 0.0001;
    // let ax = F * dx / dist;
    // let ay = F * dy / dist;
    let ax = F * dx;
    let ay = F * dy;
    p1.vx += ax / p1.m;
    p1.vy += ay / p1.m;
    p2.vx -= ax / p2.m;
    p2.vy -= ay / p2.m;
    drawLine(p1,p2,dist,minDist);
    utils.checkBallHit(p1,p2);
  }
}
function drawLine(p1,p2,d,md){
  ctx.save();
  ctx.beginPath();
  ctx.strokeWidth = Math.max(0,(1 - d / md) * 2);
  ctx.globalAlpha = 1- d/md;
  ctx.moveTo(p1.x,p1.y);
  ctx.lineTo(p2.x,p2.y);
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

}
(function move() {
  requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  particle.forEach(animate);
  particle.forEach(renderParticle);
})();
