// src/data/mockData.js

export const mockProblems = [
  { 
    id: 1, 
    title: 'Two Sum', 
    difficulty: 'Easy', 
    tags: ['Array', 'Hash Table'],
    statement: `
Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have **exactly one solution**, and you may not use the *same* element twice.

You can return the answer in any order.
    `,
    defaultCode: `#include <iostream>\n#include <vector>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        // Your code here\n        return {};\n    }\n};`,
    // --- UPDATED: Test cases consolidated into one block ---
    testCases: [
        { 
            input: `3\n4\n2 7 11 15\n9\n3\n3 2 4\n6\n2\n3 3\n6`, 
            expectedOutput: `[0, 1]\n[1, 2]\n[0, 1]` 
        }
    ]
  },
  { 
    id: 2, 
    title: 'Palindrome Number', 
    difficulty: 'Easy', 
    tags: ['Math'],
    statement: `
Given an integer \`x\`, return \`true\` if \`x\` is a palindrome, and \`false\` otherwise.
    `,
    defaultCode: `#include <iostream>\n\nclass Solution {\npublic:\n    bool isPalindrome(int x) {\n        // Your code here\n        return false;\n    }\n};`,
    // --- UPDATED: Test cases consolidated into one block ---
    testCases: [
        { 
            input: `3\n121\n-121\n10`, 
            expectedOutput: `True\nFalse\nFalse` 
        }
    ]
  },
];

export const mockSubmissions = [
    { id: 1, problem: 'Two Sum', status: 'Accepted', runtime: '88ms', submittedAt: '2024-07-16 10:00 AM' },
    { id: 2, problem: 'Add Two Numbers', status: 'Wrong Answer', runtime: '120ms', submittedAt: '2024-07-16 09:45 AM' },
];

export const mockLeaderboard = [
    { rank: 1, user: 'CodeMaster', score: 2500, penalty: 120 },
    { rank: 2, user: 'AlgoQueen', score: 2450, penalty: 110 },
];