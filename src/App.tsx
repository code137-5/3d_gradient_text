import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import Sketch from './sketch';
import './App.css';
import { Spin } from 'antd';
import ControlPanel from './components/ControlPanel';
import InputPanel from './components/InputPanel';
import InfoMessage from './components/InfoMessage';
import { captureElement } from './utils/capture';

type Palette = keyof ReturnType<typeof import('./colorPalettes').colorPalettes>;
const textSequence = ['모두의연구소', '*****', '$$$$$', '즐거우신가요', '커피사주세요'];

const App: React.FC = () => {
  const [inputText, setInputText] = useState("모두의연구소");
  const [selectedPalette, setSelectedPalette] = useState<Palette>('lesbian');
  const [frameMultiplier, setFrameMultiplier] = useState<number>(0.003);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const canvasContainer = document.getElementById('canvas-container') as HTMLElement;
    canvasContainer.innerHTML = ''; // 기존 p5 인스턴스 제거

    const p5Instance = new p5((p: p5) => {
      Sketch(p, selectedPalette, frameMultiplier, inputText);
      setLoading(false);
    }, canvasContainer);

    return () => {
      p5Instance.remove();
    };
  }, [selectedPalette, frameMultiplier, inputText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setInputText(prevText => {
        const currentIndex = textSequence.indexOf(prevText);
        const nextIndex = (currentIndex + 1) % textSequence.length;
        return textSequence[nextIndex];
      });
    }, 5000); // 5초마다 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  const handleInputChange = (value: string) => {
    setInputText(value);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // 기본 저장 동작 방지
        captureElement('canvas-container'); // use capture function
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" tip="Loading..." />
        </div>
      )}
      <InfoMessage />
      <div id="canvas-container"></div>
      <InputPanel onSubmit={handleInputChange} />
      <ControlPanel onPaletteChange={setSelectedPalette} onFrameMultiplierChange={setFrameMultiplier} />
    </div>
  );
};

export default App;
