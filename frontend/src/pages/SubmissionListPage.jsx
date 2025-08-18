import React from 'react';
import { mockSubmissions } from '../data/mockData';
import Card from '../components/ui/Card';

const SubmissionListPage = () => (
    <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Submissions</h1>
        <Card>
            <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Problem</th>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Runtime</th>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Submitted At</th>
                        </tr>
                    </thead>
                     <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {mockSubmissions.map(sub => (
                             <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="p-4 text-gray-900 dark:text-white font-medium">{sub.problem}</td>
                                <td className={`p-4 font-semibold ${sub.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>{sub.status}</td>
                                <td className="p-4 text-gray-700 dark:text-gray-300">{sub.runtime}</td>
                                <td className="p-4 text-gray-700 dark:text-gray-300">{sub.submittedAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

export default SubmissionListPage;
