const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// Get user profile
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (result.length === 0) {
            return res.status(404).send('Not a valid user');
        }
        res.json(result);
    });
});

// Update user profile
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, password, created_at } = req.body;

    let query = 'UPDATE users SET ';
    let queryParams = [];
    let fieldsToUpdate = [];

    if (username) {
        fieldsToUpdate.push('username = ?');
        queryParams.push(username);
    }

    if (email) {
        fieldsToUpdate.push('email = ?');
        queryParams.push(email);
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
        fieldsToUpdate.push('password = ?');
        queryParams.push(hashedPassword);
    }

    if (created_at) {
        fieldsToUpdate.push('created_at = ?');
        queryParams.push(created_at);
    }

    // If no fields to update, return an error
    if (fieldsToUpdate.length === 0) {
        return res.status(400).send('No valid fields to update');
    }

    query += fieldsToUpdate.join(', ') + ' WHERE id = ?';
    queryParams.push(userId);

    db.query(query, queryParams, (err, result) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send('User updated successfully');
    });
});

module.exports = router;