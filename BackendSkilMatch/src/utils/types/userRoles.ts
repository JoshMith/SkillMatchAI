import { Request } from "express";

/**
 * User Role type defining structure of roles in PostgreSQL
 * Optional timestamps as they are mostly used for tracking
 */
export interface UserRole {
  user_id  : number;
  role: string;
  created_at?: Date;
  last_login?: Date;
}


/**
 * Custom Express Request Type to include `user` with role information
 */
export interface RoleRequest extends Request {
  user?: {
    user_id: string;
    name: string;
    email: string;
    role: string;
    phone?: number;
    created_at?: Date;
    last_login?: Date;
    account_status?: string
  };
}
