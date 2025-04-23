import { Request } from "express";

/**
 * User type defining structure of a user record in PostgreSQL
 * Since these timestamps are mostly used for database records but are not critical for authentication, we can make them optional in our User type.
 */
export interface User {
    user_id: string;
    email: string;
    password_hash?: string; // Exclude password when returning user info
    role: string;
    account_status: string;
    created_at?: Date;
    last_login?: Date;
}

/**
 * Custom Express Request Type to include `user` object
 */
export interface UserRequest extends Request {
    user?: User;
}
