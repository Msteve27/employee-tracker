const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Buster2013!',
      database: 'employee_tracker'
    },
    console.log('Connected to the employee_tracker database.')
);

app.get('/', (req, res) => {
    res.json({
      message: 'Hello World 3.0!'
    });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});


// returns all data in the department table
db.query(`SELECT * FROM department`, (err, rows) => {
    console.log(rows);
});

// returns all data in the employee_role table
db.query(`SELECT * FROM employee_role`, (err, rows) => {
    console.log(rows);
});

// returns all data in the employee table
db.query(`SELECT * FROM employee`, (err, rows) => {
    console.log(rows);
});

// Create a department
const sql = `INSERT INTO department (id, name) 
              VALUES (?,?)`;
const params = [1, 'Accounting'];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Create an employee_role
const sql = `INSERT INTO employee_role (id, title, salary, department_id) 
              VALUES (?,?,?,?)`;
const params = [1, 'Accountant', 100,000, 10];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Create an employee
const sql = `INSERT INTO employee (id, name) 
              VALUES (?,?,?,?,?)`;
const params = [1, 'Matt', 'Stevens', 20, 30];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});