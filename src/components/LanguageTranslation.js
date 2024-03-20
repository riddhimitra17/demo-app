// LanguageTranslation.js
import React, { useState } from "react";

const LanguageTranslation = ({ handleButtonClick }) => {
  const [inputText, setInputText] = useState("");
  const [outputHindi, setOutputHindi] = useState("");
  const [outputBangla, setOutputBangla] = useState("");

  const translateText = async () => {
    try {
      const response = await fetch('http://localhost:8000/translation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lang: inputText })
      });

      if (response.ok) {
        const data = await response.json();

        if (data && 'Hindi' in data && 'Bangla' in data) {
          setOutputHindi('Hindi: ' + data.Hindi.join(' '));
          setOutputBangla('Bangla: ' + data.Bangla.join(' '));
        } else {
          throw new Error('Invalid response format');
        }
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setOutputHindi('An error occurred.');
      setOutputBangla('An error occurred.');
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
        translateText();
        handleButtonClick("Language Translation"); // Assuming you want to keep the common button click handler
      }}>
        Translate
      </button>
      <div className="output-box">
        <strong>Hindi Translation:</strong>
        <p>{outputHindi}</p>
      </div>
      <div className="output-box">
        <strong>Bangla Translation:</strong>
        <p>{outputBangla}</p>
      </div>
    </div>
  );
};

export default LanguageTranslation;
