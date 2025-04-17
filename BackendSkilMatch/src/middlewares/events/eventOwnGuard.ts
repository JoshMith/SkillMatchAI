import pool from "../../config/db.config";
import asyncHandler from "../asyncHandler";

// Ensures user can only modify their own events
import { Request } from "express";

interface EventRequest extends Request {
    user?: { id: string };
    event?: {
        id: string;
        user_id: string;
        title: string;
        location: string;
        date: string;
        price: number;
        created_at: string;
        updated_at: string;
    };
}

export const eventOwnerGuard = asyncHandler<void, EventRequest>(async (req, res, next) => {
    const { id: eventId } = req.params;

    if (!req.user) {
        res.status(401).json({ message: "Not authorized" });
        return;
    }

    // Check if the user is the owner of the event
    const eventQuery = await pool.query(
        "SELECT user_id FROM events WHERE id = $1",
        [eventId]
    );

    if (eventQuery.rows.length === 0) {
        res.status(404).json({ message: "Event not found" });
        return;
    }

    if (eventQuery.rows[0].user_id !== req.user.id) {
        res.status(403).json({ message: "Not authorized to edit this event" });
        return;
    }

    // Attach event details to request
    req.event = {
        id: eventQuery.rows[0].id,
        user_id: eventQuery.rows[0].user_id,
        title: eventQuery.rows[0].title,
        location: eventQuery.rows[0].location,
        date: eventQuery.rows[0].date,
        price: eventQuery.rows[0].price,
        created_at: eventQuery.rows[0].created_at,
        updated_at: eventQuery.rows[0].updated_at
    };

    next();
});

