const problems = [
  { 
    id: 1, 
    title: 'Two Sum', 
    // ... other problem data
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
    // ... other problem data
    testCases: [
        { 
            input: `3\n121\n-121\n10`, 
            expectedOutput: `True\nFalse\nFalse` 
        }
    ]
  },
];

module.exports = { problems };