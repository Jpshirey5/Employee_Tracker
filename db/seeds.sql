/* departments */
INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Marketing");

/* roles */
INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 800000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES("Senior Director", 600000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES("Director", 500000.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES("Sales Representative", 400000.00, 4);

INSERT INTO role (title, salary, department_id)
VALUES("Software Engineer", 300000.00, 5);


/* employees */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Julia", "McIntosh", 2, );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Sam", "Jones", 3, );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("David", "Spark", 4, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Rockwell", "Kingston", 5, 3);
