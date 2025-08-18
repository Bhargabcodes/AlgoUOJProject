import React from 'react';

// Add 'name' to the list of props
const Input = ({ id, type, placeholder, value, onChange, name, required }) => (
    <input
        id={id}
        name={name} // Pass the name prop to the input element
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required} // Pass the required prop
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    />
);

export default Input;