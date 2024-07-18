import React from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import './ColorRadio.css';

interface ColorRadioProps {
  selectedPalette: string;
  onPaletteChange: (palette: string) => void;
}

const radioStyle = (backgroundColor: string) => ({
  color: 'white',
  fontWeight: 'bold',
  backgroundColor,
  opacity: 0.8,
});

const ColorRadio: React.FC<ColorRadioProps> = ({ selectedPalette, onPaletteChange }) => {
  const handlePaletteChange = (e: RadioChangeEvent) => {
    onPaletteChange(e.target.value);
  };

  return (
    <div className="color-radio">
      <Radio.Group value={selectedPalette} onChange={handlePaletteChange}>
      <Radio.Button value="lesbian" style={radioStyle('#d362a4')}>Lesbian</Radio.Button>
      <Radio.Button value="gay" style={radioStyle('#1ca3ec')}>Gay</Radio.Button>
      <Radio.Button value="bisexual" style={radioStyle('#d60270')}>Bisexual</Radio.Button>
      <Radio.Button value="transgender" style={radioStyle('#55cdfc')}>Transgender</Radio.Button>
      <Radio.Button value="nonbinary" style={radioStyle('#000')}>Nonbinary</Radio.Button>
      <Radio.Button value="asexual" style={radioStyle('#a4a4a4')}>Asexual</Radio.Button>
      <Radio.Button value="intersex" style={radioStyle('#ffda00')}>Intersex</Radio.Button>
      <Radio.Button value="queer" style={radioStyle('#b57edc')}>Queer</Radio.Button>
      <Radio.Button value="genderfluid" style={radioStyle('#ff75a2')}>Genderfluid</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default ColorRadio;
