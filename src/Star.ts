import p5 from "p5";

class Star {
  p: p5;
  x: number;
  y: number;
  z: number;

  constructor(p: p5, x: number, y: number) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.z = this.p.random(this.p.width);
  }

  update(speed: number) {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = this.p.width;
      this.x = this.p.random(-this.p.width, this.p.width);
      this.y = this.p.random(-this.p.height, this.p.height);
    }
  }

  show(colour: number) {
    const p = this.p;
    p.fill(colour);
    p.noStroke();

    let sx = p.map(this.x / this.z, 0, 1, 0, p.width);
    let sy = p.map(this.y / this.z, 0, 1, 0, p.height);

    let r = p.map(this.z, 0, p.width, 16, 0);
    p.ellipse(sx, sy, r, r);
    // console.log(`Star shown at screen (${sx}, ${sy}) with radius ${r}`);
  }
}

export default Star;
