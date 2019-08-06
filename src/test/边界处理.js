import Ball from "../components/Ball"
let can = document.getElementById('canvas');
let ctx = can.getContext('2d');
let w = can.width;
let h = can.height;
let balls = [];
for (let i = 0; i < 10; i++) {
  balls.push(new Ball({
    x:Math.random()*w,
    y:Math.random()*h,
    r:Math.random()*30 + 20,
    id:"ball"+i,
    fillStyle:`rgb(${~~(Math.random()*255)},${~~(Math.random()*255)},${~~(Math.random()*255)})`,
    strokeStyle:`rgb(${~~(Math.random()*255)},${~~(Math.random()*255)},${~~(Math.random()*255)})`,
    va:Math.random()*360 * Math.PI/180
  }))
}
let speed = 2;
function ballHandle(ball, index) {
  ball.x += Math.cos(ball.va) * speed;
  ball.y += Math.sin(ball.va) * speed;
  if (ball.x - ball.r >= w || ball.x + ball.r <= 0 || ball.y - ball.r >= h || ball.y + ball.r <= 0) {
    balls.splice(index,1);
    console.log(ball.id,"小球被移除了");
    if (balls.length === 0) {
      console.log("全部小球被移除了")
    }
  }
  ball.render(ctx);
}

(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0,0,w,h);
  let len = balls.length;
  while(len --){
    ballHandle(balls[len],len);
  }

})();
