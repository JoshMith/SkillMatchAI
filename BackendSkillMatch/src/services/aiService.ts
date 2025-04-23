// import asyncHandler from "../middlewares/asyncHandler";
// import { Request, Response } from "express";
// import { queryDatabaseForUserSkills, queryDatabaseForMatchingJobs } from "../utils/databaseUtils";



// export const getMatchingJobs = asyncHandler(async (req: Request, res: Response) => {
//     const userId = req.params.userId;

//     if (!userId) {
//         return res.status(400).json({ error: "User ID is required" });
//     }

//     // Query the database for user skills
//     const userSkills = await queryDatabaseForUserSkills(userId);

//     if (!userSkills || userSkills.length === 0) {
//         return res.status(404).json({ error: "No skills found for the user" });
//     }

//     // Query the database for matching jobs
//     const matchingJobs = await queryDatabaseForMatchingJobs(userSkills);

//     return res.status(200).json({ matchingJobs });
// });