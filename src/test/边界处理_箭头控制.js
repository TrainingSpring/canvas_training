import Arrow from "../components/Arrow"
import utils from "../plugin/utils"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let arrow = new Arrow({
  x:w/2,
  y:h/2,
  h:20,
  w:40
}).render(ctx);
let vx = 0;
let vy = 0;
let ax = 0;
let ay = 0;
let vr = 0;
let moseDown = 0;
let friction = 0.5;
window.onkeydown = (ev) =>{
  if (moseDown === 0) {
    moseDown = 1;
    console.log(ev.key);
    switch (ev.key) {
      case "ArrowRight":
        vx = 1;
        ax = 0.1;
        vr = 0;
        break;
      case "ArrowLeft":
        vx = -1;
        ax = -0.1;
        vr = Math.PI;
        break;
      case "ArrowUp":
        vy = -1;
        ay = -0.1;
        vr = -90*Math.PI/180;
        break;
      case "ArrowDown":
        vy = 1;
        ay = 0.1;
        vr = 90*Math.PI/180;
        break;
    }
  }
};
window.onkeyup = (ev)=>{

  moseDown = 0;
};


function moveArrow() {
  arrow.x += vx;
  arrow.y += vy;
  vx += ax;
  vy += ay;
  arrow.rotate = vr;
  if (arrow.x >= w + arrow.w/2) {
    arrow.x = -arrow.w/2;
  }else if (arrow.x + arrow.w / 2 <= 0){
    arrow.x = w+arrow.w/2;
  }else if (arrow.y >= h + arrow.h/2) {
    arrow.y = -arrow.h/2;
  }else if (arrow.y + arrow.h / 2 <= 0){
    arrow.y = h+arrow.h/2;
  }
  if (moseDown === 0) {
    if (vx > 0)
      vx = vx>friction?vx - friction:0;
    else if(vx <0)
      vx = vx<friction?vx + friction:0;
    else if(vy > 0)
      vy = vy>friction?vy - friction:0;
    else if(vy < 0)
      vy = vy<friction?vy + friction:0;
    ax = 0;
    ay = 0;
  }

}
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  moveArrow();
  // arrow.y += vy;
  arrow.render(ctx);
})()
