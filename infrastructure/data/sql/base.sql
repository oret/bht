# set password for root@localhost=password('roothoge');
insert into user set user="obaka", password=password("obaka"), host="localhost";
create database bht;
grant all on bht.* to obaka;
FLUSH PRIVILEGES;
