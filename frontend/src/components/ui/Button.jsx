import React from 'react';

const Button = ({ children, onClick, type = 'button', fullWidth = false, primary = false }) => (
    <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 rounded-md font-semibold transition-colors
            ${fullWidth ? 'w-full' : ''}
            ${primary
                ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
    >
        {children}
    </button>
);

export default Button;
