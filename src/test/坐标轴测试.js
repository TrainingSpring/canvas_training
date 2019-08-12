import Coord from "../components/Coord"
import utils from "../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let coord = new Coord({
  x:w/2,
  y:h/2,
  strokeStyle:'white'
});
let vx = 2,vy = 2;// x轴偏移和  y轴偏移向量  // 可以根据偏移向量获取对应的速度向量
let speed = 3; // 速度向量,可以根据角度获取到对应的坐标偏移量
let friction = 0.98; // 摩擦力
let g = 0.2; //重力
let ax = 0.1,ay = 0.1; // 加速度
let spring = 0.9;// 弹力
let targetX = 30; // 弹动的目标点坐标
let targetY = 30; // 弹动的目标点坐标
let x = 0,y = 0;
coord.render(ctx);
coord.drawLineInit(ctx,x,y);
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  // vx *= friction;   // 摩擦力   阻力值越小  阻力越大  当阻力值为1  则无阻力,当阻力值大于1  变推进力  速度会越来越快
  // vy *= friction
  // vy += g;  // 重力也是一种加速度  只不过是在某一个坐标上的加速度
  // vx += ax;  // 加速度   速度越来越快
  // vy += ay;  // 加速度   速度越来越快
  // vy += speed * Math.sin( 45 * Math.PI /180); // 更改角度
  // vx += speed * Math.cos( 45 * Math.PI /180); // 更改角度
  // vx  += (targetX - x) * spring;  // 弹跳
  // vy  += (targetY - y) * spring;  // 弹跳

  x += vx;
  y += vy;
  coord.drawLine(ctx,x,y);



})();
