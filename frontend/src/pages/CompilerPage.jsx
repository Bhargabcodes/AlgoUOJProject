import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import Button from '../components/ui/Button';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

const CompilerPage = ({ problem }) => {
    const [code, setCode] = useState('');
    const [submissionResult, setSubmissionResult] = useState(null); // <-- NEW: State for the full result object
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Problem data received:", problem);
        if (problem) {
            setCode(problem.defaultCode);
        } else {
            setCode('// Select a problem from the list to get started!');
        }
        setSubmissionResult(null); // Clear previous results
    }, [problem]);

    const handleSubmit = async () => {
        setIsLoading(true);
        setSubmissionResult(null);
        if (!problem) {
            console.error("No problem selected.");
            return; // #TODO: 
        }
        try {
            const { data } = await API.post('/submissions/answer', {
                language: 'cpp',
                code,
                problemId: problem._id,
            });
            setSubmissionResult(data); // Store the entire submission object
        } catch (err) {
            const errorText = err.response?.data?.error || 'An unexpected error occurred.';
            setSubmissionResult({ status: 'Error', output: errorText });
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to determine the color of the status message
    const getStatusColor = (status) => {
        if (status.includes('Accepted')) return 'text-green-400';
        if (status.includes('Error')) return 'text-red-400';
        return 'text-yellow-400'; // For Wrong Answer, Pending etc.
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-12rem)]">
            {/* Left Side: Problem Statement */}
            <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-4 rounded-lg overflow-y-auto">
                {problem ? (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{problem.title}</h2>
                        <div 
                            className="prose dark:prose-invert max-w-none" 
                            dangerouslySetInnerHTML={{ __html: problem.statement.replace(/\n/g, '<br />') }} 
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Please select a problem from the "Problems" page.</p>
                    </div>
                )}
            </div>

            {/* Right Side: Editor and Output */}
            <div className="w-full lg:w-1/2 flex flex-col gap-2">
                {/* Editor */}
                <div className="flex-grow border rounded-lg overflow-hidden border-gray-300 dark:border-gray-700">
                    <Editor
                        height="100%"
                        language="cpp"
                        theme="vs-dark"
                        value={code}
                        onChange={(value) => setCode(value)}
                        options={{ fontSize: 14, minimap: { enabled: false } }}
                    />
                </div>

                {/* Button and Output Area */}
                <div className="flex-shrink-0 h-1/3 flex flex-col">
                     <div className="mb-2">
                        <Button onClick={handleSubmit} disabled={isLoading || !problem} primary>
                            {isLoading ? 'Submitting...' : 'Submit Code'}
                        </Button>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm flex-grow whitespace-pre-wrap overflow-y-auto">
                        {isLoading && <p>Running Test Cases...</p>}
                        {submissionResult && (
                            <div>
                                <p className={`font-bold text-lg ${getStatusColor(submissionResult.status)}`}>
                                    {submissionResult.status}
                                </p>
                                <pre className="text-white mt-2">{submissionResult.output}</pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompilerPage;
