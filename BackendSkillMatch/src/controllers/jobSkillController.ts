import { Request, Response } from "express";
import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";


export const addJobSkill = asyncHandler(async (req: Request, res: Response) => {
    const { job_id, skill_id, importance_level } = req.body;

    // Check if the job-skill combination already exists
    const jobSkillCheck = await pool.query(
        "SELECT job_skill_id FROM jobskills WHERE job_id = $1 AND skill_id = $2",
        [job_id, skill_id]
    );
    if (jobSkillCheck.rows.length > 0) {
        res.status(400).json({ message: "Job skill already exists" });
        return;
    }

    // Insert the new job skill
    const jobSkillResult = await pool.query(
        `INSERT INTO jobskills (job_id, skill_id, importance_level)
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [job_id, skill_id, importance_level]
    );

    res.status(201).json({
        message: "Job skill added successfully.",
        jobSkill: jobSkillResult.rows[0],
    });
});


export const getJobSkillsByJobName = asyncHandler(async (req: Request, res: Response) => {
    const { job_name } = req.params;

    if (!job_name || typeof job_name !== "string") {
        res.status(400).json({ message: "Job name must be a non-empty string" });
        return;
    }

    // Retrieve all skills for jobs matching the job name (partial match)
    const jobSkills = await pool.query(
        `SELECT js.*, s.name AS skill_name, s.category AS skill_category, j.title AS job_title
        FROM jobskills js
        JOIN skills s ON js.skill_id = s.skill_id
        JOIN jobs j ON js.job_id = j.job_id
        WHERE to_tsvector(j.title) @@ plainto_tsquery($1);`,
        [job_name]
    );

    res.status(200).json({
        message: "Job skills retrieved successfully.",
        jobSkills: jobSkills.rows,
    });
});

export const getJobsBySkillName = asyncHandler(async (req: Request, res: Response) => {
    const { skill_name } = req.params;

    if (!skill_name || typeof skill_name !== "string") {
        res.status(400).json({ message: "Skill name must be a non-empty string" });
        return;
    }

    // Retrieve all jobs that require skills matching the skill name (partial match)
    const jobs = await pool.query(
        `SELECT j.*, js.importance_level, s.name AS skill_name, s.category AS skill_category
        FROM jobs j
        JOIN jobskills js ON j.job_id = js.job_id
        JOIN skills s ON js.skill_id = s.skill_id
        WHERE to_tsvector(s.name) @@ plainto_tsquery($1);`,
        [skill_name]
    );

    res.status(200).json({
        message: "Jobs retrieved successfully.",
        jobs: jobs.rows,
    });
});


export const updateJobSkill = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { importance_level } = req.body;

    // Check if the job skill exists
    const jobSkillCheck = await pool.query(
        "SELECT job_skill_id FROM jobskills WHERE job_skill_id = $1",
        [id]
    );
    if (jobSkillCheck.rows.length === 0) {
        res.status(404).json({ message: "Job skill not found" });
        return;
    }

    // Update the job skill
    const updatedJobSkill = await pool.query(
        `UPDATE jobskills
        SET importance_level = $1
        WHERE job_skill_id = $2
        RETURNING *;`,
        [importance_level, id]
    );

    res.status(200).json({
        message: "Job skill updated successfully.",
        jobSkill: updatedJobSkill.rows[0],
    });
});


export const deleteJobSkill = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if the job skill exists
    const jobSkillCheck = await pool.query(
        "SELECT job_skill_id FROM jobskills WHERE job_skill_id = $1",
        [id]
    );
    if (jobSkillCheck.rows.length === 0) {
        res.status(404).json({ message: "Job skill not found" });
        return;
    }

    // Delete the job skill
    await pool.query(
        "DELETE FROM jobskills WHERE job_skill_id = $1",
        [id]
    );

    res.status(200).json({
        message: "Job skill deleted successfully.",
    });
});

