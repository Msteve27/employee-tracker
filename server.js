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
app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});


// returns all data in the employee_role table
app.get('/api/employee_role', (req, res) => {
    const sql = `SELECT * FROM employee_role`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// returns all data in the employee table
app.get('/api/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// Create a department
app.post('/api/department', ({ body }, res) => {  
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [
      body.name
    ];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
        changes: result.affectedRows
      });
    });
});
  
// Create an employee_role
app.post('/api/employee_role', ({ body }, res) => {
    const sql = `INSERT INTO employee_role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [
      body.title,
      body.salary,
      body.department.id
    ];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
        changes: result.affectedRows
      });
    });
});

// Create an employee
app.post('/api/employee', ({ body }, res) => {
    const sql = `INSERT INTO employee (title, salary, department_id) VALUES (?,?,?)`;
    const params = [
      body.first_name,
      body.last.name,
      body.role.id,
      body.manager_id
    ];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
        changes: result.affectedRows
      });
    });
});


// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
});