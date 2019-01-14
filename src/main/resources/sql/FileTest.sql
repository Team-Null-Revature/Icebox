insert into ib_folder (folder_id, owner, name)
values (1, 1, 'tbroot');

insert into ib_file (file_id, filename,filetype,added,filesize,p_folder)
values (1,'tbrooottest','txt','01-Jan-2019',20,1);

insert into ib_file (file_id, filename,filetype,added,filesize,p_folder)
values (2,'tbsecondtest','txt','01-Jan-2019',20,1);

commit;