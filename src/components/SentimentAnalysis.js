// SentimentAnalysis.js
import React, { useState } from "react";

const SentimentAnalysis = () => {
  const [inputText, setInputText] = useState("");
  const [sentimentResult, setSentimentResult] = useState("");

  const analyzeSentiment = async () => {
    try {
      const response = await fetch('https://sentiment-1-5d2803ff5f5c.herokuapp.com/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: inputText
        })
      });

      const responseData = await response.json();
      const sentiment = responseData.sentiment;
      setSentimentResult(sentiment);
    } catch (error) {
      console.error('Error:', error);
      setSentimentResult('An error occurred.');
    }
  };

  return (
    <div>
      
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
        <button className="action-btn" onClick={analyzeSentiment}>
          Analyze Sentiment
        </button>
      </div>
      <div id="result">
        {sentimentResult && <p>Sentiment: {sentimentResult}</p>}
      </div>
    </div>
  );
};

export default SentimentAnalysis;
