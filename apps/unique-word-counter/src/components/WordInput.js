import React from 'react';

const WordInput = ({ 
  inputRef, 
  inputValue, 
  setInputValue, 
  handleKeyPress, 
  handleInputFocus, 
  handleInputBlur, 
  isValidating, 
  timerMode, 
  isTimerActive, 
  wordTypeMode, 
  selectedWordType 
}) => {
  return (
    <textarea
      ref={inputRef}
      className="word-input"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={handleKeyPress}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      placeholder={
        isValidating 
          ? "Checking word..." 
          : (timerMode && !isTimerActive 
            ? "Start the timer to play!" 
            : `Type a ${wordTypeMode ? selectedWordType : 'word'} and press Enter...`)
      }
      style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
        opacity: (timerMode && !isTimerActive) || isValidating ? 0.5 : 1
      }}
      disabled={timerMode && !isTimerActive || isValidating}
    />
  );
};

export default WordInput;
