DELETE FROM tasks;
DELETE FROM lists;
DELETE FROM users;

INSERT INTO users (username, email, password) VALUES ('test', 'test@gmail.com', '$2b$10$G2PvA/kBNsE0G.wuqOs6hukmdj6z4c.xKt1OrXPrLlzxVloNxbHEC');

INSERT INTO lists (name, datable, checkable, color, id_user) VALUES ('Birthdays', true, false, 'red', 1);

INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ('Create the app', false, 'blue', '2021-07-24', 1, NULL);
INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ('Complete the database', true, null, '2021-07-24', 1, NULL);
INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ('Buy some milk', false, null, '2021-07-24', 1, NULL);
INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ('Emily''s birthday', false, 'blue', '2021-07-24', 1, 1);
INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ('Sleep', false, NULL, '2021-07-24', 1, NULL);
