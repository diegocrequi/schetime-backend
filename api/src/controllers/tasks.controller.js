const pool = require("../database");

const getTasks = async (req, res) => {
    try {
        const query = "SELECT * FROM tasks";
        const response = await pool.query(query);
        return res.status(200).json(response.rows);
    } catch(e) {
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const query = "SELECT * FROM tasks WHERE id = $1";
        const response = await pool.query(query, [id]);
        if(response.rows[0] == undefined) 
            return res.status(404).json({message: "There's no task with the given id"})
        return res.status(200).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const getTaskByUserId = async (req, res) => {
    try {
        const id_user = Number(req.params.id_user);
        const query = "SELECT * FROM tasks WHERE id_user=$1";
        const response = await pool.query(query, [id_user]);
        return res.status(200).json(response.rows);
    } catch (e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const getTaskByListId = async (req, res) => {
    try {
        const id_list = Number(req.params.id_list);
        const query = "SELECT * FROM tasks WHERE id_list=$1";
        const response = await pool.query(query, [id_list]);
        return res.status(200).json(response.rows);
    } catch (e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const createTask = async (req, res) => {
    try {
        const {content, is_checked, color, date, id_user, id_list} = req.body;
        const query = `INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, content, is_checked, color, date, id_user, id_list`;
        const response = await pool.query(query, [content, is_checked, color, date, id_user, id_list]);
        return res.status(201).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        if(e.code === "22007") // Date type error
            return res.status(400).json({message: "Invalid date format"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const updateTask = async (req, res) => {
    try {
        const body = req.body;
        const id = Number(req.params.id);
        const {content, is_checked, color, date, id_user, id_list} = req.body;
        const query = `UPDATE tasks SET content=$1, is_checked=$2, color=$3, date=$4, id_user=$5, id_list=$6 WHERE id=$7
            RETURNING id, content, is_checked, color, date, id_user, id_list`;
        const response = await pool.query(query, [content, is_checked, color, date, id_user, id_list, id]);
        return res.status(200).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        if(e.code === "22007") // Date type error
            return res.status(400).json({message: "Invalid date format"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const query = "DELETE FROM tasks WHERE id=$1";
        const response = await pool.query(query, [id]);
        return res.status(200).json({message: "Task deleted correctly"});
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

module.exports = {
    getTasks,
    getTaskById,
    getTaskByUserId,
    getTaskByListId,
    createTask,
    updateTask,
    deleteTask
}