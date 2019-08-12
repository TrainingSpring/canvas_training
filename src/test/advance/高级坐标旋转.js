import Ball from "../../components/Ball"
import Rect from "../../components/Rect"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;

let ball = new Ball({
  x:200,
  y:200,
  r:30,
  fillStyle:utils.createColor(),
});
let angle = 0.05,cx = w/2,cy = h/2;
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  let x = ball.x - cx;
  let y = ball.y - cy;
  // let r = Math.sqrt(x**2+y**2);  // 圆形中心点到  环绕中心坐标的直线距离
  // let x1 = r * Math.cos(angle);  // 获取到偏移angle弧度的x长度
  // let y1 = r * Math.sin(angle);  // 获取到偏移angle弧度的y长度
  // angle += 0.05;                 // 弧度加0.05
  // 下面的两部与上面的4步等同
  // 设圆心坐标为  (0,0);
  // 球与中心坐标的距离为r
  // 球与中心坐标之间的弧度为 vr
  // 每一帧旋转弧度为angle
  // 当前球的坐标x = r * cos(vr);
  // 当前球的坐标y = r * sin(vr);
  // 下一帧球的坐标x1 = r * cos(vr + angle);
  // 下一帧球的坐标y1 = r * sin(vr + angle);
  // 根据二角和差公式:
  //    正弦
  // sin(a+b) = sin(a)*cos(b) + sin(b) * cos(a);
  // sin(a-b) = sin(a)*cos(b) - sin(b) * cos(a);
  //    余弦
  // cos(a+b) = cos(a)*cos(b) - sin(a) * sin(b);
  // cos(a-b) = cos(a)*cos(b) + sin(a) * sin(b);
  // 推导出:
  // x1 = r * cos (vr +angle)
  //    = r * (cos(vr) * cos(angle) - sin(vr) * sin(angle))
  //    = r*cos(vr)*cos(angle) - r * sin(vr) * sin(angle);
  //    = x * cos(angle) - y * sin(angle)
  // y1 = r * sin (vr +angle)
  //    = r * (cos(vr) * sin(angle) + cos(vr) * sin(angle))
  //    = r * cos(vr) * sin(angle) + r * cos(angle) * sin(vr);
  //    = x * sin(angle) + y * cos(angle)
  //
  let x1 = x * Math.cos(angle) - y * Math.sin(angle);
  let y1 = y * Math.cos(angle) + x * Math.sin(angle);
  ball.x = cx + x1;
  ball.y = cy + y1;

  ball.render(ctx);
})();
