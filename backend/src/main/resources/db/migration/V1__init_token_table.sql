drop table if exists token;
create table token(
    id int primary key auto_increment,
    name varchar(30) not null,
    symbol varchar(30) not null,
    chain_Id int not null,
    address varchar(30) not null,
    amount int not null,
    date_Time varchar(30)
)