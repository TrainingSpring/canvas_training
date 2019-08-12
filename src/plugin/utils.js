let C = {};
C.rp = function (range, int) {
  let max = Math.max(...range);
  let min= Math.min(...range);
  let num = Math.random() * (max - min) + min;
  return int?Math.round(num):num;
};
C.createColor = function(){
  return `rgb(${C.rp([55,255],true)},${C.rp([55,255],true)},${C.rp([55,255],true)})`;
};
/**
 * @Author: Training
 * @desc 矩形碰撞检测
 * @params (r1 ,r2 ) 两个矩形对象
 */
C.rectDuang = function (r1,r2) {
  return (r1.x+r1.w >= r2.x && r1.x  <= r2.x + r2.w && r1.y + r1.h >= r2.y && r1.y <= r2.y + r2.h);
};
/**
 * @Author: Training
 * @desc 求两点间的距离
 * @params d1,d2  两个点的坐标数据
 */
C.getDistance = function (d1, d2) {
  let x = d2[0] - d1[0];
  let y = d2[1] - d1[1];
  return Math.sqrt(x**2+y**2);
};
/**
 * @Author: Training
 * @desc 边界回弹处理
 * @params ball , w,h,bounce
 */
C.handleEdge = function (ball, w, h, bounce) {
  if (ball.x - ball.r <= 0 ) {
    ball.x = ball.r;
    ball.vx *= bounce;
  }else if (ball.x + ball.r >= w){
    ball.x = w - ball.r;
    ball.vx *= bounce;
  }
  if (ball.y - ball.r <= 0 ) {
    ball.y = ball.r;
    ball.vy *= bounce;
  }else if(ball.y + ball.r >= h){
    ball.y = h - ball.r;
    ball.vy *= bounce;
  }

};
/**
 * @Author: Training
 * @desc 检测小球的碰撞并反弹
 * @params 两个小球对象
 */
C.checkBallHit = (b1,b2)=>{
  // 获取基本参数:  小球的距离
  let dx = b1.x - b2.x;
  let dy = b1.y - b2.y;
  let dist = Math.sqrt(dx ** 2 + dy **2);
  // 判断是否相撞
  if (dist < b1.r + b2.r){
    // 利用反正切 计算弧度
    let angle = Math.atan2(dy,dx);
    // 获取这个弧度的余弦
    let cos = Math.cos(angle);
    // 获取这个弧度的正弦
    let sin = Math.sin(angle);
    // 以小球2为圆心点 做系统旋转
    // 所以小球2的 x,y 就都为0
    let x2 = 0;
    let y2 = 0;
    // 以小球2为圆心点 做系统旋转
    let x1 = dx * cos + dy * sin;
    let y1 = dy * cos - dx * sin;
    // 旋转小球的速度
    let vx2 = b2.vx * cos + b2.vy * sin;
    let vy2 = b2.vy * cos - b2.vx * sin;
    let vx1 = b1.vx * cos + b1.vy * sin;
    let vy1 = b1.vy * cos - b1.vx * sin;
    // 获取碰撞过后的速度
    let vx1f = ((b1.m - b2.m) * vx1 + 2 * b2.m * vx2) / (b1.m + b2.m);
    let vx2f = ((b2.m - b1.m) * vx2 + 2 * b1.m * vx1) / (b1.m + b2.m);
    // 碰撞过后  复位操作
    let lep = b1.r + b2.r - Math.abs(dist);
    x2 += vx2f > 0 ?lep/2 : -lep/2;
    x1 += vx1f > 0 ?lep/2 : -lep/2;
    // 将坐标旋转回去
    b2.x = x2 * cos - y2 * sin + b2.x;
    b2.y = y2 * cos + x2 * sin + b2.y;
    b1.x = x1 * cos - y1 * sin + b2.x;
    b1.y = y1 * cos + x1 * sin + b2.y;
    // 将速度旋转回去
    b2.vx = vx2f * cos - vy2 * sin;
    b2.vy = vy2 * cos + vx2f * sin;
    b1.vx = vx1f * cos - vy1 * sin;
    b1.vy = vy1 * cos + vx1f * sin;
  }
};
C.mouseInfo = (can)=> {
  let mouse = {x:0,y:0};
  can.onmousemove =  (event)=> {
    let ox  = event.offsetX;
    let oy = event.offsetY;
    mouse .x = ox;
    mouse .y = oy;
  };
  return mouse;
};
export default C;
