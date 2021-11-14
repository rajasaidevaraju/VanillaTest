CREATE DATABASE videosdb;
USE videosdb;

CREATE TABLE videos (
    id varchar(100),
    absolutePath varchar(255) UNIQUE NOT NULL,
    title varchar(255),
    duration varchar(50),
    size int,
    createdDate date,
    PRIMARY KEY (ID)
);