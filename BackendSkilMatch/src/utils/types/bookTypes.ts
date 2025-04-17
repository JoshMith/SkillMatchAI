import { UserRequest } from "./userTypes";

/**
 * Event type defining structure of an event record in PostgreSQL
 */
export interface Book {
  id: number;
  user_id: number; // Foreign key from users table
  title: string;
  location: string;
  date: Date;
  price: number;
  created_at?: Date;
  updated_at?: Date;
}


/**
 * Custom Express Request Type for event-related middleware
 * This extends `UserRequest` so that `req.user` is available
 */
export interface BookRequest extends UserRequest {
  params: {
    id: string; // Ensures `req.params.id` always exists
  };
  book?: Book; // Ensures `req.book` always exists
}
