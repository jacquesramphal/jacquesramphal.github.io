import { useCallback } from 'react';

const useWordValidation = (
  wordTypeMode,
  selectedWordType,
  strictMode,
  activeRules,
  ruleLimits,
  validWordsCache,
  invalidWordsCache,
  commonWords
) => {
  const validateWordWithRules = useCallback((word) => {
    const lowercaseWord = word.toLowerCase();

    // Length rule check
    if (activeRules.length) {
      const { min, max } = ruleLimits.length;
      if (word.length < min || word.length > max) {
        console.log(`Word rejected: length ${word.length} not within limits ${min}-${max}`);
        return false;
      }
    }

    // Starting letter rule check
    if (activeRules.letter) {
      const targetLetter = ruleLimits.letter.value;
      if (lowercaseWord[0] !== targetLetter) {
        console.log(`Word rejected: doesn't start with '${targetLetter}'`);
        return false;
      }
    }

    return true;
  }, [activeRules, ruleLimits]);

  const validateWord = useCallback(async (word) => {
    const lowercaseWord = word.toLowerCase();

    // Check minimum length (2 characters)
    if (lowercaseWord.length < 2) {
      console.log('Word rejected: too short (minimum 2 characters)');
      return false;
    }

    // Apply game rule validations first
    if (!validateWordWithRules(lowercaseWord)) {
      return false;
    }

    // Check caches first
    if (validWordsCache.current.has(lowercaseWord)) return true;
    if (invalidWordsCache.current.has(lowercaseWord)) return false;

    // Check common words list
    if (commonWords.has(lowercaseWord)) {
      console.log('Word accepted from common words list:', lowercaseWord);
      validWordsCache.current.add(lowercaseWord);
      return true;
    }

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${lowercaseWord}`);
      console.log('API Response status:', response.status, 'for word:', lowercaseWord);
      
      if (!response.ok) {
        console.log('API rejected word:', lowercaseWord);
        invalidWordsCache.current.add(lowercaseWord);
        return false;
      }

      const data = await response.json();
      console.log('API Response data for', lowercaseWord, ':', data);

      if (Array.isArray(data) && data.length > 0) {
        // If word type mode is active, check if the word matches the selected type
        if (wordTypeMode) {
          // In strict mode, the word must be primarily of the selected type
          if (strictMode) {
            // Count occurrences of each part of speech
            const partsOfSpeech = data.map(entry => 
              entry.meanings.map(m => m.partOfSpeech)
            ).flat();
            
            const typeCount = partsOfSpeech.reduce((acc, type) => {
              acc[type] = (acc[type] || 0) + 1;
              return acc;
            }, {});
            console.log('Type counts:', typeCount);

            // Check if selected type is the most common
            const selectedTypeCount = typeCount[selectedWordType] || 0;
            const isMainType = selectedTypeCount > 0 && 
              Object.entries(typeCount).every(([type, count]) => 
                type === selectedWordType || count <= selectedTypeCount
              );

            console.log('Selected type count:', selectedTypeCount);
            console.log('Is main type:', isMainType);

            if (!isMainType) {
              console.log('Word rejected (strict mode):', lowercaseWord, 'is not primarily a:', selectedWordType);
              invalidWordsCache.current.add(lowercaseWord);
              return false;
            }
          } else {
            // In non-strict mode, the word must have at least one meaning of the selected type
            const hasMatchingWordType = data.some(entry => 
              entry.meanings.some(meaning => {
                const matches = meaning.partOfSpeech === selectedWordType;
                console.log(`Checking ${meaning.partOfSpeech} against ${selectedWordType}: ${matches}`);
                return matches;
              })
            );

            if (!hasMatchingWordType) {
              console.log('Word rejected:', lowercaseWord, 'does not match type:', selectedWordType);
              invalidWordsCache.current.add(lowercaseWord);
              return false;
            }
          }
        }
        validWordsCache.current.add(lowercaseWord);
        return true;
      }

      console.log('API response format invalid for word:', lowercaseWord);
      invalidWordsCache.current.add(lowercaseWord);
      return false;
    } catch (error) {
      console.error('Error validating word:', error);
      return false;
    }
  }, [wordTypeMode, selectedWordType, strictMode, validateWordWithRules, commonWords]);

  return { validateWord };
};

export default useWordValidation;
