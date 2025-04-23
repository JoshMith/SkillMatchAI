import { Request, Response } from "express";
import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";

// Create or update Job Seeker Profile
export const upsertJobSeekerProfile = asyncHandler(async (req: Request, res: Response) => {
    const { user_id, first_name, last_name, headline, about, location, contact_info, profile_image_url } = req.body;

    const result = await pool.query(
        `INSERT INTO jobseekerprofiles (user_id, first_name, last_name, headline, about, location, contact_info, profile_image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (user_id)
        DO UPDATE SET
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name,
            headline = EXCLUDED.headline,
            about = EXCLUDED.about,
            location = EXCLUDED.location,
            contact_info = EXCLUDED.contact_info,
            profile_image_url = EXCLUDED.profile_image_url
        RETURNING *;`,
        [user_id, first_name, last_name, headline, about, location, contact_info, profile_image_url]
    );

    res.status(200).json({
        message: "Job Seeker Profile upserted successfully.",
        profile: result.rows[0],
    });
});

// Create or update Employer Profile
export const upsertEmployerProfile = asyncHandler(async (req: Request, res: Response) => {
    const { user_id, company_name, industry, company_size, description, logo_url, website, location } = req.body;

    const result = await pool.query(
        `INSERT INTO employerProfiles (user_id, company_name, industry, company_size, description, logo_url, website, location)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (user_id)
        DO UPDATE SET
            company_name = EXCLUDED.company_name,
            industry = EXCLUDED.industry,
            company_size = EXCLUDED.company_size,
            description = EXCLUDED.description,
            logo_url = EXCLUDED.logo_url,
            website = EXCLUDED.website,
            location = EXCLUDED.location
        RETURNING *;`,
        [user_id, company_name, industry, company_size, description, logo_url, website, location]
    );

    res.status(200).json({
        message: "Employer Profile upserted successfully.",
        profile: result.rows[0],
    });
});

// Get Job Seeker Profile by user_id
export const getJobSeekerProfile = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const result = await pool.query(
        "SELECT * FROM jobseekerprofiles WHERE user_id = $1;",
        [user_id]
    );

    if (result.rows.length === 0) {
        res.status(404).json({ message: "Job Seeker Profile not found." });
        return;
    }

    res.status(200).json({
        message: "Job Seeker Profile retrieved successfully.",
        profile: result.rows[0],
    });
});

// Get Employer Profile by user_id
export const getEmployerProfile = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const result = await pool.query(
        "SELECT * FROM employerProfiles WHERE user_id = $1;",
        [user_id]
    );

    if (result.rows.length === 0) {
        res.status(404).json({ message: "Employer Profile not found." });
        return;
    }

    res.status(200).json({
        message: "Employer Profile retrieved successfully.",
        profile: result.rows[0],
    });
});

// Delete Job Seeker Profile by user_id
export const deleteJobSeekerProfile = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const checkProfile = await pool.query(
        "SELECT * FROM jobseekerprofiles WHERE user_id = $1",
        [user_id]
    )
    if (checkProfile.rows.length === 0) {
        res.status(404).json({ message: "Job Seeker Profile not found." });
        return;
    }

    const result = await pool.query(
        "DELETE FROM jobseekerprofiles WHERE user_id = $1 RETURNING *;",
        [user_id]
    );



    res.status(200).json({
        message: "Job Seeker Profile deleted successfully.",
        profile: result.rows[0],
    });
});

// Delete Employer Profile by user_id
export const deleteEmployerProfile = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const result = await pool.query(
        "DELETE FROM employerProfiles WHERE user_id = $1 RETURNING *;",
        [user_id]
    );

    if (result.rows.length === 0) {
        res.status(404).json({ message: "Employer Profile not found." });
        return;
    }

    res.status(200).json({
        message: "Employer Profile deleted successfully.",
        profile: result.rows[0],
    });
});


