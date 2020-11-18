DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE departments (
  departmentID INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (departmentID)
);

CREATE TABLE roles (
  roleID INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(7, 2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (roleID),
  FOREIGN KEY (department_id) REFERENCES department(departmentID)
);


CREATE TABLE employees (
  employeeID INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manger_id INT NULL,
  PRIMARY KEY (employeeID),
  FOREIGN KEY(role_id) REFERENCES role(roleID)
  FOREIGN KEY(manager_id) REFERENCES employee(employeeID)
);