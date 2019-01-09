/*******************************************************************************
   Icebox Database - Version 1.0
   Script: Bootstrap.sql
   Description: Creates and populates the Icebox database.
   DB Server: Oracle
   Author: Team Null
********************************************************************************/

/*******************************************************************************
   Drop database if it exists
********************************************************************************/
DROP USER icebox CASCADE;

/*******************************************************************************
   Create database
********************************************************************************/
CREATE USER icebox
IDENTIFIED BY p4ssw0rd
DEFAULT TABLESPACE users
TEMPORARY TABLESPACE temp
QUOTA 10M ON users;

GRANT CONNECT TO icebox;
GRANT RESOURCE TO icebox;
GRANT CREATE SESSION TO icebox;
GRANT CREATE TABLE TO icebox;
GRANT CREATE VIEW TO icebox;

CONN icebox/p4ssw0rd

/*******************************************************************************
   Create Tables
********************************************************************************/

CREATE TABLE Address
(
	AddressId NUMBER NOT NULL,
	Line1 VARCHAR2(30) NOT NULL,
	Line2 VARCHAR2(30) NULL,
	City VARCHAR2(30) NOT NULL,
	State VARCHAR2(2) NOT NULL,
	Zip VARCHAR2(5) NOT NULL,
	CONSTRAINT PK_Address PRIMARY KEY (AddressId)
);

/*******************************************************************************
   Create Sequences
********************************************************************************/

/*******************************************************************************
   Create Triggers
********************************************************************************/

/*******************************************************************************
   Insert Data
********************************************************************************/

INSERT INTO Address (AddressId, Line1, Line2, City, State, Zip) VALUES (1,'123 Sesame Street', '', 'Manhattan', 'NY', '10128');
INSERT INTO Address (AddressId, Line1, Line2, City, State, Zip) VALUES (2,'9255 Sunset Boulevard', 'Suite 804', 'Los Angeles', 'CA', '90069');
INSERT INTO Address (AddressId, Line1, Line2, City, State, Zip) VALUES (3,'541 10th Street NW', 'PMB 140', 'Atlanta', 'GA', '30318');
INSERT INTO Address (AddressId, Line1, Line2, City, State, Zip) VALUES (4,'1550 Peachtree St. NW', '', 'Atlanta', 'GA', '30309');
INSERT INTO Address (AddressId, Line1, Line2, City, State, Zip) VALUES (5,'12404 Koehler Dr.', '', 'Morgantown', 'WV', '26508');
INSERT INTO Address (AddressId, Line1, Line2, City, State, Zip) VALUES (6,'8581 Santa Monica Blvd.', '#004', 'West Hollywood', 'CA', '90069');
INSERT INTO Address (AddressId, Line1, Line2, City, State, Zip) VALUES (7,'1221 2nd Street', '4th Floor', 'Santa Monica', 'CA', '90401');
