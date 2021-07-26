DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS lists;
DROP TYPE IF EXISTS COLOR_ENUM;

CREATE TYPE COLOR_ENUM AS ENUM ('red', 'green', 'blue', 'yellow', 'pink', 'orange', 'brown');

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE lists (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    datable BOOLEAN NOT NULL,
    checkable BOOLEAN NOT NULL,
    color COLOR_ENUM NOT NULL
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY NOT NULL,
    content VARCHAR(240) NOT NULL,
    is_checked BOOLEAN,
    color COLOR_ENUM,
    date DATE,
    id_user INTEGER REFERENCES users(id) NOT NULL,
    id_list INTEGER REFERENCES lists(id)
);
