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
            type: 'list',
            name: 'mainMenu',
            message: 'Choose and option:',
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
        }
    });
}

function viewAllEmployees(){
    connection.query("SELECT * FROM employees", function(err, res){
        console.cTable()
    });
}