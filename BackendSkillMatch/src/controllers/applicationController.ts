import { Request, Response } from "express";
import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";


// Add a new job application
export const addApplication = asyncHandler(async (req: Request, res: Response) => {
    const { job_id, user_id, matching_score } = req.body;

    // Check if the application already exists
    const applicationCheck = await pool.query(
        "SELECT application_id FROM applications WHERE job_id = $1 AND user_id = $2",
        [job_id, user_id]
    );
    if (applicationCheck.rows.length > 0) {
        res.status(400).json({ message: "Application already exists" });
        return;
    }

    // Insert the new application
    const applicationResult = await pool.query(
        `INSERT INTO applications (job_id, user_id, matching_score)
        VALUES ($1, $2, $3)
        RETURNING *;`,
        [job_id, user_id, matching_score]
    );

    res.status(201).json({
        message: "Application added successfully.",
        application: applicationResult.rows[0],
    });
});

// Update the status of a job application
export const updateApplicationStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    // Check if the application exists
    const applicationCheck = await pool.query(
        "SELECT application_id FROM applications WHERE application_id = $1",
        [id]
    );
    if (applicationCheck.rows.length === 0) {
        res.status(404).json({ message: "Application not found" });
        return;
    }

    // Update the application status
    const updatedApplication = await pool.query(
        `UPDATE applications
        SET status = $1, last_updated = CURRENT_TIMESTAMP
        WHERE application_id = $2
        RETURNING *;`,
        [status, id]
    );

    res.status(200).json({
        message: "Application status updated successfully.",
        application: updatedApplication.rows[0],
    });
});




// Get applications by job ID
export const getApplicationsByJobId = asyncHandler(async (req: Request, res: Response) => {
    const { job_id } = req.params;

    // Retrieve all applications for a specific job
    const applications = await pool.query(
        `SELECT a.*, u.name AS user_name, j.title AS job_title
        FROM applications a
        JOIN users u ON a.user_id = u.user_id
        JOIN jobs j ON a.job_id = j.job_id
        WHERE a.job_id = $1;`,
        [job_id]
    );

    res.status(200).json({
        message: "Applications retrieved successfully.",
        applications: applications.rows,
    });
});

// Get all applications
export const getAllApplications = asyncHandler(async (req: Request, res: Response) => {
    // Retrieve all applications
    const applications = await pool.query(
        `SELECT a.application_id, j.title AS job_title,
                p.first_name, p.last_name, p.contact_info,
                a.status, a.matching_score, a.submitted_at
         FROM applications a
         JOIN jobs j ON a.job_id = j.job_id
         JOIN jobseekerprofiles p ON a.user_id = p.user_id;`
    );

    res.status(200).json({
        message: "All applications retrieved successfully.",
        applications: applications.rows,
    });
});

// // Get all application
// export const getApplicationById = asyncHandler(async (req: Request, res: Response) => {

//     // Retrieve the application by ID
//     const application = await pool.query(
//         `SELECT a.application_id, j.title AS job_title,
//                 p.first_name, p.last_name, p.contact_info,
//                 a.status, a.matching_score, a.submitted_at
//          FROM applications a
//          JOIN jobs j ON a.job_id = j.job_id
//          JOIN jobseekerprofiles p ON a.user_id = p.user_id
//         ;`,
//     );

//     if (application.rows.length === 0) {
//         res.status(404).json({ message: "Error Retrieving Applications" });
//         return;
//     }

//     res.status(200).json({
//         message: "Applications retrieved successfully.",
//         application: application.rows[0],
//     });
// });

// Get applications by job title
export const getApplicationsByJobTitle = asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.params;

    if (!title || typeof title !== "string") {
        res.status(400).json({ message: "Job title must be a non-empty string" });
        return;
    }

    // Retrieve applications by job title
    const applications = await pool.query(
        `SELECT a.application_id, j.title AS job_title,
                p.first_name, p.last_name, p.contact_info,
                a.status, a.matching_score, a.submitted_at
         FROM applications a
         JOIN jobs j ON a.job_id = j.job_id
         JOIN jobseekerprofiles p ON a.user_id = p.user_id
         WHERE to_tsvector(j.title) @@ plainto_tsquery($1);`,
        [title]
    );

    res.status(200).json({
        message: "Applications retrieved successfully.",
        applications: applications.rows,
    });
});

// Delete a job application
export const deleteApplication = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if the application exists
    const applicationCheck = await pool.query(
        "SELECT application_id FROM applications WHERE application_id = $1",
        [id]
    );
    if (applicationCheck.rows.length === 0) {
        res.status(404).json({ message: "Application not found" });
        return;
    }

    // Delete the application
    await pool.query(
        "DELETE FROM applications WHERE application_id = $1",
        [id]
    );

    res.status(200).json({
        message: "Application deleted successfully.",
    });
});

