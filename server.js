const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const mysql = require('mysql2');

const db = require('./db'); 


const opportunitiesRoutes = require('./routes/opportunities');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const donationsRoutes = require('./routes/donations');
// Use routes
app.use('/api/opportunities', opportunitiesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationsRoutes);