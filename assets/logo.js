const logo = require("asciiart-logo");

const config = logo({
    name: 'Employee Tracker',
    font: 'Star Wars',
    lineChars: 10,
    padding: 2,
    margin: 3,
    borderColor: 'bold-white',
    logoColor: 'yellow',
    textColor: 'white',
})
.emptyLine()
.right("Created by: Lucas Santiago")
.emptyLine()
.center("Welcome to the Employee Tracker console app!")
.render();

module.exports = config;