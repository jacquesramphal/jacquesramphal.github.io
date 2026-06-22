import React from 'react';

const Accordion = ({ title, children, isOpen, onToggle, enabled, onToggleEnabled }) => {
  const handleEnableClick = (e) => {
    e.stopPropagation();
    onToggleEnabled(e);
  };

  return (
    <div className="accordion-section">
      <div className="accordion-header" onClick={onToggle}>
        <div className="accordion-title">
          <h3>{title}</h3>
          <label className="toggle-switch" onClick={handleEnableClick}>
            <input
              type="checkbox"
              checked={enabled}
              onChange={handleEnableClick}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <svg 
          className={`accordion-icon ${isOpen ? 'open' : ''}`}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <div className={`accordion-content-inner ${enabled ? '' : 'disabled'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
