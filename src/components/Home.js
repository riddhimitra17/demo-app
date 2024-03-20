import React, { useState, useRef } from "react";
import "./Home.css";
import TextToSpeech from "./TextToSpeech";
import SpeechToText from "./SpeechToText";
import LanguageDetection from "./LanguageDetection";
import LanguageTranslation from "./LanguageTranslation";
import SentimentAnalysis from "./SentimentAnalysis";

function Home() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
    setInputText("");
    if (page === "Speech To Text") {
      if (!isRecording) {
        startRecording();
      } else {
        stopRecording();
      }
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        setRecordedChunks([]); // Reset recordedChunks

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            setRecordedChunks((prevChunks) => [...prevChunks, e.data]);
          }
        };

        mediaRecorder.onstop = () => {
          const recordedBlob = new Blob(recordedChunks, { type: "audio/wav" });
          setAudioUrl(URL.createObjectURL(recordedBlob));
        };

        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecordedAudio = () => {
    const audioElement = new Audio(audioUrl);
    audioElement.play();
  };

  const commonProps = {
    inputText,
    handleInputChange,
    handleButtonClick,
    isRecording,
    audioUrl,
    playRecordedAudio,
  };

  return (
    <div className="App">
      <div className="header">
        <h1>{currentPage}</h1>
      </div>
      <div className="button-container">
        <button onClick={() => handleButtonClick("Text To Speech")}>Text To Speech</button>
        <button onClick={() => handleButtonClick("Speech To Text")}>Speech To Text</button>
        <button onClick={() => handleButtonClick("Language Detection")}>Language Detection</button>
        <button onClick={() => handleButtonClick("Language Translation")}>
          Language Translation
        </button>
        <button onClick={() => handleButtonClick("Sentiment Analysis")}>Sentiment Analysis</button>
      </div>

      {currentPage === "Text To Speech" && <TextToSpeech {...commonProps} />}
      {currentPage === "Speech To Text" && <SpeechToText {...commonProps} />}
      {currentPage === "Language Detection" && <LanguageDetection handleButtonClick={handleButtonClick} />}
      {currentPage === "Language Translation" && <LanguageTranslation handleButtonClick={handleButtonClick} />}
      {currentPage === "Sentiment Analysis" && <SentimentAnalysis handleButtonClick={handleButtonClick} />}
    </div>
  );
}

export default Home;
