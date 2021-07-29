import { Request, Response } from "express";
import { QueryResult } from "pg";
import List from "../classes/List";
import pool from "../database";

export const getListById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id: number = Number(req.params.id);
        const query: string = "SELECT * FROM lists WHERE id = $1";
        const response: QueryResult = await pool.query(query, [id]);
        if(response.rows[0] == undefined) 
            return res.status(404).json({message: "There's no list with the given id"});
        return res.status(200).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

export const getListByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id_user: number = Number(req.params.id_user);
        const query: string = "SELECT * FROM lists WHERE id_user = $1";
        const response: QueryResult = await pool.query(query, [id_user]);
        return res.status(200).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

export const createList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {name, datable, checkable, color, id_user} = req.body;
        const query: string = `INSERT INTO lists (name, datable, checkable, color, id_user) VALUES ($1, $2, $3, $4, $5)
            RETURNING id, name, datable, checkable, color, id_user`;
        const response: QueryResult = await pool.query(query, [name, datable, checkable, color, id_user]);
        return res.status(201).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

export const updateList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id: number = Number(req.params.id);
        const {name, datable, checkable, color, id_user} = req.body;
        const query: string = `UPDATE lists SET name=$1, datable=$2, checkable=$3, color=$4, id_user=$5 WHERE id=$6
            RETURNING name, datable, checkable, color, id_user`;
        const response: QueryResult = await pool.query(query, [name, datable, checkable, color, id_user, id]);
        return res.status(200).json(response.rows[0]);
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}

export const deleteList = async (req: Request, res: Response): Promise<Response> => {
    try {
        const id: number = Number(req.params.id);
        const query: string = "DELETE FROM lists WHERE id=$1";
        const response: QueryResult = await pool.query(query, [id]);
        return res.status(200).json({message: "List deleted correctly"});
    } catch(e) {
        if(e.code === "22P02") // Data type error
            return res.status(400).json({message: "Invalid data"});
        return res.status(500).json({message: "An internal error ocurred"});
    }
}