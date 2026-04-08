import React from 'react';

const InfoModal = ({ showInfoModal, setShowInfoModal }) => {
  if (!showInfoModal) return null;

  return (
    <div className="info-modal" onClick={(e) => {
      if (e.target.classList.contains('info-modal')) {
        setShowInfoModal(false);
      }
    }}>
      <div className="info-content">
        <h2>How to Play</h2>
        <p>Welcome to the Unique Word Counter! This game challenges you to come up with as many unique words as possible.</p>
        
        <h3>Game Modes</h3>
        <ul>
          <li><strong>Timer Mode:</strong> Race against the clock to enter as many words as you can.</li>
          <li><strong>Strict Mode:</strong> Words must follow specific rules (e.g., start with a certain letter, minimum length).</li>
        </ul>

        <h3>Word History & Dictionary</h3>
        <p>Click on any word in your history to explore its meaning! Each word entry opens a detailed dictionary view showing:</p>
        <ul>
          <li>Multiple definitions and parts of speech</li>
          <li>Usage examples and pronunciation guides</li>
          <li>Related words (synonyms and antonyms) that you can also explore</li>
        </ul>
        <p>Use this feature to discover new meanings and expand your vocabulary as you play!</p>

        <h3>Rules</h3>
        <ul>
          <li>Each word must be unique</li>
          <li>Words are not case sensitive</li>
          <li>Numbers and special characters are not allowed</li>
          <li>Minimum word length is 2 characters</li>
        </ul>

        <button className="close-info" onClick={() => setShowInfoModal(false)}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
