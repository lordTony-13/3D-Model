import React, { useState, useEffect, useRef } from "react";

export const VoiceControl = ({ setAnimation }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const recognition = useRef(null);
  const audioRef = useRef(new Audio());

  // Initialize SpeechRecognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;

      recognition.current.onresult = (event) => {
        const speechToText = event.results[0][0].transcript.toLowerCase();
        console.log(speechToText);
        setRecognizedText(speechToText);

        // Based on voice command, trigger the appropriate animation
        if (speechToText.includes("dance")) {
          setAnimation("Dance1");
        } else if (speechToText.includes("talk")) {
          setAnimation("Talking");
        } else if (speechToText.includes("stand")) {
          setAnimation("Standing");
        } else {
          console.log("Command not recognized.");
        }

        // Send the recognized text to the backend for TTS
        fetch('/api/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: speechToText }),
        })
          .then(response => response.blob())
          .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            audioRef.current.src = audioUrl;
            audioRef.current.play();
          })
          .catch(error => console.error('Error fetching audio:', error));
      };
    }
  }, [setAnimation]);

  const toggleListening = () => {
    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '10px', left: '10px', zIndex: 1000 }}>
      <button 
        className="voice-button" 
        onClick={toggleListening} 
        style={{ 
          padding: '10px', 
          backgroundColor: '#007BFF', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <div style={{ color: '#333', fontSize: '16px' }}>
        {recognizedText ? <p>Recognized Text: <strong>{recognizedText}</strong></p> : <p>No text recognized yet.</p>}
      </div>
    </div>
  );
};
