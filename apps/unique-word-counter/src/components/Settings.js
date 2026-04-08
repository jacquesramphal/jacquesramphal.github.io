import React from 'react';
import CustomSelect from './CustomSelect';

const Settings = ({ 
  isSettingsOpen,
  setIsSettingsOpen,
  timerMode,
  setTimerMode,
  selectedDuration,
  setSelectedDuration,
  timerOptions,
  wordTypeMode,
  setWordTypeMode,
  selectedWordType,
  setSelectedWordType,
  wordTypeOptions,
  strictMode,
  setStrictMode,
  activeRules,
  setActiveRules,
  ruleLimits,
  setRuleLimits,
  resetGame,
  validWordsCache,
  invalidWordsCache,
  isDev,
  devMode,
  setDevMode,
  startGame,
  setIsTimerActive,
  setShowStats
}) => {
  return (
    <aside className={`settings-panel${isSettingsOpen ? ' open' : ''}`}>
      <button 
        className="settings-close" 
        onClick={() => setIsSettingsOpen(false)}
        aria-label="Close settings"
      >
        ×
      </button>
      
      <h2>Game Settings</h2>

      <div className="settings-stack">
        <div className="setting-item">
          <div className="setting-header">
            <label className="setting-toggle">
              <span>Timer Mode</span>
              <input
                type="checkbox"
                checked={timerMode}
                onChange={(e) => {
                  setTimerMode(e.target.checked);
                  if (!e.target.checked) {
                    setIsTimerActive(false);
                    setShowStats(false);
                  }
                }}
              />
              <div className="toggle-switch" />
            </label>
          </div>
          {timerMode && (
            <div className="setting-details">
              <CustomSelect
                value={selectedDuration}
                options={timerOptions}
                onChange={(e) => setSelectedDuration(Number(e.target.value))}
              />
            </div>
          )}
        </div>

        <div className="setting-item">
          <div className="setting-header">
            <label className="setting-toggle">
              <span>Word Type Mode</span>
              <input
                type="checkbox"
                checked={wordTypeMode}
                onChange={(e) => {
                  setWordTypeMode(e.target.checked);
                  resetGame();
                  validWordsCache.current = new Set();
                  invalidWordsCache.current = new Set();
                }}
              />
              <div className="toggle-switch" />
            </label>
          </div>
          {wordTypeMode && (
            <div className="setting-details">
              <div className="settings-group">
                <CustomSelect
                  value={selectedWordType}
                  options={wordTypeOptions}
                  onChange={(e) => {
                    setSelectedWordType(e.target.value);
                    resetGame();
                    validWordsCache.current = new Set();
                    invalidWordsCache.current = new Set();
                  }}
                />
                <label className="setting-toggle">
                  <input
                    type="checkbox"
                    checked={strictMode}
                    onChange={(e) => {
                      setStrictMode(e.target.checked);
                      resetGame();
                      validWordsCache.current = new Set();
                      invalidWordsCache.current = new Set();
                    }}
                  />
                  <span>Strict Mode</span>
                  <div className="toggle-switch" />
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="setting-item">
          <div className="setting-header">
            <label className="setting-toggle">
              <span>Word Length Rule</span>
              <input
                type="checkbox"
                checked={activeRules.length}
                onChange={(e) => {
                  setActiveRules(prev => ({ ...prev, length: e.target.checked }));
                  resetGame();
                  validWordsCache.current = new Set();
                  invalidWordsCache.current = new Set();
                }}
              />
              <div className="toggle-switch" />
            </label>
          </div>
          {activeRules.length && (
            <div className="setting-details">
              <div className="length-controls">
                <input 
                  type="number" 
                  value={ruleLimits.length.min} 
                  onChange={(e) => {
                    setRuleLimits(prev => ({ ...prev, length: { ...prev.length, min: Number(e.target.value) } }));
                    resetGame();
                    validWordsCache.current = new Set();
                    invalidWordsCache.current = new Set();
                  }}
                />
                <span>to</span>
                <input 
                  type="number" 
                  value={ruleLimits.length.max} 
                  onChange={(e) => {
                    setRuleLimits(prev => ({ ...prev, length: { ...prev.length, max: Number(e.target.value) } }));
                    resetGame();
                    validWordsCache.current = new Set();
                    invalidWordsCache.current = new Set();
                  }}
                />
                <span>characters</span>
              </div>
            </div>
          )}
        </div>
        {isDev && (
          <section className="settings-section dev-section">
            <h3>Developer Options</h3>
            <label className="setting-toggle">
              <input
                type="checkbox"
                checked={devMode}
                onChange={(e) => setDevMode(e.target.checked)}
              />
              <span>Accept All Words</span>
              <div className="toggle-switch" />
            </label>
          </section>
        )}
        {timerMode && (
          <section className="settings-section">
            <h3>Start Game</h3>
            <button 
              className="timer-button"
              onClick={startGame}
            >
              Start Game
            </button>
          </section>
        )}
      </div>
    </aside>
  );
};

export default Settings;
