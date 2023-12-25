const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a db.js file for database connection

// Get all donations
router.get('/', (req, res) => {
    db.query('SELECT * FROM donations', (err, results) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(results);
    });
});

// Process a new donation
router.post('/', (req, res) => {
    const { amount, donorName, date } = req.body;
    // Add validation and sanitization here
    const query = 'INSERT INTO donations (amount, donorName, date) VALUES (?, ?, ?)';
    db.query(query, [amount, donorName, date], (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).send('Donation processed successfully');
    });
});

module.exports = router;
