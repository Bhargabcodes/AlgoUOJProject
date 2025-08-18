import React from 'react';
import { mockLeaderboard } from '../data/mockData';
import Card from '../components/ui/Card';

const LeaderboardPage = () => (
    <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Global Leaderboard</h1>
        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Rank</th>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">User</th>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Score</th>
                            <th className="p-4 font-semibold text-gray-600 dark:text-gray-300">Penalty</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {mockLeaderboard.map(entry => (
                            <tr key={entry.rank} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="p-4 text-gray-900 dark:text-white font-bold text-lg">{entry.rank}</td>
                                <td className="p-4 text-gray-900 dark:text-white font-medium">{entry.user}</td>
                                <td className="p-4 text-blue-600 dark:text-blue-400 font-semibold">{entry.score}</td>
                                <td className="p-4 text-gray-700 dark:text-gray-300">{entry.penalty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
);

export default LeaderboardPage;
