import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import './ColorRadio.css';

interface ColorRadioProps {
  selectedPalette: string;
  onPaletteChange: (palette: string) => void;
}

const ColorRadio: React.FC<ColorRadioProps> = ({ selectedPalette, onPaletteChange }) => {
  const handlePaletteChange = (e: RadioChangeEvent) => {
    onPaletteChange(e.target.value);
  };

  return (
    <div className="color-radio">
      <Radio.Group value={selectedPalette} onChange={handlePaletteChange}>
        <Radio.Button value="lesbian">L</Radio.Button>
        <Radio.Button value="gay">G</Radio.Button>
        <Radio.Button value="bisexual">B</Radio.Button>
        <Radio.Button value="transgender">T</Radio.Button>
        <Radio.Button value="nonbinary">NB</Radio.Button>
        <Radio.Button value="asexual">A</Radio.Button>
        <Radio.Button value="intersex">I</Radio.Button>
        <Radio.Button value="queer">Q</Radio.Button>
        <Radio.Button value="genderfluid">GF</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default ColorRadio;
