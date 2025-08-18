import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const AuthForm = ({ isRegister = false, onSubmit, onSwitch }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ username, email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                    <Input id="username" type="text" placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
            )}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <Button type="submit" fullWidth primary>
                {isRegister ? 'Create Account' : 'Log In'}
            </Button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button type="button" onClick={onSwitch} className="font-medium text-blue-600 hover:text-blue-500">
                    {isRegister ? 'Log In' : 'Sign Up'}
                </button>
            </p>
        </form>
    );
};

export default AuthForm;