import React, { useState } from 'react';
import axios from 'axios';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

const AddProblemPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        statement: '',
        difficulty: 'Easy',
        tags: '',
        defaultCode: '',
        testCases: [{ input: '', expectedOutput: '' }],
    });
    const [status, setStatus] = useState({ message: '', isError: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTestCaseChange = (index, e) => {
        const newTestCases = [...formData.testCases];
        newTestCases[index][e.target.name] = e.target.value;
        setFormData({ ...formData, testCases: newTestCases });
    };

    const addTestCase = () => {
        setFormData({
            ...formData,
            testCases: [...formData.testCases, { input: '', expectedOutput: '' }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: 'Submitting...', isError: false });
        try {
            // Convert tags from a comma-separated string to an array
            const payload = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            };
            const { data } = await API.post('/problems', payload);
            setStatus({ message: `Successfully created problem: "${data.title}"`, isError: false });
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'An unexpected error occurred.';
            setStatus({ message: errorMessage, isError: true });
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Create New Problem</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title, Difficulty, Tags */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                        <Input name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty</label>
                        <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
                        <Input name="tags" value={formData.tags} onChange={handleChange} />
                    </div>
                </div>

                {/* Statement and Default Code */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Problem Statement (Markdown supported)</label>
                    <textarea name="statement" rows="6" value={formData.statement} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Code Snippet</label>
                    <textarea name="defaultCode" rows="8" value={formData.defaultCode} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md font-mono dark:bg-gray-700 dark:border-gray-600" />
                </div>

                {/* Test Cases */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Test Cases</h3>
                    {formData.testCases.map((tc, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-4 border rounded-md dark:border-gray-700">
                            <div>
                                <label className="block text-sm font-medium">Input (stdin)</label>
                                <textarea name="input" rows="3" value={tc.input} onChange={(e) => handleTestCaseChange(index, e)} className="w-full mt-1 p-2 border rounded-md font-mono dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Expected Output (stdout)</label>
                                <textarea name="expectedOutput" rows="3" value={tc.expectedOutput} onChange={(e) => handleTestCaseChange(index, e)} className="w-full mt-1 p-2 border rounded-md font-mono dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                        </div>
                    ))}
                    <Button type="button" onClick={addTestCase} className="mt-2">Add Test Case</Button>
                </div>

                {/* Submit Button & Status */}
                <div>
                    <Button type="submit" primary>Create Problem</Button>
                    {status.message && (
                        <p className={`mt-4 text-sm ${status.isError ? 'text-red-500' : 'text-green-500'}`}>
                            {status.message}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddProblemPage;

