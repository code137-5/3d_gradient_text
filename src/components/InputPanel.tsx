import React from 'react';
import { Button, Input } from 'antd';
import './InputPanel.css';

interface InputPanelProps {
  onSubmit: () => void;
  onInputChange: (value: string) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ onSubmit, onInputChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <div className="input-panel">
      <Input
        type="text"
        id="textInput"
        placeholder={"Enter your text"}
        onChange={handleInputChange}
      />
      <Button className="input-button" onClick={onSubmit} size='large'>Update</Button>
    </div>
  );
};

export default InputPanel;
