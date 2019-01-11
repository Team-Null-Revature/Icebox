insert into ib_user(user_id,username,pass,fname,lname,email)
values (user_id_seq.nextVal,'tylerbade','secure','Tyler','Bade','throwaway@ta.org');
insert into ib_user(user_id,username,pass,fname,lname,email)
values (user_id_seq.nextVal,'mateuszwiater','secure2','Mateusz','Wiater','throw2@ta.org');
insert into ib_user(user_id,username,pass,fname,lname,email)
values (user_id_seq.nextVal, 'chrispham','alsosecure','Chris','Pham','another@ta.org');
insert into ib_user(user_id,username,pass,fname,lname,email)
values (user_id_seq.nextVal, 'daviddonnely','verysecure','David','Donnely','onemore@ta.org');
insert into ib_user(user_id,username,pass,fname,lname,email)
values (5, 'derrekrueger','supersecure','Derrek','Rueger','lastone@ta.org');

commit;