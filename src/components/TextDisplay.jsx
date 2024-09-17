import React, { useState, useEffect } from 'react';

const TextDisplay = ({ setAnimation }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  // Function to get a male voice
  const getMaleVoice = () => {
    const voices = speechSynthesis.getVoices();
    return voices.find(voice => voice.name.includes('Male') || voice.name.includes('Google US Male')) || voices[0]; // Default to first available voice if no male voice found
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      setResponse(data.text);

      // Trigger the "talking" animation
      setAnimation("Talking");

      // Generate speech from the response text
      const utterance = new SpeechSynthesisUtterance(data.text);
      const maleVoice = getMaleVoice();
      utterance.voice = maleVoice;
      utterance.pitch = 1; // Adjust pitch if necessary
      utterance.rate = 1;  // Adjust rate if necessary

      // Prevent overlapping speech
      window.speechSynthesis.cancel(); // Stop any ongoing speech synthesis
      window.speechSynthesis.speak(utterance);

      // Reset animation after speech synthesis ends
      utterance.onend = () => {
        setAnimation("Standing");
      };

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Ensure voices are loaded
    window.speechSynthesis.onvoiceschanged = () => {
      getMaleVoice(); // Update the voice list
    };
  }, []);

  return (
    <div
      style={{
        padding: '20px',
        position: 'fixed', // Fixed position to float
        bottom: '20px',
        right: '20px',
        width: '300px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        borderRadius: '10px', // Smooth rounded corners
        backdropFilter: 'blur(10px)', // Blur the background behind
        zIndex: 1000, // Ensure it's above other elements
      }}
    >
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        style={{
          padding: '10px',
          width: 'calc(100% - 22px)',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: '10px',
          width: '100%',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Ask
      </button>
      <div
        style={{
          marginTop: '20px',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default TextDisplay;
