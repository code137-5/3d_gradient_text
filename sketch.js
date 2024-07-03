let squares = [];
let rotationX = 0;
let rotationY = 0;
let inputText = "Code137.5";
let fontEnglish, fontKorean;
let cam; // For camera movement
let zoom = 800; // Initial zoom level

function preload() {
  fontEnglish = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
  fontKorean = loadFont('./NotoSansKR-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 0, zoom);

  const textInput = select('#textInput');
  const submitButton = select('#submitButton');

  textInput.input(() => {
    inputText = textInput.value();
  });

  textInput.elt.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      generateSquares();
    }
  });

  submitButton.mousePressed(generateSquares);

  generateSquares();
}

function generateSquares() {
  squares = [];
  let currentFont = /[\u3131-\uD79D]/.test(inputText) ? fontEnglish : fontKorean;
  /[a-zA-Z0-9]/.test(inputText) ? currentFont = fontEnglish : currentFont = fontKorean;
  let points = currentFont.textToPoints(inputText, 0, 0, 200, {
    sampleFactor: 0.1,
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
}

function draw() {
  background(0);

  // Rotate the text with mouse movements
  rotationX = map(mouseY, 0, height, -PI, PI);
  rotationY = map(mouseX, 0, width, -PI, PI);

  cam.setPosition(0, 0, zoom); // Adjust camera position based on zoom
  cam.lookAt(0, 0, 0); // Ensure the camera is looking at the center

  rotateX(rotationX);
  rotateY(rotationY);

  for (let square of squares) {
    square.show();
  }
}

class Square {
  constructor(x, y, z, w, h) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
  }

  show() {
    push();
    translate(this.x, this.y, this.z);

    // Calculate diagonal position for gradient
    let diagonalPosition = (this.x + this.y + this.z + this.w * 15 + this.h + frameCount * 0.005) % 1;

    // Define colors for the gradient
    let colors = [
      color(255, 244, 48), // Yellow
      color(255, 255, 255), // White
      color(156, 89, 209), // Purple
      color(0, 0, 0) // Black
    ];
    // let colors = [
    //   color(255, 0, 0), // Red
    //   color(255, 165, 0), // Orange
    //   color(255, 255, 0), // Yellow
    //   color(0, 255, 0), // Green
    //   color(0, 0, 255), // Blue
    //   color(128, 0, 128) // Violet
    // ];
    // Determine the current pair of colors
    let index = floor(diagonalPosition * (colors.length - 1));
    let nextIndex = (index + 1) % colors.length;
    let lerpAmt = (diagonalPosition * (colors.length - 1)) % 1;
    let gradientColor;

    // Ensure colors are within the bounds of the array
    if (colors[index] && colors[nextIndex]) {
      gradientColor = lerpColor(colors[index], colors[nextIndex], lerpAmt);
    } else {
      gradientColor = color(255); // Fallback color
    }

    fill(gradientColor);
    // noStroke(); // Remove stroke
    stroke(255); // White stroke
    strokeWeight(0.25); // Adjust stroke weight as needed

    box(this.w, this.h, this.w);
    pop();
  }
}

function mouseWheel(event) {
  // Adjust zoom level based on mouse wheel scroll
  zoom -= event.delta;
}

function keyPressed() {
  // Move the camera with arrow keys
  if (keyCode === LEFT_ARROW) {
    cam.move(-50, 0, 0);
  } else if (keyCode === RIGHT_ARROW) {
    cam.move(50, 0, 0);
  } else if (keyCode === UP_ARROW) {
    cam.move(0, -50, 0);
  } else if (keyCode === DOWN_ARROW) {
    cam.move(0, 50, 0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generateSquares();
}
