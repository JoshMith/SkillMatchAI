// Use UserRequest instead of Request.
// Ensure Admins manage users (using adminGuard in userRoutes.ts).
// Return only safe user details (excluding password).
// ✅ Ensures Admins can manage users (CRUD).
// ✅ Returns safe user details (excludes password).
// ✅ New users default to the Attendee role.
import { Request, Response } from "express";

import pool from "../config/db.config";
import asyncHandler from "../middlewares/asyncHandler";

//Only admins should get all users
export const getUsers = asyncHandler(async(req:Request, res:Response) => {
    const result = await pool.query("SELECT user_id, email, account_status, role FROM users ORDER BY user_id ASC");
    res.status(200).json(result.rows);
})

// Get user by ID
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await pool.query(
    "SELECT user_id, email, role FROM users WHERE user_id = $1",
    [id]
    );
    // Check if the logged-in user is the same as the requested user
    // if (user.rows[0]?.user_id !== parseInt(id, 10)) {
    //     return res.status(403).json({ message: "Access denied" });
    // }

    const result = await pool.query(
        "SELECT user_id, email, role FROM users WHERE user_id = $1",
        [id]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
});

// Get user by name
export const getUserByName = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.params;

    const result = await pool.query(
        "SELECT user_id, email, role FROM users WHERE name = $1",
        [name]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
});

// Get user by email
export const getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;

    const result = await pool.query(
        "SELECT user_id, email, role FROM users WHERE email = $1",
        [email]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
});

// Update user
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const result = await pool.query(
        "UPDATE users SET email = $1, role = $2 WHERE user_id = $3 RETURNING user_id, email, role",
        [email, role, id]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result.rows[0]);
});

// Delete user
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING user_id", [id]);

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
});