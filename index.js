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
                // "Change an employee's role",
                "Exit Employee Tracker"
            ]
        }
    ]).then(response => {
        switch(response.mainMenu) {
            case "View all departments":
                viewAllDepartments()
                break;
            case "View all employees":
                viewAllEmployees()
                break;
            case "View all jobs":
                viewAllJobs()
                break;
            case "Add a department":
                addDepartment()
                break;
            case "Add an employee":
                addEmployee()
                break;
            case "Add a job you need filled":
                addRole()
                break;
            // case "Change an employee's role":

            //     break;
            case "Exit Employee Tracker":
                console.clear();
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
        mainMenu();
    });
}

function viewAllJobs() {
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        console.table(res);
        mainMenu();
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
        newDepartment = {
            name: response.newDepartment
        };
        connection.query("INSERT INTO departments SET ?", newDepartment, function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " role inserted!\n");
            mainMenu();
        });
    });
}

function addEmployee() {
    let roleArr = [];
    let managerArr = [];
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        res.forEach(element => {
            roleArr.push(element.title)
        });
    });
    connection.query("SELECT * FROM employees", function(err, res) {
        if (err) throw err;
        res.forEach(element => {
            managerArr.push(
                {
                    name: element.first_name + " " + element.last_name,
                    id: element.employeeID
                }
            );
        });
    });
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the new employee's first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the new employee's last name?",
        },
        {
            type: "list",
            name: "role",
            choices: roleArr,
            message: "Select a role for the new employee"
        },
        {
            type: "list",
            name: "manager",
            choices: function() {
                let managerNames = [];
                managerArr.forEach(element => {
                    managerNames.push(element.name)
                });
                managerNames.push("No manager")
                return managerNames;
            },
            message: "Select the employee's manager"
        }
    ]).then(response => {

        let newEmployee = {};
        let roleID;

        if (response.manager === "No manager") {
            connection.query("SELECT roleID FROM roles WHERE title = ?", response.role, function(err, res) {
                if (err) throw err;
                roleID = res[0].roleID;
                newEmployee = {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: roleID,
                }
                connection.query("INSERT INTO employees SET ?", newEmployee, function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee inserted!\n");
                    mainMenu();
                });
            });
        } else {
            connection.query("SELECT roleID FROM roles WHERE title = ?", response.role, function(err, res) {
                if (err) throw err;
                let managerID;
                roleID = res[0].roleID;
                managerArr.forEach(element => {
                    if(element.name === response.firstName + " " + response.lastName) {
                        managerID = element.id;
                    }
                });
                newEmployee = {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: roleID,
                    manager_id: managerID
                };
                connection.query("INSERT INTO employees SET ?", newEmployee, function(err, emRes) {
                    if (err) throw err;
                    console.log(res.affectedRows + " employee inserted!\n");
                    mainMenu();
                });
            })
        }
    });
}

function addRole() {
    let departmentArr = [];
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        res.forEach(element => {
            departmentArr.push(element.name)
        });
    });
    inquirer.prompt([
        {
            type: "input",
            name: "newTitle",
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
            choices: departmentArr,
            message: "What department will this job be in?",
        }
    ]).then(response => {
        let depID;
        let newRole;
        connection.query("SELECT departmentID FROM departments WHERE name = ?", response.department, function(err, res) {
            if(err) throw err;
            depID = res[0].departmentID;
            newRole = {
                title: response.newTitle,
                salary: parseInt(response.salary),
                department_id: depID
            }
            connection.query("INSERT INTO roles SET ?", newRole, function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " department inserted!\n");
                mainMenu();
            });
        });
    });
}