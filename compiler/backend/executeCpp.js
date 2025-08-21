const { exec, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, input,timeLimit=2000) => {
  const jobId = path.basename(filepath).split('.')[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);

  return new Promise((resolve, reject) => {
    // Step 1: Compile the C++ code using 'exec'. It's simple and effective for this.
    exec(`g++ "${filepath}" -o "${outPath}"`, (compileError, stdout, stderr) => {
      // If there's a compilation error, reject the promise immediately.
      if (compileError) {
        return reject({ error: stderr, errorType: 'compilation' });
      }
      // If there are compilation warnings, log them but continue.
      if (stderr) {
        console.warn(`Compilation warnings: ${stderr}`);
      }

      // Step 2: If compilation succeeds, run the executable using 'spawn'.
      // 'spawn' is better for handling streams (stdin, stdout).
            const startTime = process.hrtime();
      const childProcess = spawn(`"${outPath}"`, { shell: true });

      // Set a timeout to kill the process if it runs for too long (e.g., 5 seconds).
      const timer = setTimeout(() => {
        childProcess.kill();
        reject({ 
          error: new Error("Time Limit Exceeded"), 
          stderr: "Your code took too long to execute and was terminated." 
        });
      },timeLimit);

      let output = '';
      let errorOutput = '';

      // Send the provided input to the running program.
      childProcess.stdin.write(input);
      childProcess.stdin.end();

      // Collect the program's standard output.
      childProcess.stdout.on('data', (data) => {output += data.toString();});

      // Collect the program's standard error output.
      childProcess.stderr.on('data', (data) => {errorOutput += data.toString();});

      // Handle the process finishing.
      childProcess.on('close', (code) => {
        // IMPORTANT: Clear the timeout timer once the process is done.
        clearTimeout(timer);
         const endTime = process.hrtime(startTime);
       const executionTime = (endTime[0] * 1000 + endTime[1] / 1000000).toFixed(2); // Convert to milliseconds
        if (code !== 0) {
          // If the process exits with an error code, it's a runtime error.
          return reject({ 
            error: new Error(`Process exited with code ${code}`), 
            stderr: errorOutput 
          });
        }
        // If the process exits cleanly, resolve with the collected output.
        resolve(output);
      });

      // Handle errors related to the spawn process itself (e.g., file not found).
      childProcess.on('error', (spawnError) => {
        clearTimeout(timer);
      
        reject({ error: spawnError });
      });
    });
  });
};

module.exports = { executeCpp };

