# Unique Word Counter

A fun and challenging word game where you enter unique words against the clock or practice specific parts of speech!

## Features

### Basic Gameplay
- Type unique English words and see your count increase
- Each word is validated against a dictionary
- Duplicate or invalid words will shake the counter
- Celebrate each valid word with confetti and sound effects!

### Timer Mode
- Race against the clock to find as many words as possible
- Choose from different time limits (30s to 5m)
- View detailed stats when time runs out:
  - Words per minute
  - Average time between words
  - Fastest and slowest gaps

### Word Type Mode
- Practice specific parts of speech:
  - Nouns (e.g., cat, house, happiness)
  - Verbs (e.g., run, jump, think)
  - Adjectives (e.g., happy, tall, blue)
  - Adverbs (e.g., quickly, well, often)
- Two validation modes:
  - Strict Mode: Only accepts words that are primarily of the selected type
  - Non-strict Mode: Accepts any word that can be used as the selected type
- Combine with Timer Mode for an extra challenge!

### Interactive Dictionary
- Click any word in your history to explore its meaning
- View comprehensive word information:
  - Multiple definitions across different parts of speech
  - Pronunciation guides with audio (when available)
  - Usage examples in context
  - Related words (synonyms and antonyms)
- Click on related words to explore their meanings
- Perfect for vocabulary building and word discovery

## Getting Started

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) to play

## How to Play

1. Choose your game mode:
   - Timer Mode for speed challenges
   - Word Type Mode for practicing specific parts of speech
   - Both for an extra challenge!
2. Type a word and press Enter
3. Each word must be:
   - A valid English word
   - Not previously used in the current game
   - Match the selected word type (if Word Type Mode is enabled)
4. Watch your score increase and enjoy the celebrations!

## Technologies Used

- React
- Dictionary API for word validation
- Canvas Confetti for celebrations
- Howler.js for sound effects
