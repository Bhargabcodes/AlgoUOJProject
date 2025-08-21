import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/ui/Card';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

const SubmissionListPage = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                setLoading(true);
                // Call the new GET /api/submissions endpoint
                const { data } = await API.get('/submissions');
                setSubmissions(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch submissions:", err);
                setError("Could not load submissions. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    const getStatusColor = (status) => {
        if (status.includes('Accepted')) return 'text-green-500';
        if (status.includes('Error')) return 'text-red-500';
        return 'text-yellow-400';
    };

    if (loading) return <p className="dark:text-white">Loading submissions...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Submissions</h1>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Problem</th>
                                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Submitted At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {submissions.length > 0 ? (
                                submissions.map(sub => (
                                    <tr key={sub._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="p-4 text-gray-900 dark:text-white font-medium">
                                            {/* Display the populated problem title */}
                                            {sub.problemId ? sub.problemId.title : 'Problem not found'}
                                        </td>
                                        <td className={`p-4 font-semibold ${getStatusColor(sub.status)}`}>
                                            {sub.status}
                                        </td>
                                        <td className="p-4 text-gray-700 dark:text-gray-300">
                                            {new Date(sub.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center text-gray-500">
                                        You haven't made any submissions yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default SubmissionListPage;
