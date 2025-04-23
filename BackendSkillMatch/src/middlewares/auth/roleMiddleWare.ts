import { Request, Response, NextFunction } from "express";
import asyncHandler from "../asyncHandler";
import { UserRequest } from "@app/utils/types/userTypes";


//ensure user has required roles 
export const roleGuard = (allowedRoles: string[]) =>
    asyncHandler<void, UserRequest>(async (req:UserRequest, res:Response, next:NextFunction) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            res.status(403).json({ message: "Access denied: Insufficient permissions" });
            return;
        }
        next();
    });



// Specific guards
export const adminGuard = roleGuard(["Admin"]);         // Full app control
export const jobseekerGuard = roleGuard(["Jobseeker"]); // Event creation & management
export const employerGuard = roleGuard(["Employer"]);   // Attendee-only actions
export const emp_job_seekerGuard = roleGuard(["Employer", "Jobseeker"])
export const admin_job_seekerGuard = roleGuard(["Admin", "Jobseeker"])
export const admin_employerGuard = roleGuard(["Admin", "Employer"])


