// LanguageDetection.js
import React, { useState } from "react";

const LanguageDetection = ({ handleButtonClick }) => {
  const [inputText, setInputText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");

  const detectLanguage = async () => {
    try {
      const response = await fetch('https://lang-detect-97bced978a17.herokuapp.com/detection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lang: inputText })
      });

      const data = await response.json();
      setDetectedLanguage(data.detected_language);
    } catch (error) {
      console.error('Error:', error);
      setDetectedLanguage('An error occurred.');
    }
  };

  return (
    <div className="text-input-container">
      <label htmlFor="textInput">Enter Text:</label>
      <textarea
        id="textInput"
        rows="4"
        cols="50"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text here..."
      />
      
      <button className="action-btn" onClick={() => {
        detectLanguage();
        handleButtonClick("Language Detection"); // Assuming you want to keep the common button click handler
      }}>
        Detect Language
      </button>
      <div>{detectedLanguage}</div>
    </div>
  );
};

export default LanguageDetection;
