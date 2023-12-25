const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '17sandya', // Use environment variables for sensitive data
  database: 'volunteer_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
