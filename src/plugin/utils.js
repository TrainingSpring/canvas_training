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
}
export default C;
