import Ball from "../../components/Ball"
import Line from "../../components/Line"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let balls = [];
let num = 100;
for (let i = 0; i < num; i++) {
  balls.push(new Ball({
    x: utils.rp([0,w]),
    y: utils.rp([0,h]),
    r:utils.rp([5,20]),
    m:utils.rp([2,5]),
    vx:utils.rp([-4,4]),
    vy:utils.rp([-4,4]),
    fillStyle:utils.createColor()
  }));
}
function renderBall(ball,i) {
  ball.x += ball.vx;
  ball.y += ball.vy;
  handleBall(ball,i);
  utils.handleEdge(ball,w,h,-0.8);
  ball.render(ctx);
}
function handleBall(ball,i) {
  for (let item of balls) {
    if (item !== ball) {
      crashCheck(ball,item);
    }
  }
}
// 一维碰撞检测
function checkBall(b1,b2) {
  let l = Math.abs(b1.x - b2.x);
  if (b1.r + b2.r > l) {
    let f = b1.r + b2.r - l;
    b1.x = b1.x - f/2;
    b2.x = b2.x + f/2;
    // 以下写法错误   不能直接赋值   因为会在计算出之前改变对应的数据
    // 比如 在第二个公式中  b1.vx在第一个公式中已被改变
    // b1.vx = ((b1.m - b2.m) * b1.vx + 2* b2.m * b2.vx)/(b1.m + b2.m);
    // b2.vx = ((b2.m - b1.m) * b2.vx + 2* b1.m * b1.vx)/(b1.m + b2.m);

    let v1Final = ((b1.m - b2.m) * b1.vx + 2 * b2.m * b2.vx) / (b1.m + b2.m);
    let v2Final = ((b2.m - b1.m) * b2.vx + 2 * b1.m * b1.vx) / (b1.m + b2.m);

    b1.vx = v1Final;
    b2.vx = v2Final;
  }
}
// 二维碰撞检测
function crashCheck(b1,b2) {
  // 距离
  let ox = b1.x - b2.x; // 两球的x距离
  let oy = b1.y - b2.y; // 两球的y距离
  let or = Math.sqrt(ox**2 + oy**2); // 两球的中心点直线距离
  let angle = Math.atan2(oy,ox); // 两球的角度
  let cos = Math.cos(angle),sin = Math.sin(angle);
  if (Math.abs(or) < b1.r + b2.r){

    let x1 = 0; // 这里以b2为中心点
    let y1 = 0; // 这里以b2为中心点
    let x2 = ox * cos + oy * sin; // 获取到旋转后的x坐标值
    let y2 = oy * cos - ox * sin; // 获取到旋转后的y坐标值
    // 旋转速度向量
    let vx1 = b1.vx * cos + b1.vy * sin;
    let vy1 = b1.vy * cos - b1.vx * sin;
    let vx2 = b2.vx * cos + b2.vy * sin;
    let vy2 = b2.vy * cos - b2.vx * sin;
    // 获取碰撞后的x轴速度向量
    let vx1Final = ((b1.m - b2.m) * vx1 + 2 * b2.m * vx2) / (b1.m + b2.m);
    let vx2Final = ((b2.m - b1.m) * vx2 + 2 * b1.m * vx1) / (b1.m + b2.m);
    // 碰撞后复位
    let l = b1.r + b2.r - Math.abs(x2 - x1);
    x2 += vx1Final<0?-l/2:l/2; // 根据移动方向复位
    x1 += vx2Final<0?-l/2:l/2; // 根据移动方向
    // 将旋转后的速度向量 再反向旋转回来, 此时的x轴速度向量  应该是碰撞后的速度向量
    b1.vx = vx1Final * cos - vy1 * sin;
    b1.vy = vy1 * cos + vx1Final * sin;
    b2.vx = vx2Final * cos - vy2 * sin;
    b2.vy = vy2 * cos + vx2Final * sin;
    // 将回旋后的x,y轴进行复位
    // 当然可以不复位   直接使用原始数据
    // 但是由于碰撞后 球体会改变其x轴的方向 所以建议回旋复位
    // y轴没有任何改变可以不管,因为就算回旋了  也是无限接近之前的数据
    b1.x = x2 * cos - y2 * sin + b2.x;
    b1.y = y2 * cos + x2 * sin + b2.y;

    b2.x = x1 * cos - y1 * sin + b2.x;
    b2.y = y1 * cos + x1 * sin + b2.y;
  }
}
(function move() {
  requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  balls.forEach(renderBall)
})();
