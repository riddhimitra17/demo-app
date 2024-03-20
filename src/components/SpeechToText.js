// SpeechToText.js
import React from "react";

const SpeechToText = ({ isRecording, handleButtonClick, audioUrl, playRecordedAudio }) => {
  return (
    <div className="main-container">
      <p className="action-description">
        {isRecording ? "Recording..." : "Click the button to start recording."}
      </p>
      <button className="action-btn" onClick={() => handleButtonClick("Speech To Text")}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioUrl && <button onClick={playRecordedAudio}>Play Recorded Audio</button>}
    </div>
  );
};

export default SpeechToText;
