create table appuser(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    isDeletetable varchar(20),
    UNIQUE (email)
);

insert into appuser(name,email,password,status,isDeletetable)values('Admin','admin@gmail.com','admin','true','false');

create table category(
    id int primary key AUTO_INCREMENT,
    name varchar(255) NOT NULL
);

create table article(
    id int primary key AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    content LONGTEXT NOT NULL,
    categoryId INTEGER NOT NULL,
    publication_date DATE,
    status varchar(20)
);