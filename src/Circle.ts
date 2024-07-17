import p5 from "p5";

class Circle {
  p: p5;
  x: number;
  y: number;
  r: number;
  growing: boolean;

  constructor(
    p: p5,
    x: number,
    y: number,
    r: number = 1,
    growing: boolean = true
  ) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.r = r;
    this.growing = growing;
  }

  show() {
    console.log(
      `Showing circle at (${this.x}, ${this.y}) with radius ${this.r}`
    );
    const p = this.p;
    p.push();
    p.translate(this.x - p.width / 2, this.y - p.height / 2, 0);
    p.stroke(255);
    p.strokeWeight(2);
    p.noFill();
    p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    p.pop();
  }

  grow() {
    if (this.growing) {
      this.r += 1;
      console.log(`Growing circle to radius ${this.r}`);
    }
  }

  edges() {
    return (
      this.x + this.r > this.p.width ||
      this.x - this.r < 0 ||
      this.y + this.r > this.p.height ||
      this.y - this.r < 0
    );
  }
}

export default Circle;
