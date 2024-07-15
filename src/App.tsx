import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import Sketch from './sketch';
import './App.css';
import ControlPanel from './components/ControlPanel';
import InputPanel from './components/InputPanel';

type Palette = keyof ReturnType<typeof import('./colorPalettes').colorPalettes>;

const App: React.FC = () => {
  const [inputText, setInputText] = useState("모두의 연구소");
  const [selectedPalette, setSelectedPalette] = useState<Palette>('lesbian');
  const [frameMultiplier, setFrameMultiplier] = useState<number>(0.003);

  useEffect(() => {
    const canvasContainer = document.getElementById('canvas-container') as HTMLElement;
    canvasContainer.innerHTML = ''; // 기존 p5 인스턴스 제거

    const p5Instance = new p5((p: p5) => Sketch(p, selectedPalette, frameMultiplier, inputText), canvasContainer);

    return () => {
      p5Instance.remove();
    };
  }, [selectedPalette, frameMultiplier, inputText]);

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  return (
    <div className="App">
      <div id="canvas-container"></div>
      <InputPanel onSubmit={handleInputChange} />
      <ControlPanel onPaletteChange={setSelectedPalette} onFrameMultiplierChange={setFrameMultiplier} />
    </div>
  );
};

export default App;
