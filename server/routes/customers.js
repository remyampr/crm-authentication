// routes/customers.js
const express = require('express');
const Customer = require('../models/Customer');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Get all customers (protected route)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching customers' });
  }
});

// Add new customer (protected route)
router.post('/', authenticateToken, async (req, res) => {
  const { name, email, phone, address } = req.body;
  
  try {
    const customer = new Customer({ name, email, phone, address });
    await customer.save();
    res.status(201).json({ message: 'Customer added successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error adding customer' });
  }
});

module.exports = router;