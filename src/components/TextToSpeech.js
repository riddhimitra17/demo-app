// TextToSpeech.js
import React, { useState } from "react";

const TextToSpeech = ({ inputText, handleInputChange, handleButtonClick }) => {
  return (
    <div className="text-input-container">
      <label htmlFor="textInput">Enter Text:</label>
      <textarea id="textInput" value={inputText} onChange={handleInputChange} />
      <button className="action-btn" onClick={() => handleButtonClick("Text To Speech")}>
        Convert to Speech
      </button>
    </div>
  );
};

export default TextToSpeech;
