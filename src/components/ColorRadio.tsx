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
        <Radio.Button value="lesbian">#1</Radio.Button>
        <Radio.Button value="gay">#2</Radio.Button>
        <Radio.Button value="bisexual">#3</Radio.Button>
        <Radio.Button value="transgender">#4</Radio.Button>
        <Radio.Button value="nonbinary">#5</Radio.Button>
        <Radio.Button value="asexual">#6</Radio.Button>
        <Radio.Button value="intersex">#7</Radio.Button>
        <Radio.Button value="queer">#8</Radio.Button>
        <Radio.Button value="genderfluid">#9</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default ColorRadio;
