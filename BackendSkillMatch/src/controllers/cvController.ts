import { Request, Response } from "express";
import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";


// Add a new CV
export const addCV = asyncHandler(async (req: Request, res: Response) => {
    const { user_id, file_url, parsed_data } = req.body;

    if (!user_id || !file_url) {
        res.status(400).json({ message: "User ID and file URL are required" });
        return;
    }

    const newCV = await pool.query(
        `INSERT INTO cvs (user_id, file_url, parsed_data)
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [user_id, file_url, parsed_data]
    );

    res.status(201).json({
        message: "CV added successfully.",
        cv: newCV.rows[0],
    });
});

// Get all CVs for a user
export const getCVsByUserId = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const cvs = await pool.query(
        `SELECT * FROM cvs WHERE user_id = $1;`,
        [user_id]
    );

    res.status(200).json({
        message: "CVs retrieved successfully.",
        cvs: cvs.rows,
    });
});

// Update a CV
export const updateCV = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { file_url, parsed_data } = req.body;

    const cvCheck = await pool.query(
        "SELECT cv_id FROM cvs WHERE cv_id = $1",
        [id]
    );
    if (cvCheck.rows.length === 0) {
        res.status(404).json({ message: "CV not found" });
        return;
    }

    const updatedCV = await pool.query(
        `UPDATE cvs
        SET file_url = $1, parsed_data = $2
        WHERE cv_id = $3
        RETURNING *;`,
        [file_url, parsed_data, id]
    );

    res.status(200).json({
        message: "CV updated successfully.",
        cv: updatedCV.rows[0],
    });
});

// Delete a CV by ID
export const deleteCV = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const cvCheck = await pool.query(
        "SELECT cv_id FROM cvs WHERE cv_id = $1",
        [id]
    );
    if (cvCheck.rows.length === 0) {
        res.status(404).json({ message: "CV not found" });
        return;
    }

    await pool.query(
        "DELETE FROM cvs WHERE cv_id = $1",
        [id]
    );

    res.status(200).json({
        message: "CV deleted successfully.",
    });
});

