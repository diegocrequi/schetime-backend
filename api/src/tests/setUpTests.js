const axios = require("axios");
const { execSync } = require("child_process");
const jwt = require("jsonwebtoken");

execSync('sudo -u postgres psql -d schetime -f ../bd/createTables.sql');
execSync('sudo -u postgres psql -d schetime -f ../bd/createTriggers.sql');
execSync('sudo -u postgres psql -d schetime -f ../bd/populateDatabase.sql');

const userData = {
    id: 6,
    username: "test", 
    email: "test@gmail.com",
    password: "1234"
}

require("dotenv").config();

const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);

const user = {
    username: userData.username,
    email: userData.email,
    token: token
}

module.exports = user;