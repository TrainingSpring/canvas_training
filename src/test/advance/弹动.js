import Ball from "../../components/Ball"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let ball  = new Ball({
  x:80,y:h/2,r:30
});
let spring = 0.5;
let tx = w/2;
let vx = 2;
let friction = 0.9; // 小于1 大于0  越小摩擦力越大  越大摩擦力越小  如果大于1就变成推动力了
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  let g = (tx - ball.x) * spring; // 根据弹力值 计算加速度
  vx += g; // 加速度
  vx *= friction; // 摩擦力
  ball.x += vx;
  ball.render(ctx);
})();
