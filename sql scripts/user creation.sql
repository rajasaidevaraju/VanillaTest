
CREATE USER 'test126'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass';

GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'test126'@'localhost' WITH GRANT OPTION;

login command
mysql -u test126 -p;
