import React, { useState } from 'react';
import { Button, Input, Tag } from 'antd';
import './InputPanel.css';

interface InputPanelProps {
  onSubmit: (value: string) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 동작 방지
      if (text.trim() !== '') {
        handleSearch(text);
      }
    }
  };

  const handleClick = () => {
    if (text.trim() !== '') {
      handleSearch(text);
    }
  };

  const handleSearch = (searchText: string) => {
    onSubmit(searchText);
    updateRecentSearches(searchText);
    setText(''); // 입력 필드를 초기화
  };

  const updateRecentSearches = (searchText: string) => {
    setRecentSearches(prevSearches => {
      const updatedSearches = [...prevSearches.filter(item => item !== searchText), searchText];
      if (updatedSearches.length > 5) {
        updatedSearches.shift(); // 가장 오래된 검색어 삭제
      }
      return updatedSearches;
    });
  };

  const handleTagClick = (searchText: string) => {
    setText(searchText);
    onSubmit(searchText);
  };

  return (
    <div className="input-panel">
      <div className="input-group">
        <Input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyUp={handleKeyDown}
          placeholder="Enter your text"
        />
        <Button onClick={handleClick} size="large">Update</Button>
      </div>
      <div className="recent-searches">
        {recentSearches.map((search, index) => (
          <Tag key={index} onClick={() => handleTagClick(search)}>
            {search}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default InputPanel;
