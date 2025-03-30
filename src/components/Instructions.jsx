// Instructions.jsx
import React from 'react';

const Instructions = ({ isContracted }) => {
  return (
    <div className="instructions">
      <p style={{ margin: '0' }}>
        {isContracted 
          ? 'Click anywhere to expand the cubes' 
          : 'Click anywhere to contract and see the full image'}
      </p>
    </div>
  );
};

export default Instructions;