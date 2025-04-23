import { Request, Response } from "express";
import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";



export const scheduleInterview = asyncHandler(async (req: Request, res: Response) => {
    const { application_id, scheduled_time, location, notes } = req.body;

    if (!application_id || !scheduled_time) {
        res.status(400).json({ message: "Application ID and scheduled time are required" });
        return;
    }

    // Insert a new interview
    const interviewResult = await pool.query(
        `INSERT INTO interviews (application_id, scheduled_time, location, notes)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
        [application_id, scheduled_time, location, notes]
    );

    res.status(201).json({
        message: "Interview scheduled successfully.",
        interview: interviewResult.rows[0],
    });
});

export const updateInterview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { scheduled_time, location, status, notes } = req.body;

    // Check if the interview exists
    const interviewCheck = await pool.query(
        "SELECT interview_id FROM interviews WHERE interview_id = $1",
        [id]
    );
    if (interviewCheck.rows.length === 0) {
        res.status(404).json({ message: "Interview not yet scheduled" });
        return;
    }

    // Update the interview
    const updatedInterview = await pool.query(
        `UPDATE interviews
        SET scheduled_time = $1, location = $2, status = $3, notes = $4
        WHERE interview_id = $5
        RETURNING *;`,
        [scheduled_time, location, status, notes, id]
    );

    res.status(200).json({
        message: "Interview updated successfully.",
        interview: updatedInterview.rows[0],
    });
});

export const getApplicationsByCompanyId = asyncHandler(async (req: Request, res: Response) => {
    const { company_id } = req.params;

    // Query to get applications for a specific company with user and job details
    const applications = await pool.query(
        `SELECT
            js.first_name,
            js.last_name,
            js.contact_info,
            j.title AS job_title
        FROM applications a
        JOIN users u ON a.user_id = u.user_id
        JOIN jobseekerprofiles js ON u.user_id = js.user_id
        JOIN jobs j ON a.job_id = j.job_id
        JOIN employerprofiles ep ON j.company_id = ep.company_id
        WHERE ep.company_id = $1;`,
        [company_id]
    );

    res.status(200).json({
        message: "Applications retrieved successfully.",
        applications: applications.rows,
    });
});

export const getInterviewsByUserId = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;

    if (!user_id) {
        res.status(400).json({ message: "User ID is required" });
        return;
    }

    // Retrieve interviews for the given user ID
    const interviews = await pool.query(
        `SELECT i.*
        FROM interviews i
        JOIN applications a ON i.application_id = a.application_id
        WHERE a.user_id = $1;`,
        [user_id]
    );

    res.status(200).json({
        message: "Interviews retrieved successfully.",
        interviews: interviews.rows,
    });
});

export const deleteInterview = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Check if the interview exists
    const interviewCheck = await pool.query(
        "SELECT interview_id FROM interviews WHERE interview_id = $1",
        [id]
    );
    if (interviewCheck.rows.length === 0) {
        res.status(404).json({ message: "Interview not found" });
        return;
    }

    // Delete the interview
    await pool.query(
        "DELETE FROM interviews WHERE interview_id = $1",
        [id]
    );

    res.status(200).json({
        message: "Interview deleted successfully.",
    });
});

