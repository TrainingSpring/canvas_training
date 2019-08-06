import Rect from "../../components/Rect"
import utils from "../../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let rects = [];
let targetRect = null;
let dx = 0,dy = 0;
for (let i = 0; i < 5; i++) {
  rects.push( new Rect({
    x:utils.rp([0,w-100]),
    y:utils.rp([0,h-80]),
    w:utils.rp([80,200]),
    h:utils.rp([80,200]),
    fillStyle:utils.createColor(),
    strokeStyle:utils.createColor()
  }))
}
can.onmousedown = ev=>{
  let ox = ev.offsetX;
  let oy = ev.offsetY;
  for (let r of rects) {
    if (r.isPoint({x:ox,y:oy})){
      dx = ox - r.x;
      dy = oy - r.y;
      console.log(dx,dy);
      targetRect = r;
    }
  }
};
can.onmousemove = ev=>{
  let ox = ev.offsetX;
  let oy = ev.offsetY;
  if (targetRect) {
    targetRect.x = ox - dx;
    targetRect.y = oy - dy;
  }
};
can.onmouseup = ev =>{
  targetRect = null;
}
(function move() {
  window.requestAnimationFrame(move)
  ctx.clearRect(0,0,w,h);
  rects.forEach(item=>{
    if (item !== targetRect && targetRect){
      if (utils.rectDuang(targetRect, item)) {
        console.log(("撞上了"))
      };
    }
    item.render(ctx);
  })

})();
