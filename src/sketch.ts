import p5 from "p5";
import { colorPalettes } from "./colorPalettes";
import Square from "./Square";

const Sketch = (
  p: p5,
  palette: keyof ReturnType<typeof colorPalettes>,
  frameMultiplier: number,
  inputText: string
) => {
  let squares: Square[] = [];
  let rotationX = 0;
  let rotationY = 0;
  let fontEnglish: p5.Font;
  let fontKorean: p5.Font;
  let cam: p5.Camera; // For camera movement
  let zoom = 800; // Initial zoom level
  let cameraActive = true;
  // let noiseScale = 0.02;

  p.preload = () => {
    fontEnglish = p.loadFont("Roboto-Black.ttf");
    fontKorean = p.loadFont("NotoSansKR-VariableFont_wght.ttf");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    cam = p.createCamera();
    cam.setPosition(0, 0, zoom);

    p.mousePressed = () => {
      cameraActive = !cameraActive; // 마우스 클릭 시 카메라 앵글 움직임 상태 토글
    };

    const textInput = p.select("#textInput")?.elt as HTMLInputElement;
    const submitButton = p.select("#submitButton")?.elt as HTMLElement;

    textInput?.addEventListener("input", () => {
      inputText = textInput.value;
    });

    textInput?.addEventListener("keydown", function (event: KeyboardEvent) {
      if (event.key === "Enter") {
        generateSquares();
      }
    });

    submitButton?.addEventListener("click", generateSquares);
    // 초기 상태에서 한 번만 호출
    generateSquares();
  };

  const generateSquares = () => {
    squares = [];
    let currentFont = /[\u3131-\uD79D]/.test(inputText)
      ? fontKorean
      : fontEnglish;
    /[a-zA-Z0-9]/.test(inputText)
      ? (currentFont = fontEnglish)
      : (currentFont = fontKorean);

    // 폰트 객체가 유효한지 확인
    if (!currentFont) {
      console.error("Font not loaded correctly");
      return;
    }

    let points = currentFont.textToPoints(inputText, 0, 0, 200, {
      sampleFactor: 0.04,
      simplifyThreshold: 0,
    });

    let minX = Math.min(...points.map((p) => p.x));
    let maxX = Math.max(...points.map((p) => p.x));
    let minY = Math.min(...points.map((p) => p.y));
    let maxY = Math.max(...points.map((p) => p.y));

    let offsetX = (maxX + minX) / 2;
    let offsetY = (maxY + minY) / 2;

    let layers = 5; // Number of layers to stack in the z direction
    let layerSpacing = 18; // Distance between each layer
    let size = 25; // Size of the squares

    let colors = colorPalettes(p)[palette];

    for (let z = 0; z < layers; z++) {
      for (let pt of points) {
        let x = pt.x - offsetX;
        let y = pt.y - offsetY;
        let zOffset = z * layerSpacing;
        squares.push(
          new Square(p, x, y, zOffset, size, size, colors, frameMultiplier)
        );
      }
    }
  };

  p.draw = () => {
    p.background(0);
    // 배경 우주 구름 그리기
    // p.loadPixels();
    // for (let x = 0; x < p.width; x++) {
    //   for (let y = 0; y < p.height; y++) {
    //     let noiseVal = p.noise(x * noiseScale, y * noiseScale);
    //     let r = p.map(noiseVal, 0, 1, 10, 30); // 어두운 빨간색 계열
    //     let g = p.map(noiseVal, 0, 1, 10, 50); // 어두운 초록색 계열
    //     let b = p.map(noiseVal, 0, 1, 20, 60); // 어두운 파란색 계열
    //     let index = (x + y * p.width) * 4;
    //     p.pixels[index] = r;
    //     p.pixels[index + 1] = g;
    //     p.pixels[index + 2] = b;
    //     p.pixels[index + 3] = 255; // 알파 채널
    //   }
    // }
    // p.updatePixels();

    if (cameraActive) {
      rotationX = p.map(p.mouseY, 0, p.height, -p.PI, p.PI);
      rotationY = p.map(p.mouseX, 0, p.width, -p.PI, p.PI);
    }
    cam.setPosition(0, 0, zoom); // Adjust camera position based on zoom
    cam.lookAt(0, 0, 0); // Ensure the camera is looking at the center

    p.rotateX(rotationX);
    p.rotateY(rotationY);

    for (let square of squares) {
      square.show();
    }
  };

  p.mouseWheel = (event: WheelEvent) => {
    // Adjust zoom level based on mouse wheel scroll
    zoom -= event.deltaY;
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
