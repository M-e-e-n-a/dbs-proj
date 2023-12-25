
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// User registration
router.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    // Add validation and sanitization here
    const hashedPassword = bcrypt.hashSync(password, 8);

    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, email], (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).send('User registered successfully');
    });
});

// User login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Add validation and sanitization here
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, users) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (users.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = users[0];
        if (bcrypt.compareSync(password, user.password)) {
            res.send('Login successful');
        } else {
            res.status(401).send('Password is incorrect');
        }
    });
});

module.exports = router;
