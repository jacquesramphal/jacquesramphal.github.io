import React, { useState, useEffect, useRef } from 'react';

const CustomSelect = ({ value, options, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange({ target: { value: option.value } });
    setIsOpen(false);
  };

  const currentOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="custom-select" ref={selectRef}>
      <div 
        className={`select-selected ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{currentOption.label}</span>
        <svg 
          className={`select-arrow ${isOpen ? 'open' : ''}`}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
      {isOpen && !disabled && (
        <div className="select-options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-option ${option.value === value ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
