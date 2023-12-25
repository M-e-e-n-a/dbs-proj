const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path based on your project structure

// Get all opportunities
router.get('/', (req, res) => {
    db.query('SELECT * FROM opportunities', (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json(results);
      });
});

// Add a new opportunity
router.post('/', (req, res) => {
  // Logic to add a new opportunity to the database
  const newOpportunity = req.body; // Make sure to validate and sanitize this!
  db.query('INSERT INTO opportunities SET ?', newOpportunity, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send('Opportunity added successfully');
  });
});

// Export the router
module.exports = router;
