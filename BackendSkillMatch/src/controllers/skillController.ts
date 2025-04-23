import { Request, Response } from "express";
import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";


export const addSkill = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { name, category, description } = req.body;

        const existing = await pool.query(
            `SELECT * FROM skills WHERE name = $1`,
            [name]
        );
        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "Skill with this name already exists." });
        }

        const result = await pool.query(
            `INSERT INTO skills (name, category, description)
             VALUES ($1, $2, $3)
             RETURNING *;`,
            [name, category, description]
        );

        res.status(201).json({
            message: "Skill added successfully.",
            skill: result.rows[0],
        });
    } catch (error) {
        console.error("❌ Error in addSkill:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});




export const updateSkill = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, description } = req.body;

    // Check if the skill exists
    const skillCheck = await pool.query(
        "SELECT skill_id FROM skills WHERE skill_id = $1",
        [id]
    );
    if (skillCheck.rows.length === 0) {
        res.status(404).json({ message: "Skill not found" });
        return;
    }

    // Update the skill
    const updatedSkill = await pool.query(
        `UPDATE skills
        SET name = $1, category = $2, description = $3
        WHERE skill_id = $4
        RETURNING *;`,
        [name, category, description || null, id]
    );

    res.status(200).json({
        message: "Skill updated successfully.",
        skill: updatedSkill.rows[0],
    });
});

export const getSkills = asyncHandler(async (req: Request, res: Response) => {
    const skills = await pool.query("SELECT * FROM skills");

    res.status(200).json({
        message: "Skills retrieved successfully.",
        skills: skills.rows,
    });
});

export const deleteSkill = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if the skill exists
    const skillCheck = await pool.query(
        "SELECT skill_id FROM skills WHERE skill_id = $1",
        [id]
    );
    if (skillCheck.rows.length === 0) {
        res.status(404).json({ message: "Skill not found" });
        return;
    }

    // Delete the skill
    await pool.query(
        "DELETE FROM skills WHERE skill_id = $1",
        [id]
    );

    res.status(200).json({
        message: "Skill deleted successfully.",
    });
});