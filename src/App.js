import React, { useEffect } from 'react';
import p5 from 'p5';
import Sketch from './sketch';
import './App.css';

function App() {
  useEffect(() => {
    const p5Instance = new p5(Sketch, document.getElementById('canvas-container'));

    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div id="inputContainer">
          <input type="text" id="textInput" placeholder="Enter your text" />
          <button id="submitButton">Update Text</button>
        </div>
      </header>
      <div id="canvas-container"></div>
    </div>
  );
}

export default App;
