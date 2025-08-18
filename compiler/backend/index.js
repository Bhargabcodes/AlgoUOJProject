const express = require("express");
const cors = require("cors");
const { generateFiles } = require("./generateFiles"); // Corrected import name
const { executeCpp } = require("./executeCpp");

const app = express();

app.use(cors());
app.use(express.json());

// This is the endpoint your main backend will call
app.post("/execute", async (req, res) => {
  const { language = "cpp", code, input } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided." });
  }

  try {
    // 1. Create a temporary file with the code
    const filePath = await generateFiles(language, code);

    // 2. Run the file and get the output
    const output = await executeCpp(filePath, input);

    // 3. Return a consistent success response
    return res.json({ output: output, error: null });

  } catch (err) {
    // 4. Return a consistent error response
    // Send back the specific compiler error (stderr) if it exists
    const errorMsg = err.stderr || err.message || "An unknown error occurred during execution.";
    return res.status(200).json({ output: null, error: errorMsg }); 
    // Note: Sending 200 OK even for errors, as the API call itself succeeded.
    // The error is in the code execution, which is part of the response body.
  }
});

// This service must run on a different port from your main backend
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Compiler service listening on port ${PORT}`);
});