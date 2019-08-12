export default class Coord{
  constructor(props){
    this.x = 0;
    this.y = 0;
    this.r = 1000;
    this.strokeStyle = "#333";
    this.scale = 1;
    this.rotate = 0;
    Object.assign(this,props);
    return this;
  }
  render(ctx){
    let {x,y,r,strokeStyle, scale , rotate} = this;
    ctx.translate(x,y);
    ctx.strokeStyle =strokeStyle;
    ctx.scale(scale,scale);
    ctx.rotate(rotate);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,-r);
    ctx.moveTo(0,0);
    ctx.lineTo(0,r);
    ctx.moveTo(0,0);
    ctx.lineTo(-r,0);
    ctx.moveTo(0,0);
    ctx.lineTo(r,0);
    ctx.stroke();
    return this;
  }
  drawLineInit(ctx,x,y){
     // x = -x;
     y = -y;
    ctx.beginPath();
    ctx.moveTo(x,y);
  }
  drawLine (ctx,x,y){
    y = -y;
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}
