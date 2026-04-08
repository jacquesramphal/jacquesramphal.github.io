import React from 'react';

const WordHistory = ({ 
  showWordHistory, 
  setShowWordHistory, 
  wordHistory, 
  handleWordClick 
}) => {
  return (
    <div className="word-history">
      <div className="word-history-toggle">
        <label className="setting-toggle">
          <span>Word History</span>
          <input
            type="checkbox"
            checked={showWordHistory}
            onChange={(e) => setShowWordHistory(e.target.checked)}
          />
          <div className="toggle-switch" />
        </label>
      </div>
      <div className={`word-history-content ${!showWordHistory ? 'hidden' : ''}`}>
        <ul className="word-list">
          {wordHistory.map((entry, index) => (
            <li 
              key={index} 
              className="word-entry"
              onClick={() => handleWordClick(entry.word)}
            >
              <span className="word">{entry.word}</span>
              <span className="timestamp">{entry.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordHistory;
