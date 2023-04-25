const express = require('express');
const path = require('path');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

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

// Connection check
db.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + db.threadId);

  openingPrompt();
});

// List User Prompts
function openingPrompt() {

  inquirer.prompt({
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      "View Departments",
      "View Roles",
      "View Employees",
      "View Employees by Department",
      "Add Department",
      "Add Employee",
      "Add Role",
      "Update Employee Role",
      "Quit"]
  })
    .then(function ({option}) {
      switch (option) {
        case "View Departments":
          viewDepartment();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewEmployees();
          break;

        case "View Employees by Department":
          viewEmployeeByDepartment();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Quit":
          quit();
          break;
      }
    });
}

function viewDepartment() {
  // select from the db
  let query = "SELECT * FROM department";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    openingPrompt();
  });
}

function viewRoles() {
  // select from the db
  let query = "SELECT * FROM role";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    openingPrompt();
  });
}

function viewEmployee() {
  // select from the db
  let query = "SELECT * FROM employee";
  db.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    openingPrompt();
  });


};
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});