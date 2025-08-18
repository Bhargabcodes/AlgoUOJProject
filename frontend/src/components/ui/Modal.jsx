import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ show, onClose, title, children }) => {
    if (!show) {
        return null;
    }

    // This inline style is a more forceful way to ensure the modal
    // appears on top of all other content. The zIndex is set very high.
    const modalOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000, // High z-index to ensure it's on top
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    };

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;