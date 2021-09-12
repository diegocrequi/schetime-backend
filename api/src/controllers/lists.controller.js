const pool = require("../database");

const getListById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const idUser = Number(req.user.id);
        const query = "SELECT * FROM lists WHERE id=$1 AND id_user=$2 AND active=true";
        const response = await pool.query(query, [id, idUser]);
        if(response.rows[0] == undefined) 
            return res.status(404).json({message: "There's no list with the given id"});
        return res.status(200).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const getListByUserId = async (req, res) => {
    try {
        const idUser = Number(req.user.id);
        const query = "SELECT * FROM lists WHERE id_user=$1 AND active=true";
        const response = await pool.query(query, [idUser]);
        return res.status(200).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const createList = async (req, res) => {
    try {
        const {name, datable, checkable, color} = req.body;
        const idUser = Number(req.user.id);
        const query = `INSERT INTO lists (name, datable, checkable, color, id_user) VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, datable, checkable, color, id_user`;
        const response = await pool.query(query, [name, datable, checkable, color, idUser]);
        return res.status(201).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const updateList = async (req, res) => {

    try {
        const id = Number(req.params.id);
        const {name, datable, checkable, color} = req.body;
        const idUser = Number(req.user.id);
        const query = `UPDATE lists SET name=$1, datable=$2, checkable=$3, color=$4 WHERE id=$5 AND id_user=$6
            RETURNING name, datable, checkable, color, id_user`;
        const response = await pool.query(query, [name, datable, checkable, color, id, idUser]);
        return res.status(200).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const deleteList = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const idUser = Number(req.user.id);
        const query = "UPDATE lists SET active=false WHERE id=$1 AND id_user=$2";
        await pool.query(query, [id, idUser]);
        return res.status(200).json({message: "List deleted correctly"});
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

module.exports = {
    getListById,
    getListByUserId,
    createList,
    updateList,
    deleteList
}