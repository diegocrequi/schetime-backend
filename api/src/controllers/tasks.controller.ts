import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import pool from '../database';
import Task from '../classes/Task';

export const getTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const query: string = "SELECT * FROM tasks";
        const response: QueryResult = await pool.query(query);
        return res.status(200).json(response.rows);
    } catch(e) {
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

export const getTaskById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id: number = Number(req.params.id);
        const query: string = "SELECT * FROM tasks WHERE id = $1";
        const response: QueryResult = await pool.query(query, [id]);
        if(response.rows[0] == undefined) 
            return res.status(404).json({message: "There's no task with the given id"})
        return res.status(200).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

export const getTaskByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id_user = Number(req.params.id_user);
        const query: string = "SELECT * FROM tasks WHERE id_user=$1";
        const response: QueryResult = await pool.query(query, [id_user]);
        return res.status(200).json(response.rows);
    } catch (e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

export const getTaskByListId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id_list = Number(req.params.id_list);
        const query: string = "SELECT * FROM tasks WHERE id_list=$1";
        const response: QueryResult = await pool.query(query, [id_list]);
        return res.status(200).json(response.rows);
    } catch (e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

export const createTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {content, is_checked, color, date, id_user, id_list} = req.body;
        const query: string = `INSERT INTO tasks (content, is_checked, color, date, id_user, id_list) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, content, is_checked, color, date, id_user, id_list`;
        const response: QueryResult = await pool.query(query, [content, is_checked, color, date, id_user, id_list]);
        return res.status(201).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        if(e.code === "22007") // Date type error
            return res.status(400).json({message: "Invalid date format"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

export const updateTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const body = req.body;
        const id: number = Number(req.params.id);
        const {content, is_checked, color, date, id_user, id_list} = req.body;
        const query: string = `UPDATE tasks SET content=$1, is_checked=$2, color=$3, date=$4, id_user=$5, id_list=$6 WHERE id=$7
            RETURNING id, content, is_checked, color, date, id_user, id_list`;
        const response: QueryResult = await pool.query(query, [content, is_checked, color, date, id_user, id_list, id]);
        return res.status(200).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        if(e.code === "22007") // Date type error
            return res.status(400).json({message: "Invalid date format"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

export const deleteTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id: number = Number(req.params.id);
        const query: string = "DELETE FROM tasks WHERE id=$1";
        const response: QueryResult = await pool.query(query, [id]);
        return res.status(200).json({message: "Task deleted correctly"});
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}