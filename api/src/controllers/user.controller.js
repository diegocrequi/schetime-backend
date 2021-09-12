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

module.exports = {
    signUp
}