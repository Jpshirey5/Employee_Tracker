INSERT INTO department (name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales"), ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUE ("CEO", 800000.00, 5), 
("Senior Director", 600000.00, 4), 
("Sales Representative", 400000.00, 3), 
("Software Engineer", 300000.00, 1); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Smith", 1, 3), 
("Julia", "McIntosh", 1, 1), 
("David", "Spark", 3, NULL), 
("Rockwell", "Kingston", 5, NULL), 
