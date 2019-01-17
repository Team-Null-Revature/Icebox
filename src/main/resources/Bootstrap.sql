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
--DROP USER icebox CASCADE;

/*******************************************************************************
   Create database
********************************************************************************/
--CREATE USER icebox
--IDENTIFIED BY p4ssw0rd
--DEFAULT TABLESPACE users
--TEMPORARY TABLESPACE temp
--QUOTA 10M ON users;
--
--GRANT CONNECT TO icebox;
--GRANT RESOURCE TO icebox;
--GRANT CREATE SESSION TO icebox;
--GRANT CREATE TABLE TO icebox;
--GRANT CREATE VIEW TO icebox;

CONN icebox/p4ssw0rd

/*******************************************************************************
   Drop Tables
********************************************************************************/
DROP TABLE Ib_Tag CASCADE CONSTRAINTS;
DROP TABLE Ib_Comment CASCADE CONSTRAINTS;
DROP TABLE Ib_File_Tag CASCADE CONSTRAINTS;
DROP TABLE Ib_File CASCADE CONSTRAINTS;
DROP TABLE Ib_Folder CASCADE CONSTRAINTS;
DROP TABLE Ib_User CASCADE CONSTRAINTS;

/*******************************************************************************
   Drop Sequences
********************************************************************************/
DROP SEQUENCE User_Seq;
DROP SEQUENCE File_Seq;
DROP SEQUENCE Folder_Seq;

/*******************************************************************************
   Create Tables
********************************************************************************/
CREATE TABLE Ib_User (
    User_Id NUMBER(10) PRIMARY KEY,
    Username VARCHAR2(30) NOT NULL,
    Pass VARCHAR2(30) NOT NULL,
    FName VARCHAR2(30) NOT NULL,
    LName VARCHAR2(30) NOT NULL,
    Email VARCHAR2(50) NOT NULL
);

CREATE TABLE Ib_Folder (
    Folder_Id NUMBER(10) PRIMARY KEY,
    Owner NUMBER(10), --fk
    Name VARCHAR2(100) NOT NULL,
    P_Folder NUMBER(10), --fk
    CONSTRAINT FK_Fo_Owner FOREIGN KEY (Owner) REFERENCES Ib_User(User_Id),
    CONSTRAINT FK_Fo_Parent FOREIGN KEY (P_Folder) REFERENCES Ib_Folder(Folder_Id)
);

CREATE TABLE Ib_File (
    File_Id NUMBER(10) PRIMARY KEY,
    Name VARCHAR2(100) NOT NULL,
    Type VARCHAR2(100) NOT NULL,
    Created DATE NOT NULL,
    fSize NUMBER(20,10) NOT NULL,
    fShare VARCHAR2(36),
    Folder NUMBER(10), --fk
    CONSTRAINT FK_FI_folder FOREIGN KEY (Folder) REFERENCES Ib_Folder(Folder_Id)
);

CREATE TABLE Ib_Comment (
    Comment_Id NUMBER(10) PRIMARY KEY,
    User_Id NUMBER(10) NOT NULL,--fk
    File_Id NUMBER(10) NOT NULL,--fk
    CommentStr VARCHAR2(1000) NOT NULL,
    CONSTRAINT FK_C_User FOREIGN KEY (User_Id) REFERENCES Ib_User(User_Id),
    CONSTRAINT FK_C_File FOREIGN KEY (File_Id) REFERENCES Ib_File(File_Id)
);

CREATE TABLE Ib_Tag (
    Tag_Id NUMBER(10) PRIMARY KEY,
    Name VARCHAR2(20) NOT NULL
);

CREATE TABLE Ib_File_tag (
    File_Tag_Id NUMBER(10) PRIMARY KEY,
    File_Id NUMBER(10) NOT NULL, --fk
    Tag_Id NUMBER(10) NOT NULL, --fk
    CONSTRAINT FK_FT_Tag FOREIGN KEY (Tag_Id) REFERENCES Ib_Tag(Tag_Id),
    CONSTRAINT FK_FT_Tile FOREIGN KEY (File_Id) REFERENCES Ib_File(File_Id)
);

/*******************************************************************************
   Create Sequences
********************************************************************************/
CREATE SEQUENCE User_Seq;
CREATE SEQUENCE File_Seq;
CREATE SEQUENCE Folder_Seq;

/*******************************************************************************
   Insert Data
********************************************************************************/
INSERT INTO Ib_User(User_id,Username,Pass,FName,LName,Email)
VALUES (User_Seq.nextVal,'tylerbade','secure','Tyler','Bade','throwaway@ta.org');
INSERT INTO Ib_User(User_id,Username,Pass,FName,LName,Email)
VALUES (User_Seq.nextVal,'mateuszwiater','secure2','Mateusz','Wiater','throw2@ta.org');
INSERT INTO Ib_User(User_id,Username,Pass,FName,LName,Email)
VALUES (User_Seq.nextVal, 'chrispham','alsosecure','Chris','Pham','another@ta.org');
INSERT INTO Ib_User(User_id,Username,Pass,FName,LName,Email)
VALUES (User_Seq.nextVal, 'daviddonnely','verysecure','David','Donnely','onemore@ta.org');
INSERT INTO Ib_User(User_id,Username,Pass,FName,LName,Email)
VALUES (User_Seq.nextVal, 'derrekrueger','supersecure','Derrek','Rueger','lastone@ta.org');

INSERT INTO Ib_Folder (Folder_Id, Owner, Name)
VALUES (Folder_Seq.nextVal, 1, 'tbroot');

INSERT INTO Ib_File (File_Id,Name,Type,Created,fSize,Folder)
VALUES (File_Seq.nextVal,'tbrooottest','txt','01-Jan-2019',20,1);

