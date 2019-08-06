import Arrow from "../../components/Arrow"

let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let arrow = new Arrow({
  x:w/2,y:h/2,h:40,w:80
});
let ease = 0.08;
let ox = arrow.x,
oy = arrow.y;
can.onmousemove = (ev)=>{
  ox = ev.offsetX;
  oy = ev.offsetY;
  let dx = ox - arrow.x;
  let dy = oy - arrow.y;
  let angle = Math.atan2(dy,dx);
  arrow.rotate = angle;
};
function ballSlow() {
  let dx = ox - arrow.x;
  let dy = oy - arrow.y;
   let vx =dx * ease;     // 得到X轴移动系数
   let vy =dy * ease;     // 得到Y轴移动系数
  arrow.x += vx;           // 根据速度改变小球X轴位置
  arrow.y += vy;           // 根据速度该表小球Y轴位置
}


(function move() {
  window.requestAnimationFrame(move)
  ctx.clearRect(0,0,w,h);
  ballSlow();
  arrow.render(ctx);
})();
