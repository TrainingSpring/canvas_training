// 箭头跟随鼠标移动和旋转
import GetMouse from "../plugin/getMouse";
import Arrow from "../components/Arrow";

let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width,h = can.height;
let mouse = new GetMouse(can,w/2,h/2);
ctx.beginPath();
ctx.fillStyle="blue";
ctx.strokeStyle = "black";

let arrow = new Arrow({
  w:40,
  h:20,
  x:w/2,
  y:h/2,
}).render(ctx);
let speed = 2;
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  let x = mouse.x - arrow.x;
  let y = mouse.y - arrow.y;
  let angle = Math.atan2(y,x);
  let vx = speed * Math.cos(angle);
  let vy = speed * Math.sin(angle);
  let c = mouse.x - arrow.x - (mouse.y - arrow.y);
  if (c > 2 || c < -2) {
    arrow.x += vx;
    arrow.y += vy;
  }
  arrow.rotate  = angle;
  arrow.render(ctx);

})();
