// Requiring Packages
const express = require('express');
const path = require('path');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Port
const PORT = process.env.PORT || 3001;
const app = express();

// App Usage
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB connection
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
      "Remove Employees",
      "Update Employee Role",
      "Quit"]
  })
    .then(function ({option}) {
      switch (option) {
        case "View Employees":
          viewEmployee();
          break;

        case "View Departments":
          viewDepartment();
          break;
          
          case "View Roles":
          viewRoles(); 
          break;

        case "View Employees by Department":
          viewEmployeeByDepartment();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employees":
          removeEmployees();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Add Role":
          addRole();
          break;

        case "Quit":
          quit();
          break;
      }
    });
}

// Functions to operate actions performed in the list.

// Add Role
function addRole() {
  const deptQuery = "SELECT id, name FROM department";

  db.query(deptQuery, (err, res) => {
    if (err) throw err;

    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the title of the new role:"
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for the new role:"
      },
      {
        type: "list",
        name: "department_id",
        message: "Select the department for the new role:",
        choices: res.map(dept => ({ name: dept.name, value: dept.id }))
      }
    ])
    .then(({ title, salary, department_id }) => {
      const query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";

      db.query(query, [title, salary, department_id], (err, res) => {
        if (err) throw err;

        console.log(`New role "${title}" added to database.`);
        openingPrompt();
      });
    });
  });
}

// Department
function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "name",
    message: "What is the name of the new department?"
  })
  .then(function(answer) {
    let query = `INSERT INTO department (name) VALUES ("${answer.name}")`;
    db.query(query, function(err, res) {
      if (err) throw err;
      console.log(`New department "${answer.name}" has been added to the database.`);
      openingPrompt();
    });
  });
}


// Employee
function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the employee's last name?",
    },
    {
      type: "input",
      name: "role_id",
      message: "What is the employee's role ID?",
    },
    {
      type: "input",
      name: "manager_id",
      message: "What is the employee's manager ID?",
    }
  ])
  .then(function (answer) {
    const query = `
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)
    `;
    const values = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];

    db.query(query, values, function (err, res) {
      if (err) throw err;
      console.log(`${answer.first_name} ${answer.last_name} was added to the database`);
      openingPrompt();
    });
  });
}

// Functions to be able to be able to view the inserted Seeds from the DB.
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

//Listening Port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});