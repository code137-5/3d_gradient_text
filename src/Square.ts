import p5 from "p5";

class Square {
  p: p5;
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  colors: p5.Color[];
  frameMultiplier: number;

  constructor(
    p: p5,
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    colors: p5.Color[],
    frameMultiplier: number
  ) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.colors = colors;
    this.frameMultiplier = frameMultiplier;
  }

  show() {
    const p = this.p;
    p.push();
    p.translate(this.x, this.y, this.z);

    let diagonalPosition =
      ((this.x % 2) +
        this.y +
        this.z +
        this.w * 15 +
        this.h +
        p.frameCount * this.frameMultiplier) %
      1;

    let index = p.floor(diagonalPosition * (this.colors.length - 1));
    let nextIndex = (index + 1) % this.colors.length;
    let lerpAmt = (diagonalPosition * (this.colors.length - 1)) % 1;
    let gradientColor;

    if (this.colors[index] && this.colors[nextIndex]) {
      gradientColor = p.lerpColor(
        this.colors[index],
        this.colors[nextIndex],
        lerpAmt
      );
    } else {
      gradientColor = p.color(255);
    }

    p.fill(gradientColor);
    p.stroke(255, 255, 255, 0.5);
    p.strokeWeight(0.1);
    p.box(this.w, this.h, this.w);
    p.pop();
  }
}

export default Square;
