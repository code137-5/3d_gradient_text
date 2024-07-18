import p5 from "p5";
import Star from "./Star";

const Sketch = (p: p5) => {
  let bgGraphics: p5.Graphics;
  let stars: Star[] = [];
  let speed: number;
  let colour: number;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    // 별 생성
    for (let i = 0; i < 800; i++) {
      stars[i] = new Star(
        p,
        p.random(-p.width, p.width),
        p.random(-p.height, p.height)
      );
    }

    bgGraphics = p.createGraphics(p.windowWidth, p.windowHeight);
    drawGradient(bgGraphics);
    drawCloudBackground(bgGraphics);
  };

  const drawGradient = (g: p5.Graphics) => {
    g.noFill();
    for (let y = 0; y < g.height; y++) {
      let inter = p.map(y, 0, g.height, 0, 1);
      let c = p.lerpColor(p.color(30), p.color(70), inter);
      g.stroke(c);
      g.line(0, y, g.width, y);
    }
  };

  const drawCloudBackground = (g: p5.Graphics) => {
    g.noFill();
    for (let y = 0; y < g.height; y++) {
      for (let x = 0; x < g.width; x++) {
        let noiseVal = p.noise(x * 0.01, y * 0.01);
        let r = p.map(noiseVal, 0, 1, 10, 30);
        let gVal = p.map(noiseVal, 0, 1, 10, 50);
        let b = p.map(noiseVal, 0, 1, 20, 60);
        let c = p.color(r, gVal, b, 150);
        g.set(x, y, c);
      }
    }
    g.updatePixels();
  };

  p.draw = () => {
    p.background(0);
    // 배경 그라디언트 그리기
    p.push();
    p.resetMatrix();
    p.translate(0, 0, -1000);
    // p.image(bgGraphics, -p.width / 2, -p.height / 2, p.width, p.height);
    p.image(
      bgGraphics,
      -p.width * 2,
      -p.height * 2,
      p.width * 10,
      p.height * 10
    );
    p.pop();

    // 별 그리기
    speed = p.map(p.mouseX, 0, p.width, 1, 20);
    colour = p.map(p.mouseY, 0, p.height, 255, 0);

    p.translate(p.width / 2, p.height / 2, -500);

    for (let i = 0; i < stars.length; i++) {
      stars[i].update(speed);
      stars[i].show(colour);
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      bgGraphics = p.createGraphics(p.windowWidth, p.windowHeight);
      drawGradient(bgGraphics);
      drawCloudBackground(bgGraphics);
    };
  };
};

export default Sketch;
