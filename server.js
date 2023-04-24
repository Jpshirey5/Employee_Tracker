const express = require('express');
const path = require('path');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Getting Info from Database
app.get("/departments", (req, res) => {
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) 
    res.status(500).send("Error receiving departments");
    else 
    res.json(results);
  });
});

app.get("/roles", (req, res) => {
  db.query(
    "SELECT roles.*, departments.name AS department_name FROM roles INNER JOIN departments ON roles.department_id = departments.id",
    (err, results) => {
      if (err) 
      res.status(500).send("Error receiving roles");
      else 
      res.json(results);
    }
  );
});

app.get("/employees", (req, res) => {
      if (err) 
      res.status(500).send("Error receiving employees");
      else 
      res.json(results);
    }
  );

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

