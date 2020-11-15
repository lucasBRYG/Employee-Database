INSERT INTO department (name)
VALUES ("ENGINEERING"), ("RESEARCH"), ("MARKETING"), ("SALES"), ("ACCOUNTING");

INSERT INTO role (title, salary, department_id)
VALUES ("Front End Developer", 57000, 1),("Back End Developer", 59000, 1),("Data Analyst", 60000, 2),("Public Relations", 57000, 3),("Salesperson", 60000, 4),("Accountant", 54000, 5);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Lucas", "Santiago", 1), 
("Mark", "Knopfler", 2),
("Roger", "Waters", 3),
("George", "Harrison", 4),
("Axl", "Rose", 5);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ("Marcus", "Santiago", 2, 1),
("Sarah", "Dari", 1, 1),
("Hana", "Alexios", 3, 3),
("Tom", "Petty", 4, 4),
("John" "Mayer", 5, 5);