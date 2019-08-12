import Ball from "../../components/Ball"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let b1 = new Ball({
  x:utils.rp([30,w-30]),
  y:utils.rp([30,h-30]),
  r:utils.rp([20,30]),
  fillStyle:utils.createColor(),
  strokeStyle:utils.createColor()
});
let b2 = new Ball({
  x:utils.rp([30,w-30]),
  y:utils.rp([30,h-30]),
  r:utils.rp([20,30]),
  fillStyle:utils.createColor(),
  strokeStyle:utils.createColor()
});
let target = null;
can.onmousedown = ev=>{
  let ox = ev.offsetX;
  let oy = ev.offsetY;
  if (b1.isPoint({x:ox,y:oy})){
    target = b1;
  } else if(b2.isPoint({x:ox,y:oy})){
    target = b2;
  }
};
can.onmousemove = ev => {
  let ox = ev.offsetX;
  let oy = ev.offsetY;
  if (target) {
    target.x = ox;
    target.y = oy;
    if (utils.getDistance([b1.x,b1.y], [b2.x,b2.y]) <= b1.r + b2.r) {
      console.log("碰到了")
    }
  }
};
can.onmouseup = ev =>{
  target = null;
};
(function move () {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);

  b1.render(ctx);
  b2.render(ctx);
})()
