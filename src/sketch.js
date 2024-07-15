const Sketch = (p) => {
  let squares = [];
  let rotationX = 0;
  let rotationY = 0;
  let inputText = "모두의 연구소";
  let fontEnglish, fontKorean;
  let cam; // For camera movement
  let zoom = 800; // Initial zoom level

  p.preload = () => {
    fontEnglish = p.loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
    fontKorean = p.loadFont('NotoSansKR-VariableFont_wght.ttf');
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    cam = p.createCamera();
    cam.setPosition(0, 0, zoom);

    const textInput = p.select('#textInput');
    const submitButton = p.select('#submitButton');

    textInput.input(() => {
      inputText = textInput.value();
    });

    textInput.elt.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        generateSquares();
      }
    });

    submitButton.mousePressed(generateSquares);

    // 초기 상태에서 한 번만 호출
    generateSquares();
  };

  const generateSquares = () => {
    squares = [];
    let currentFont = /[\u3131-\uD79D]/.test(inputText) ? fontEnglish : fontKorean;
    /[a-zA-Z0-9]/.test(inputText) ? currentFont = fontEnglish : currentFont = fontKorean;

    // 폰트 객체가 유효한지 확인
    if (!currentFont) {
      console.error('Font not loaded correctly');
      return;
    }

    let points = currentFont.textToPoints(inputText, 0, 0, 200, {
      sampleFactor: 0.05,
      simplifyThreshold: 0
    });

    let minX = Math.min(...points.map(p => p.x));
    let maxX = Math.max(...points.map(p => p.x));
    let minY = Math.min(...points.map(p => p.y));
    let maxY = Math.max(...points.map(p => p.y));

    let offsetX = (maxX + minX) / 2;
    let offsetY = (maxY + minY) / 2;

    let layers = 3; // Number of layers to stack in the z direction
    let layerSpacing = 30; // Distance between each layer
    let size = 30; // Size of the squares

    for (let z = 0; z < layers; z++) {
      for (let pt of points) {
        let x = pt.x - offsetX;
        let y = pt.y - offsetY;
        let zOffset = z * layerSpacing;
        squares.push(new Square(x, y, zOffset, size, size));
      }
    }
  };

  p.draw = () => {
    p.background(0);

    // Rotate the text with mouse movements
    rotationX = p.map(p.mouseY, 0, p.height, -p.PI, p.PI);
    rotationY = p.map(p.mouseX, 0, p.width, -p.PI, p.PI);

    cam.setPosition(0, 0, zoom); // Adjust camera position based on zoom
    cam.lookAt(0, 0, 0); // Ensure the camera is looking at the center

    p.rotateX(rotationX);
    p.rotateY(rotationY);

    for (let square of squares) {
      square.show();
    }
  };

  class Square {
    constructor(x, y, z, w, h) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      this.h = h;
    }

    show() {
      p.push();
      p.translate(this.x, this.y, this.z);

      // Calculate diagonal position for gradient
      let diagonalPosition = (this.x % 2 + this.y + this.z + this.w * 15 + this.h + p.frameCount * 0.003) % 1;

      // Define colors for the gradient
      let colors = [
        p.color(213, 45, 0), // Dark Orange
        p.color(255, 154, 86), // Orange
        p.color(255, 223, 0), // Light Orange
        p.color(255, 255, 255), // White
        p.color(211, 98, 164), // Pink
        p.color(163, 2, 98) // Dark Pink
      ];
      
      // Determine the current pair of colors
      let index = p.floor(diagonalPosition * (colors.length - 1));
      let nextIndex = (index + 1) % colors.length;
      let lerpAmt = (diagonalPosition * (colors.length - 1)) % 1;
      let gradientColor;

      // Ensure colors are within the bounds of the array
      if (colors[index] && colors[nextIndex]) {
        gradientColor = p.lerpColor(colors[index], colors[nextIndex], lerpAmt);
      } else {
        gradientColor = p.color(255); // Fallback color
      }

      p.fill(gradientColor);
      p.stroke(255); // White stroke
      p.strokeWeight(0.15); // Adjust stroke weight as needed

      p.box(this.w, this.h, this.w);
      p.pop();
    }
  }

  p.mouseWheel = (event) => {
    // Adjust zoom level based on mouse wheel scroll
    zoom -= event.delta;
  };

  p.keyPressed = () => {
    // Move the camera with arrow keys
    if (p.keyCode === p.LEFT_ARROW) {
      cam.move(-50, 0, 0);
    } else if (p.keyCode === p.RIGHT_ARROW) {
      cam.move(50, 0, 0);
    } else if (p.keyCode === p.UP_ARROW) {
      cam.move(0, -50, 0);
    } else if (p.keyCode === p.DOWN_ARROW) {
      cam.move(0, 50, 0);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    generateSquares();
  };
};

export default Sketch;
