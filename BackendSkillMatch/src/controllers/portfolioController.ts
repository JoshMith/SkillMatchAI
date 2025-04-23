import { Request, Response } from "express";
import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";


// Add a new portfolio
export const addPortfolio = asyncHandler(async (req: Request, res: Response) => {
    const { user_id, title, description, project_url, image_url, start_date, end_date } = req.body;

    if (!user_id || !title) {
        res.status(400).json({ message: "User ID and title are required" });
        return;
    }

    const newPortfolio = await pool.query(
        `INSERT INTO portfolios (user_id, title, description, project_url, image_url, start_date, end_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;`,
        [user_id, title, description, project_url, image_url, start_date, end_date]
    );

    res.status(201).json({
        message: "Portfolio added successfully.",
        portfolio: newPortfolio.rows[0],
    });
});

// Get all portfolios for a user
export const getPortfoliosByUserId = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const portfolios = await pool.query(
        `SELECT * FROM portfolios WHERE user_id = $1;`,
        [user_id]
    );

    res.status(200).json({
        message: "Portfolios retrieved successfully.",
        portfolios: portfolios.rows,
    });
});

// Update a portfolio
export const updatePortfolio = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, project_url, image_url, start_date, end_date } = req.body;

    const portfolioCheck = await pool.query(
        "SELECT portfolio_id FROM portfolios WHERE portfolio_id = $1",
        [id]
    );
    if (portfolioCheck.rows.length === 0) {
        res.status(404).json({ message: "Portfolio not found" });
        return;
    }

    const updatedPortfolio = await pool.query(
        `UPDATE portfolios
        SET title = $1, description = $2, project_url = $3, image_url = $4, start_date = $5, end_date = $6
        WHERE portfolio_id = $7
        RETURNING *;`,
        [title, description, project_url, image_url, start_date, end_date, id]
    );

    res.status(200).json({
        message: "Portfolio updated successfully.",
        portfolio: updatedPortfolio.rows[0],
    });
});

// Delete a portfolio by ID
export const deletePortfolio = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const portfolioCheck = await pool.query(
        "SELECT portfolio_id FROM portfolios WHERE portfolio_id = $1",
        [id]
    );
    if (portfolioCheck.rows.length === 0) {
        res.status(404).json({ message: "Portfolio not found" });
        return;
    }

    await pool.query(
        "DELETE FROM portfolios WHERE portfolio_id = $1",
        [id]
    );

    res.status(200).json({
        message: "Portfolio deleted successfully.",
    });
});

