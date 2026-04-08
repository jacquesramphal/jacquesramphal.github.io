import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import './App.css';

// Components
import CustomSelect from './components/CustomSelect';
import Accordion from './components/Accordion';
import WordInput from './components/WordInput';
import WordHistory from './components/WordHistory';
import Header from './components/Header';
import InfoModal from './components/InfoModal';
import DictionaryModal from './components/DictionaryModal';
import Settings from './components/Settings';

// Hooks
import useWordValidation from './hooks/useWordValidation';
import useConfetti from './hooks/useConfetti';

// Sound effects
const successSound = new Howl({
  src: ['/success.mp3'],
  volume: 0.5
});

// Common words that might not be in the API
const commonWords = new Set([
  'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',  // Common forms of "to be"
  'a', 'an', 'the',  // Articles
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',  // Common prepositions
  'and', 'or', 'but', 'nor', 'yet', 'so',  // Common conjunctions
  'i', 'you', 'he', 'she', 'it', 'we', 'they',  // Common pronouns
]);

function App() {
  // State
  const [uniqueWords, setUniqueWords] = useState(new Set());
  const [wordHistory, setWordHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [devMode, setDevMode] = useState(false);
  const [timerMode, setTimerMode] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [showStats, setShowStats] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [gameStats, setGameStats] = useState({
    totalWords: 0,
    invalidWords: { repeat: 0, invalid: 0 },
    timeGaps: [],
    startTime: null,
    endTime: null,
    duration: 60
  });
  const [wordTypeMode, setWordTypeMode] = useState(false);
  const [selectedWordType, setSelectedWordType] = useState('noun');
  const [strictMode, setStrictMode] = useState(true);
  const [activeRules, setActiveRules] = useState({
    type: false,
    length: false,
    letter: false
  });
  const [ruleLimits, setRuleLimits] = useState({
    type: { value: 'noun', strict: true },
    length: { min: 3, max: 10 },
    letter: { value: 'a' }
  });
  const [showWordHistory, setShowWordHistory] = useState(true);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordDetails, setWordDetails] = useState(null);
  const [isLoadingWord, setIsLoadingWord] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  // Refs
  const counterRef = useRef(null);
  const inputRef = useRef(null);
  const validWordsCache = useRef(new Set());
  const invalidWordsCache = useRef(new Set());

  // Custom hooks
  const { validateWord } = useWordValidation(
    wordTypeMode,
    selectedWordType,
    strictMode,
    activeRules,
    ruleLimits,
    validWordsCache,
    invalidWordsCache,
    commonWords
  );
  const { triggerConfetti } = useConfetti();

  // Check if we're in development environment
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  // Options
  const timerOptions = [
    { label: '30s', value: 30 },
    { label: '60s', value: 60 },
    { label: '2m', value: 120 },
    { label: '3m', value: 180 },
    { label: '5m', value: 300 }
  ];

  const wordTypeOptions = [
    { label: 'Nouns', value: 'noun' },
    { label: 'Verbs', value: 'verb' },
    { label: 'Adjectives', value: 'adjective' },
    { label: 'Adverbs', value: 'adverb' }
  ];

  // Game functions
  const startGame = () => {
    setUniqueWords(new Set());
    setWordHistory([]);
    setGameStats({
      totalWords: 0,
      invalidWords: { repeat: 0, invalid: 0 },
      timeGaps: [],
      startTime: Date.now(),
      endTime: null,
      duration: selectedDuration
    });
    setTimeRemaining(selectedDuration);
    setIsTimerActive(true);
    setGameEnded(false);
  };

  const endGame = () => {
    setIsTimerActive(false);
    setGameStats(prev => ({
      ...prev,
      endTime: Date.now(),
      totalWords: uniqueWords.size,
      timeGaps: calculateTimeGaps(wordHistory)
    }));
    setShowStats(true);
  };

  const resetGame = () => {
    setUniqueWords(new Set());
    setWordHistory([]);
    setGameStats({
      totalWords: 0,
      invalidWords: { repeat: 0, invalid: 0 },
      timeGaps: [],
      startTime: null,
      endTime: null,
      duration: 60
    });
    setInputValue('');
    setShowStats(false);
    setIsTimerActive(false);
    setTimeRemaining(selectedDuration);
  };

  const handleEndGame = () => {
    if (!isTimerActive || gameEnded) return;
    setShowStats(true);
    setGameEnded(true);
    setIsTimerActive(false);
  };

  // Word handling
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isTimerActive && timerMode) return;
      if (isValidating) return;
      
      const word = inputValue.trim().toLowerCase();
      if (!word) return;

      if (uniqueWords.has(word)) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setGameStats(prev => ({
          ...prev,
          invalidWords: {
            ...prev.invalidWords,
            repeat: prev.invalidWords.repeat + 1
          }
        }));
      } else {
        setIsValidating(true);
        const isValid = devMode || await validateWord(word);
        setIsValidating(false);

        if (isValid) {
          const now = new Date();
          const timeStr = now.toLocaleTimeString('en-US', { 
            hour: 'numeric',
            minute: '2-digit',
            hour12: true 
          });
          
          setUniqueWords(prev => new Set([...prev, word]));
          setWordHistory(prev => [{ word, timestamp: timeStr }, ...prev]);
          successSound.play();
          triggerConfetti(uniqueWords.size + 1);
        } else {
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
          setGameStats(prev => ({
            ...prev,
            invalidWords: {
              ...prev.invalidWords,
              invalid: prev.invalidWords.invalid + 1
            }
          }));
        }
      }
      setInputValue('');
    }
  };

  // Dictionary handling
  const handleWordClick = async (word) => {
    setSelectedWord(word);
    setIsLoadingWord(true);
    setWordDetails(null);
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      
      if (response.ok) {
        setWordDetails(data[0]);
      } else {
        setWordDetails({ error: true, message: "No definition found" });
      }
    } catch (error) {
      setWordDetails({ error: true, message: "Failed to fetch definition" });
    } finally {
      setIsLoadingWord(false);
    }
  };

  const closeDictionary = () => {
    setSelectedWord(null);
    setWordDetails(null);
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endGame();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  // Stats calculation
  const calculateTimeGaps = (history) => {
    if (history.length <= 1) return [];
    const chronologicalHistory = [...history].reverse();
    return chronologicalHistory.slice(0, -1).map((word, i) => {
      const currentTime = new Date(word.timestamp).getTime();
      const nextTime = new Date(chronologicalHistory[i + 1].timestamp).getTime();
      return nextTime - currentTime;
    });
  };

  return (
    <div className={`app ${isSettingsOpen ? 'settings-open' : ''}`}>
      <div className="app-content">
        <Header 
          counterRef={counterRef}
          isShaking={isShaking}
          uniqueWordsSize={uniqueWords.size}
          isTimerActive={isTimerActive}
          gameEnded={gameEnded}
          handleEndGame={handleEndGame}
          timeRemaining={timeRemaining}
        />

        <main className="main">
          <WordInput 
            inputRef={inputRef}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleKeyPress={handleKeyPress}
            isValidating={isValidating}
            timerMode={timerMode}
            isTimerActive={isTimerActive}
            wordTypeMode={wordTypeMode}
            selectedWordType={selectedWordType}
          />

          <WordHistory 
            showWordHistory={showWordHistory}
            setShowWordHistory={setShowWordHistory}
            wordHistory={wordHistory}
            handleWordClick={handleWordClick}
          />
        </main>

        <button 
          className="settings-button" 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          aria-label={isSettingsOpen ? "Close settings" : "Open settings"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 001.82-.33 1.65 1.65 0 001-1.51H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>

        <button 
          className="info-button" 
          onClick={() => setIsInfoOpen(true)}
          aria-label="Show information"
        >
          i
        </button>
      </div>

      <Settings 
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        timerMode={timerMode}
        setTimerMode={setTimerMode}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        timerOptions={timerOptions}
        wordTypeMode={wordTypeMode}
        setWordTypeMode={setWordTypeMode}
        selectedWordType={selectedWordType}
        setSelectedWordType={setSelectedWordType}
        wordTypeOptions={wordTypeOptions}
        strictMode={strictMode}
        setStrictMode={setStrictMode}
        activeRules={activeRules}
        setActiveRules={setActiveRules}
        ruleLimits={ruleLimits}
        setRuleLimits={setRuleLimits}
        resetGame={resetGame}
        validWordsCache={validWordsCache}
        invalidWordsCache={invalidWordsCache}
        isDev={isDev}
        devMode={devMode}
        setDevMode={setDevMode}
        startGame={startGame}
        setIsTimerActive={setIsTimerActive}
        setShowStats={setShowStats}
      />

      <InfoModal 
        showInfoModal={isInfoOpen}
        setShowInfoModal={setIsInfoOpen}
      />

      <DictionaryModal 
        selectedWord={selectedWord}
        isLoadingWord={isLoadingWord}
        wordDetails={wordDetails}
        closeDictionary={closeDictionary}
        handleWordClick={handleWordClick}
      />
    </div>
  );
}

export default App;
