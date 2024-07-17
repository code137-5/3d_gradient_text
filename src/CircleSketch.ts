import p5 from "p5";
import Circle from "./Circle";

const circles: Circle[] = [];

const CircleSketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    circles.push(new Circle(p, p.width / 2, p.height / 2));
  };

  p.draw = () => {
    console.log("Drawing frame");
    p.clear();
    p.background(0);

    if (circles.length < 50) {
      let x = p.random(p.width);
      let y = p.random(p.height);
      circles.push(new Circle(p, x, y));
    }

    for (const c of circles) {
      if (c.edges()) {
        c.growing = false;
      }
      c.show();
      c.grow();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

export default CircleSketch;
