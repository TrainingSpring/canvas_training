export default class Ball {
  constructor(props){
    this.x = 0;
    this.y = 0;
    this.r = 20;
    this.fillStyle = "blue";
    this.strokeStyle = "red";
    this.vx = 0;
    this.vy = 0;
    this.alpha = 1;
    Object.assign(this,props);
    return this;
  }
  render(ctx){
    let {x,y,r,fillStyle,strokeStyle,alpha} = this;
    ctx.save();
    ctx.fillStyle = fillStyle;
    // ctx.translate(x,y);
    // ctx.scale(1,1);
    ctx.strokeStyle = strokeStyle;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    return this;
  }
  isPoint(pot){
    let g = Math.sqrt((pot.x - this.x)**2+(pot.y - this.y) **2 );
    return g <= this.r ;
  }
}
