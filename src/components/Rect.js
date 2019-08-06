export default class Rect {
  constructor(props) {
    this.x = 0;
    this.y = 0;
    this.w = 20;
    this.h = 20;
    this.fillStyle = "blue";
    this.strokeStyle = "rgba(0,0,0,0)";
    this.vx = 0;
    this.vy = 0;
    this.scale = 1;
    this.rotate = 0;
    Object.assign(this,props);
    return this;
  }
  render(ctx){
    let {x,y,w,h,fillStyle,strokeStyle,scale,rotate} = this;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.scale =scale;
    ctx.rotate = rotate;
    ctx.fillRect(x,y,w,h);
    ctx.restore();
    return this;
  }
  isPoint({x,y}){
    return (x>=this.x && x <= this.x + this.w && y >= this.y && y <= this.y +this. h);
  }

}
