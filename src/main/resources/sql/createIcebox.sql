--dropping tables for full reset
drop table ib_tag cascade constraints;
drop table ib_comment cascade constraints;
drop table ib_file_tag cascade constraints;
drop table ib_file cascade constraints;
drop table ib_folder cascade constraints;
drop table ib_user cascade constraints;
drop sequence folder_seq;

-- creating tables
create table ib_user (
    user_id number(10) primary key,
    username varchar2(30) not null,
    pass varchar2(30) not null,
    fname varchar2(30) not null,
    lname varchar2(30) not null,
    email varchar2(50) not null
);

create table ib_folder (
    folder_id number(10) primary key,
    owner number(10) not null, --fk
    name varchar2(100) not null,
    p_folder number(10) --fk
);

create table ib_file (
    file_id number(10) primary key,
    filename varchar(100) not null,
    filetype varchar(20) not null,
    added date not null,
    filesize number(20,10) not null,
    sharestr varchar2(20),
    p_folder number(10) --fk
);

create table ib_comment (
    comment_id number(10) primary key,
    senduser number(10) not null,--fk
    recfile number(10) not null,--fk
    commentstr varchar2(1000) not null
);

create table ib_tag (
    tag_id number(10) primary key,
    name varchar2(20) not null
);

create table ib_file_tag (
    file_tag_id number(10) primary key,
    recfile number(10) not null, --fk
    tagnum number(10) not null --fk
);
--Sequences
create sequence Folder_seq;

--altering tables
--folder
alter table ib_folder add constraint fk_fo_owner foreign key (owner) references ib_user(user_id);
alter table ib_folder add constraint fk_fo_parent foreign key (p_folder) references ib_folder(folder_id);

--file
alter table ib_file add constraint fk_fi_folder foreign key (p_folder) references ib_folder(folder_id);

--comment
alter table ib_comment add constraint fk_c_user foreign key (senduser) references ib_user(user_id);
alter table ib_comment add constraint fk_c_file foreign key (recfile) references ib_file(file_id);

--file_tag
alter table ib_file_tag add constraint fk_ft_tag foreign key (tagnum) references ib_tag(tag_id);
alter table ib_file_tag add constraint fk_ft_file foreign key (recfile) references ib_file(file_id);