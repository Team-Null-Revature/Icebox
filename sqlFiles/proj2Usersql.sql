drop user icebox cascade;

create user icebox
identified by p4ssw0rd
default tablespace users
temporary tablespace temp
quota 10m on users;

grant connect to icebox;

grant resource to icebox;

grant create session to icebox;
grant create table to icebox;
grant create view to icebox;