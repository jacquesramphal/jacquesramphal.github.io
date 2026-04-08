import React from 'react';

const Header = ({ 
  counterRef, 
  isShaking, 
  uniqueWordsSize, 
  isTimerActive, 
  gameEnded, 
  handleEndGame, 
  timeRemaining 
}) => {
  return (
    <header className="header">
      <div 
        ref={counterRef}
        className={`word-count ${isShaking ? 'shake' : ''}`}
      >
        <span>{uniqueWordsSize}</span>
        <span className="back">{uniqueWordsSize}</span>
      </div>
      <p className="subtitle">unique words found</p>
      {isTimerActive && !gameEnded && (
        <button className="end-game-button" onClick={handleEndGame}>
          End Game
        </button>
      )}
      {isTimerActive && (
        <div className="timer">
          {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
        </div>
      )}
    </header>
  );
};

export default Header;
