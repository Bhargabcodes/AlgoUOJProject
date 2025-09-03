OnlineJudge

It is a full-stack web application that simulates a competitive programming environment. It provides a platform for users to solve algorithmic challenges by writing and submitting code directly in the browser.

Key Features:
Secure User Authentication: Users can create an account and log in using a secure system based on JSON Web Tokens (JWT).
Dynamic Problem Management: The platform allows administrators to add new programming problems, complete with detailed statements, starter code, and multiple hidden test cases with specific time limits.
Real-time Code Judging: Submitted code is automatically compiled and executed against a suite of test cases. The user receives instant, detailed feedback on their submission's performance, including which test cases passed or failed.

Advanced Verdicts: The judging system can produce a range of verdicts, including:

✅ Accepted: All test cases passed within the time limit.

❌ Wrong Answer: The code produced incorrect output for a test case.

⏳ Time Limit Exceeded: The code took too long to execute.

💥 Compilation & Runtime Errors: The system catches and reports syntax or execution errors.

Submission History: Logged-in users can view a list of all their past submissions, showing the problem, verdict, and date.

Technical Architecture:

The project is built on a robust microservice architecture to ensure security and scalability:
React Frontend: A modern, responsive user interface built with React, Vite, and Tailwind CSS.
Main Backend (Node.js/Express): A central API server that handles user authentication, manages the MongoDB database for problems and submissions, and orchestrates the code judging process.
Compiler Service (Node.js + Docker): A completely isolated service running in a Docker container. Its sole purpose is to receive C++ code, compile it with g++, and execute it in a secure sandbox, preventing any potential harm to the main server.
