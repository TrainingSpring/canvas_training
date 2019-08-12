export default class Line {
  constructor(props){
    this.x = 0;
    this.y = 0;
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.rotate = 0;
    this.strokeStyle = "white";
    this.size = 1;
    Object.assign(this,props);
    return this;
  }
  render(ctx){
    let { x,y,x1,y1,x2,y2,rotate,strokeStyle,size } = this;
    ctx.save();
    ctx.strokeStyle = strokeStyle;
    ctx.strokeWidth = size;
    ctx.translate(x,y);
    ctx.rotate(rotate * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    return this;
  }
}
