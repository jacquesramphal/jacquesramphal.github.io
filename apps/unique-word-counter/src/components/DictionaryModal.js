import React from 'react';

const DictionaryModal = ({ 
  selectedWord, 
  isLoadingWord, 
  wordDetails, 
  closeDictionary, 
  handleWordClick 
}) => {
  if (!selectedWord) return null;

  return (
    <div className="dictionary-modal" onClick={(e) => {
      if (e.target.className === 'dictionary-modal') {
        closeDictionary();
      }
    }}>
      <div className="dictionary-content">
        {isLoadingWord ? (
          <div className="dictionary-loading">Loading definition...</div>
        ) : wordDetails?.error ? (
          <>
            <div className="dictionary-word">{selectedWord}</div>
            <div className="dictionary-error">{wordDetails.message}</div>
            <button className="close-dictionary" onClick={closeDictionary}>
              Close
            </button>
          </>
        ) : wordDetails && (
          <>
            <div className="dictionary-word">{wordDetails.word}</div>
            {wordDetails.phonetics?.length > 0 && (
              <div className="dictionary-phonetics">
                {wordDetails.phonetics.map((phonetic, index) => (
                  phonetic.text && (
                    <div key={index} className="dictionary-phonetic">
                      {phonetic.text}
                      {phonetic.audio && (
                        <button
                          className="audio-play"
                          onClick={() => {
                            const audio = new Audio(phonetic.audio);
                            audio.play();
                          }}
                        >
                          ▶
                        </button>
                      )}
                    </div>
                  )
                ))}
              </div>
            )}
            {wordDetails.meanings?.map((meaning, index) => (
              <div key={index} className="dictionary-section">
                <div className="dictionary-pos">
                  {meaning.partOfSpeech}
                  {meaning.synonyms?.length > 0 && (
                    <span className="pos-count">
                      {meaning.definitions.length} definition{meaning.definitions.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                {meaning.definitions?.map((def, defIndex) => (
                  <div key={defIndex} className="definition-wrapper">
                    <div className="dictionary-definition">
                      <span className="definition-number">{defIndex + 1}.</span>
                      <span className="definition-text">{def.definition}</span>
                    </div>
                    {def.example && (
                      <div className="dictionary-example">
                        "{def.example}"
                      </div>
                    )}
                    {def.synonyms?.length > 0 && (
                      <div className="definition-synonyms">
                        <span className="synonyms-label">Similar:</span>
                        {def.synonyms.slice(0, 5).map((syn, synIndex) => (
                          <span 
                            key={synIndex} 
                            className="dictionary-synonym"
                            onClick={() => handleWordClick(syn)}
                          >
                            {syn}
                          </span>
                        ))}
                      </div>
                    )}
                    {def.antonyms?.length > 0 && (
                      <div className="definition-antonyms">
                        <span className="antonyms-label">Opposite:</span>
                        {def.antonyms.slice(0, 5).map((ant, antIndex) => (
                          <span 
                            key={antIndex} 
                            className="dictionary-antonym"
                            onClick={() => handleWordClick(ant)}
                          >
                            {ant}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {meaning.synonyms?.length > 0 && (
                  <div className="meaning-synonyms">
                    <span className="synonyms-label">More similar words:</span>
                    <div className="dictionary-synonyms">
                      {meaning.synonyms.slice(0, 8).map((syn, synIndex) => (
                        <span 
                          key={synIndex} 
                          className="dictionary-synonym"
                          onClick={() => handleWordClick(syn)}
                        >
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {meaning.antonyms?.length > 0 && (
                  <div className="meaning-antonyms">
                    <span className="antonyms-label">More opposite words:</span>
                    <div className="dictionary-antonyms">
                      {meaning.antonyms.slice(0, 8).map((ant, antIndex) => (
                        <span 
                          key={antIndex} 
                          className="dictionary-antonym"
                          onClick={() => handleWordClick(ant)}
                        >
                          {ant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button className="close-dictionary" onClick={closeDictionary}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DictionaryModal;
