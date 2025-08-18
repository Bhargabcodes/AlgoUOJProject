import React from 'react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-[1.02] ${className}`}>
    {children}
  </div>
);

export default Card;