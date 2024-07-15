import React, { useState, Dispatch, SetStateAction } from 'react';
import { Typography, Slider } from 'antd';
import './ControlPanel.css';
import ColorRadio from './ColorRadio';

type Palette = keyof ReturnType<typeof import('../colorPalettes').colorPalettes>;

interface ControlPanelProps {
  onPaletteChange: Dispatch<SetStateAction<Palette>>;
  onFrameMultiplierChange: Dispatch<SetStateAction<number>>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onPaletteChange, onFrameMultiplierChange }) => {
  const [selectedPalette, setSelectedPalette] = useState<Palette>('lesbian');
  const [frameMultiplier, setFrameMultiplier] = useState<number>(0.003);

  const handlePaletteChange = (palette: string) => {
    const paletteKey = palette as Palette;
    setSelectedPalette(paletteKey);
    onPaletteChange(paletteKey);
  };

  const handleFrameMultiplierChange = (value: number) => {
    setFrameMultiplier(value);
    onFrameMultiplierChange(value);
  };

  return (
    <div className="control-panel">
      <Typography.Title level={3}>Color Palettes</Typography.Title>
      <ColorRadio selectedPalette={selectedPalette} onPaletteChange={handlePaletteChange} />
      <Typography.Title level={3}>Frame Count</Typography.Title>
      <Slider
        min={0.01}
        max={0.03}
        step={0.005}
        value={frameMultiplier}
        onChange={handleFrameMultiplierChange}                                                  
      />
      {/* 여기에 다른 조작 버튼들을 추가할 수 있습니다 */}
    </div>
  );
};

export default ControlPanel;
