const pool = require("../database");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(username.indexOf(" ") !== -1 || email.indexOf(" ") !== -1)
            return res.status(400).json({message: "Neither username nor email can contains whitespaces"})
        const query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email";
        const response = await pool.query(query, [username, email, password]);
        const token = jwt.sign(response.rows[0], process.env.ACCESS_TOKEN_SECRET);
        return res.status(201).json({
            token,
            username,
            email
        });
    } catch(e) {
        if(e.code === "23505")
            return res.status(409).json({message: "Email already exists"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const logIn = async (req, res) => {
    try {
        const {username, password} = req.body;
        if(username.indexOf(" ") !== -1)
            return res.status(400).json({message: "Neither username nor email can contains whitespaces"})
        const query = "SELECT id, username, email FROM users WHERE username=$1 AND password=$2";
        const response = await pool.query(query, [username, password]);
        if(response.rows.length === 0) 
            return res.status(401).json({message: "Incorrect username or password"});
        const token = jwt.sign(response.rows[0], process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({
            token,
            username,
            email: response.rows[0].email
        });
    } catch(e) {
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const updateUserData = async (req, res) => {
    try{
        const {username, email} = req.body;
        if(username.indexOf(" ") !== -1 || email.indexOf(" ") !== -1)
            return res.status(400).json({message: "Neither username nor email can contains whitespaces"});
        const id = req.user.id;
        const query = "UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING id, username, email";
        const response = await pool.query(query, [username, email, id]);
        const token = jwt.sign(response.rows[0], process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({
            token,
            username: response.rows[0].username,
            email: response.rows[0].email
        });
    } catch(e) {
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const updateUserPassword = async (req, res) => {
    try{
        const {password} = req.body;
        const id = req.user.id;
        const query = "UPDATE users SET password=$1 WHERE id=$2 RETURNING id, username, email";
        const response = await pool.query(query, [password, id]);
        const token = jwt.sign(response.rows[0], process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({
            token,
            username: response.rows[0].username,
            email: response.rows[0].email
        });
    } catch(e) {
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = Number(req.user.id);
        const query = "DELETE FROM users WHERE id=$1";
        await pool.query(query, [id]);
        return res.status(200).json({message: "User deleted correctly"});
    } catch(e) {
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

module.exports = {
    signUp,
    logIn,
    updateUserData,
    updateUserPassword,
    deleteUser
}