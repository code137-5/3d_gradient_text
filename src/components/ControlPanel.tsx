import React, { useState, Dispatch, SetStateAction } from 'react';
import { Typography } from 'antd';
import './ControlPanel.css';
import ColorRadio from './ColorRadio';

type Palette = keyof ReturnType<typeof import('../colorPalettes').colorPalettes>;

interface ControlPanelProps {
  onPaletteChange: Dispatch<SetStateAction<Palette>>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onPaletteChange }) => {
  const [selectedPalette, setSelectedPalette] = useState<Palette>('lesbian');

  const handlePaletteChange = (palette: string) => {
    const paletteKey = palette as Palette;
    setSelectedPalette(paletteKey);
    onPaletteChange(paletteKey);
  };

  return (
    <div className="control-panel">
      <Typography.Title level={3}>Color Palettes</Typography.Title>
      <ColorRadio selectedPalette={selectedPalette} onPaletteChange={handlePaletteChange} />
      {/* 여기에 다른 조작 버튼들을 추가할 수 있습니다 */}
    </div>
  );
};

export default ControlPanel;
