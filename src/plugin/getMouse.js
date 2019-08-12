/**
 * @Author: Training
 * @desc 获取鼠标在canvas画布的当前的各项信息
 * @params can
 */

export default function MouseInfo(can,x,y) {
  this.x = x;
  this.y = y;
  this.type = undefined;
    can.onmousemove =  (event)=> {
      this.x = event.offsetX;
      this.y = event.offsetY;
      this.type = 'move';
    };
    return {x:this.x,y:this.y}
}
