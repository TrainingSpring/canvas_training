/**
 * @Author: Training
 * @desc 缓动
 */
import Ball from "../../components/Ball"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;

let ball  = new Ball({
  x:0,y:0,r:30
});
let ease = 0.02,endX = w/2,endY = h/2;
// 缓动   原理:
// 根据距离 从快到慢移动
function ballSlow() {
  let dx = endX - ball.x; // 获取小球当前位置到结束位置x轴的距离
  let dy = endY - ball.y; // 获取小球当前位置到结束位置y轴的距离
  let vx = dx * ease;     // 得到X轴移动系数
  let vy = dy * ease;     // 得到Y轴移动系数
  ball.x += vx;           // 根据速度改变小球X轴位置
  ball.y += vy;           // 根据速度该表小球Y轴位置
}

(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  ballSlow();
  ball.render(ctx);
})();
