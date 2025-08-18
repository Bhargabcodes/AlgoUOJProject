// backend/src/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// --- User Registration ---
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with that email already exists.' });
    }
    
    // Create a new user instance
    user = new User({
      username,
      email,
      password, // The password will be hashed by the pre-save hook in the model
    });

    // Save the user to the database
    await user.save();

    // Respond with success (or generate a token immediately)
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// --- User Login ---
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // --- Create and Sign JWT ---
    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }, // Token expires in 24 hours
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// This is the function that was missing, causing the crash.
exports.getCurrentUser = async (req, res) => {
  try {
    // req.user is attached by the authMiddleware
    // We find the user by ID but exclude the password from being sent back
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

