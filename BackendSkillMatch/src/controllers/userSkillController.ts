import { Request, Response } from "express";
import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";


export const addUserSkill = asyncHandler(async (req: Request, res: Response) => {

try {
    const { user_id, skill_id, proficiency_level, years_experience, verified } = req.body;

        // Check if the user-skill combination already exists
        const userSkillCheck = await pool.query(
            "SELECT user_skill_id FROM userskills WHERE user_id = $1 AND skill_id = $2",
            [user_id, skill_id]
        );
        if (userSkillCheck.rows.length > 0) {
            res.status(400).json({ message: "User skill already exists" });
            return;
        }
    
        // Insert the new user skill
        const userSkillResult = await pool.query(
            `INSERT INTO userskills (user_id, skill_id, proficiency_level, years_experience, verified)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`,
            [user_id, skill_id, proficiency_level, years_experience || null, verified || false]
        );
    
        res.status(201).json({
            message: "User skill added successfully.",
            userSkill: userSkillResult.rows[0],
        });
} catch (error) {
    console.error("❌ Error in addUserSkill:", error);
    res.status(500).json({ message: "Internal Server Error", error });
}
});

export const updateUserSkill = asyncHandler(async (req: Request, res: Response) => {
try {
    const { id } = req.params;
    const { proficiency_level, years_experience, verified } = req.body;

    // Check if the user skill exists
    const userSkillCheck = await pool.query(
        "SELECT user_skill_id FROM userskills WHERE user_skill_id = $1",
        [id]
    );
    if (userSkillCheck.rows.length === 0) {
        res.status(404).json({ message: "User skill not found" });
        return;
    }

    // Update the user skill
    const updatedUserSkill = await pool.query(
        `UPDATE userskills
        SET proficiency_level = $1, years_experience = $2, verified = $3
        WHERE user_skill_id = $4
        RETURNING *;`,
        [proficiency_level, years_experience || null, verified || false, id]
    );

    res.status(200).json({
        message: "User skill updated successfully.",
        userSkill: updatedUserSkill.rows[0],
    });
} catch (error) {
    console.error("❌ Error in updateUserSkill:", error);
    res.status(500).json({ message: "Internal Server Error", error });
}
});

export const getUserSkills = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;

    // Retrieve all skills for a specific user
    const userSkills = await pool.query(
        `SELECT us.*, s.name AS skill_name, s.category AS skill_category
        FROM userskills us
        JOIN skills s ON us.skill_id = s.skill_id
        WHERE us.user_id = $1;`,
        [user_id]
    );

    res.status(200).json({
        message: "User skills retrieved successfully.",
        userSkills: userSkills.rows,
    });
});



export const deleteUserSkill = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if the user skill exists
    const userSkillCheck = await pool.query(
        "SELECT user_skill_id FROM userskills WHERE user_skill_id = $1",
        [id]
    );
    if (userSkillCheck.rows.length === 0) {
        res.status(404).json({ message: "User skill not found" });
        return;
    }

    // Delete the user skill
    await pool.query(
        "DELETE FROM userskills WHERE user_skill_id = $1",
        [id]
    );

    res.status(200).json({
        message: "User skill deleted successfully.",
    });
});

