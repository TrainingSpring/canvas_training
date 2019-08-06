/**
 * @Author: Training
 * @desc 箭头组件   画一个箭头对象
 * @params
 */
export default class Arrow {
  constructor(props){
    this.w = 40;
    this.h = 20;
    this.x = 0;
    this.y = 0;
    this.fillStyle = "blue";
    this.strokeStyle = "black";
    this.rotate = 0;
    Object.assign(this,props);
    return this;
  }
  createArrow(ctx){
    let {x,y,w,h} = this;
    ctx.beginPath();
    ctx.moveTo(0,0 - h/2);
    ctx.lineTo(-w/2,-h/2);
    ctx.lineTo(-w/2, + h / 2);
    ctx.lineTo(+w/4, + h/2);
    ctx.lineTo(+w/4, + h);
    ctx.lineTo(+w/2,0);
    ctx.lineTo(+w/4, - h);
    ctx.lineTo(+w/4,-h/2);
    ctx.lineTo(0,-h/2);
  }
  render(ctx){
    let {fillStyle,x,y,strokeStyle,rotate} = this;
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.translate(x,y);
    ctx.rotate(rotate);
    this.createArrow(ctx);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    return this;
  }
}
