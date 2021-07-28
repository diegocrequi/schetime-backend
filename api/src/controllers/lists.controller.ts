import { Request, Response } from "express";
import { QueryResult } from "pg";
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