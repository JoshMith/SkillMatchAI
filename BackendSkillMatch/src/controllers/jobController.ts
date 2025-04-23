import { Request, Response } from "express";
import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";


// Create a new Job
export const createJob = asyncHandler(async (req: Request, res: Response) => {
    const { company_id, title, description, location, job_type, salary_range, expiry_date } = req.body;

    const result = await pool.query(
        `INSERT INTO jobs (company_id, title, description, location, job_type, salary_range, expiry_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;`,
        [company_id, title, description, location, job_type, salary_range, expiry_date]
    );

    res.status(201).json({
        message: "Job created successfully.",
        job: result.rows[0],
    });
});

// Get all Jobs
export const getAllJobs = asyncHandler(async (req: Request, res: Response) => {
    const result = await pool.query("SELECT * FROM jobs;");

    res.status(200).json({
        message: "Jobs retrieved successfully.",
        jobs: result.rows,
    });
});

// Get Job by job_id
export const getJobById = asyncHandler(async (req: Request, res: Response) => {
    const { job_id } = req.params;

    const result = await pool.query(
        "SELECT * FROM jobs WHERE job_id = $1;",
        [job_id]
    );

    if (result.rows.length === 0) {
        res.status(404).json({ message: "Job not found." });
        return;
    }

    res.status(200).json({
        message: "Job retrieved successfully.",
        job: result.rows[0],
    });
});


// Get Job by title
export const getJobByTitle = asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.params;


    // // Perform a case-insensitive search for jobs with titles including the query
    // const result = await pool.query(
    //     "SELECT * FROM jobs WHERE LOWER(title) LIKE LOWER($1);",
    //     [`%${title}%`]
    // );

    // Use PostgreSQL's full-text search for partial matching
    const result = await pool.query(
        `SELECT * FROM jobs WHERE to_tsvector(title) @@ plainto_tsquery($1);`,
        [title]
    );

    // Check if any jobs were found
    if (result.rows.length === 0) {
        res.status(404).json({ message: "No jobs found with the given title." });
        return;
    }

    // Respond with the retrieved jobs
    res.status(200).json({
        message: "Job retrieved successfully.",
        jobs: result.rows,
    });
});

// Update Job by job_id
export const updateJob = asyncHandler(async (req: Request, res: Response) => {
    const { job_id } = req.params;
    const { title, description, location, job_type, salary_range, status, expiry_date } = req.body;

    const result = await pool.query(
        `UPDATE jobs
        SET title = $1, description = $2, location = $3, job_type = $4, salary_range = $5, status = $6, expiry_date = $7
        WHERE job_id = $8
        RETURNING *;`,
        [title, description, location, job_type, salary_range, status, expiry_date, job_id]
    );

    if (result.rows.length === 0) {
        res.status(404).json({ message: "Job not found." });
        return;
    }

    res.status(200).json({
        message: "Job updated successfully.",
        job: result.rows[0],
    });
});

// Delete Job by job_id
export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
    const { job_id } = req.params;

    const result = await pool.query(
        "DELETE FROM jobs WHERE job_id = $1 RETURNING *;",
        [job_id]
    );

    if (result.rows.length === 0) {
        res.status(404).json({ message: "Job not found." });
        return;
    }

    res.status(200).json({
        message: "Job deleted successfully.",
        job: result.rows[0],
    });
});

