
CREATE SCHEMA IF NOT EXISTS AllTrees;
USE AllTrees ;

CREATE TABLE IF NOT EXISTS Users(
  username TEXT NOT NULL,
  );


CREATE TABLE IF NOT EXISTS Queries(
	id varchar(30) NOT NULL,
    queryname TEXT NOT NULL,
    tree_state_code  INTEGER NULL,
	species_common_name varchar(50) NULL,
	current_diameter INT NOT NULL,
	actual_height INT NOT NULL,
	initial_time INT NOT NULL,
	final_time INT NOT NULL,
	limits INT NOT NULL
);

CREATE TABLE IF NOT EXISTS SavedQueries(
username varchar(30) NOT NULL,
query_id varchar(30) NOT NULL
);

DELIMITER $$
	CREATE PROCEDURE verify_username(username text)
    BEGIN
		DECLARE result INT DEFAULT 0;
    -- Verify if data is already in the table
		SELECT COUNT(*) INTO result FROM users WHERE users.username = username;
	-- Return data
		SELECT result AS 'Result';
    END $$
DELIMITER ;