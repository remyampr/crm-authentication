// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Check the token from 'x-auth-token' header
  const token = req.headers['authorization']?.split(' ')[1];
  
  // If no token is provided
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // If token is invalid
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // If token is valid, add the decoded info (user) to the request object
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;