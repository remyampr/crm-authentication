const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error registering user' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const user = await User.findOne({ username });
      if (!user) {
        console.error("User not found");  // Log error
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.error("Invalid credentials");  // Log error
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // Generate a JWT token for the user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
  
    } catch (err) {
      console.error("Error during login:", err);  // Log error details
      res.status(500).json({ error: 'Error logging in' });
    }
  });
  
  

// Verify token route
router.get('/verify', (req, res) => {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, userId: decoded.id });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;