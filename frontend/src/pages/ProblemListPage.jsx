//frontend\src\pages\ProblemListPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported
import Card from '../components/ui/Card';
import Tag from '../components/ui/Tag';
import Button from '../components/ui/Button';
import { PlusSquare } from 'lucide-react';

// Create an API instance for this component
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

const ProblemListPage = ({ onProblemSelect, onAddProblemClick }) => {
    // 1. State to hold the problems fetched from the API
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. useEffect to fetch problems when the component mounts
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);
                const { data } = await API.get('/problems/getAll');
                setProblems(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch problems:", err);
                setError("Could not load problems. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []); // The empty array [] means this runs only once when the component loads

    if (loading) {
        return <p>Loading problems...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Problem Set</h1>
                <Button onClick={onAddProblemClick} primary>
                    <PlusSquare className="w-5 h-5 mr-2" />
                    Add Your Question
                </Button>
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Title</th>
                                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Difficulty</th>
                                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Tags</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {/* 3. Map over the 'problems' state variable instead of mockProblems */}
                            {problems.map(problem => (
                                <tr
                                    key={problem._id} // Use _id from MongoDB
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                                    onClick={() => onProblemSelect(problem)}                                >
                                    <td className="p-4 text-blue-600 dark:text-blue-400 font-medium">{problem.title}</td>
                                    <td className="p-4"><Tag text={problem.difficulty} color={problem.difficulty} /></td>
                                    <td className="p-4 flex flex-wrap gap-2">
                                        {problem.tags.map(tag => <Tag key={tag} text={tag} />)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ProblemListPage;
