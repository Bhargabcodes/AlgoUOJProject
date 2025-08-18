const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const submissionRoutes = require('./src/routes/submissionRoutes'); // Import the new routes
const authRoutes = require('./src/routes/authRoutes');
const problemRoutes = require('./src/routes/problemRoutes');
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
app.get("/check", (req, res) => {res.send("API is working")});
app.use('/api/auth', authRoutes);
app.use('/api/submissions', submissionRoutes); 
app.use('/api/problems', problemRoutes); // Add the problem routes

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
