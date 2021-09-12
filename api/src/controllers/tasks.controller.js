const pool = require("../database");

const getTaskById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const idUser = Number(req.user.id);
        const query = "SELECT * FROM tasks WHERE id=$1 AND id_user=$2";
        const response = await pool.query(query, [id, idUser]);
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
        const idUser = Number(req.user.id);
        const query = "SELECT * FROM tasks WHERE id_user=$1";
        const response = await pool.query(query, [idUser]);
        return res.status(200).json(response.rows);
    } catch (e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const getTaskByListId = async (req, res) => {
    try {
        const idList = Number(req.params.id_list);
        const idUser = Number(req.user.id);
        const query = "SELECT * FROM tasks WHERE id_list=$1 AND id_user=$2";
        const response = await pool.query(query, [idList, idUser]);
        return res.status(200).json(response.rows);
    } catch (e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

const createTask = async (req, res) => {
    try {
        const {content, is_checked, color, date, idList} = req.body;
        const idUser = Number(req.user.id);      
        const query = `INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, content, is_checked, color, date, id_user, id_list`;
        const response = await pool.query(query, [content, is_checked, color, date, idUser, idList]);
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
        const id = Number(req.params.id);
        const idUser = Number(req.user.id);
        const {content, is_checked, color, date, idList} = req.body;
        const query = `UPDATE tasks SET content=$1, is_checked=$2, color=$3, date=$4, id_list=$5 WHERE id=$6 AND id_user=$7
            RETURNING id, content, is_checked, color, date, id_user, id_list`;
        const response = await pool.query(query, [content, is_checked, color, date, idList, id, idUser]);
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
        const idUser = Number(req.user.id);
        const query = "DELETE FROM tasks WHERE id=$1 AND id_user= $2";
        await pool.query(query, [id, idUser]);
        return res.status(200).json({message: "Task deleted correctly"});
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

module.exports = {
    getTaskById,
    getTaskByUserId,
    getTaskByListId,
    createTask,
    updateTask,
    deleteTask
}