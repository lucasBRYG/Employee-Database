# Employee-Database
A console application that allows the use to interact with an employee tracking database.


---

### Table of Contents

- [Description](#description)
- [How to Use](#how-to-use)
- [Screenshots](#screenshots)
- [Author Info](#author-info)

---

## Description

The goal of this project is cerate a application that can be run in the command line that will interact with an employee database. It allows the user to view data and add data. There is a sql database schema included, as well as seeds for the database, although it can be spun up without any data in the database to start.

#### NOTE
This application requires "asciiart-logo": "^0.2.6", "console-table": "^0.1.2", "inquirer": "^7.3.3", and "mysql": "^2.18.1" npm packages to run. They are included in the package.json file for ease of instalation

## How to Use

Clone the repository onto your machine and run "npm i" in the cli. This will install the node_modules required to run the application properly. 

Spin up your database and insert the name AND localport number into the ./db/db.js file, as well as your password if necessary.

Run "node index.js" in the cli.

Follow the prompts to add or view data.

Select "Exit Employee Tracker", or enter "ctrl+c" into the cli, to end the application.





## Author

- Linkedin -- https://www.linkedin.com/in/lucas-bryg-codes/
- GitHub -- https://github.com/lucasBRYG/

[Back To The Top](#Note_Taker)