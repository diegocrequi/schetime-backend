DELETE FROM tasks;
DELETE FROM lists;
DELETE FROM users;

INSERT INTO users (username, email, password) VALUES ('lbradnocke0', 'ctoman0@topsy.com', 'luKNXvM');
INSERT INTO users (username, email, password) VALUES ('hzecchii1', 'ajordine1@shop-pro.jp', '5SsJt6kC');
INSERT INTO users (username, email, password) VALUES ('ymoscone2', 'ehopkyns2@bravesites.com', 'CEGWUoA8fOS2');
INSERT INTO users (username, email, password) VALUES ('ohanigan3', 'aantoszczyk3@patch.com', 'veBzXXn');
INSERT INTO users (username, email, password) VALUES ('pskells4', 'tguislin4@forbes.com', '7j9dK2a2');

INSERT INTO lists (name, datable, checkable, color, id_user) VALUES ('Birthdays', true, false, 'red', 1);

INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ('Create the app', false, 'blue', '2021-07-24', 1, NULL);
INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ('Complete the database', true, null, '2021-07-24', 1, NULL);
INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ('Buy some milk', false, null, '2021-07-24', 1, NULL);
INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ('Emily''s birthday', false, 'blue', '2021-07-24', 1, 1);
INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ('Sleep', false, NULL, '2021-07-24', 1, NULL);
