const inquirer = require("inquirer");
const connection = require("./db/db");
const cTable = require("console-table");
const asciiLogo = require("./assets/logo")

console.log(asciiLogo);

connection.connect(function(err) {
    if (err) throw err;

    mainMenu();
  });

function mainMenu(){
    inquirer.prompt([
        {
            type: "list",
            name: "mainMenu",
            message: "Choose and option:",
            choices: [
                "View all departments",
                "View all employees",
                "View all jobs",
                "Add a department",
                "Add an employee",
                "Add a job you need filled",
                "Change an employee's role",
                "Exit Employee Tracker"
            ]
        }
    ]).then(response => {
        switch(response.mainMenu) {
            case "View all departments":
                break;
            case "View all employees":
                break;
            case "View all jobs":
                break;
            case "Add a department":
                break;
            case "Add an employee":
                break;
            case "Add a job you need filled":
                break;
            case "Change an employee's role":
                break;
            case "Exit Employee Tracker":
                connection.end();
                break;
        }
    });
}

function viewAllDepartments() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
}

function viewAllEmployees() {
    connection.query("SELECT * FROM employees", function(err, res){
        console.table(res);
    });
}

function viewAllJobs() {
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        console.table(res);
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "What is the name of the department you would like to add?",
        }
    ]).then(response => {
        connection.query("INSERT INTO depsrtment SET ?", response, function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department inserted!\n");
        });
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the new employee's first name?",
        },
        {
            type: "input",
            name: "firstName",
            message: "What is the new employee's last name?",
        }
        {
            type: "list",
            name: "role",
            choices: function() {
                connection.query()
            },
            message: "Select a role for the new employee"
        },
        {
            type: "list",
            name: "role",
            choices: function() {
                let roleArr = [];
                connection.query("SELECT * FROM roles", function(err, res) {
                    if (err) throw err;
                    res.forEach(element => {
                        roleArr.push(element.title)
                    });
                    return roleArr;
                });
            },
            message: "Select a role for the new employee"
        }
    ]).then(response => {
        connection.query("INSERT INTO department SET ?", response, function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee inserted!\n");
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "What's the new role you need filled?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of this position?"
        },
        {
            type: "list",
            name: "department",
            message: "What department will this job be in?",
            choices: function() {
                
            }
        }
    ]).then(response => {
        connection.query("INSERT INTO department SET ?", response, function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " department inserted!\n");
        });
    });
}