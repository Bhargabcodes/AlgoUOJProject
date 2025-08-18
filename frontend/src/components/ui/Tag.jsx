import React from 'react';

const Tag = ({ text, color }) => {
    const colorClasses = {
        Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[color] || colorClasses.default}`}>{text}</span>;
};

export default Tag;
