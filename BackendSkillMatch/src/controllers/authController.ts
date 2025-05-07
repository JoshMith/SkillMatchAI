import { Request, Response, NextFunction } from "express"
import pool from "../config/db.config";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/helpers/generateToken";
import asyncHandler from "../middlewares/asyncHandler";

export const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body

    // Check if user exists
    const userExists = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    

    //before inserting into users, we need to hash the passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //insert into user table
    const newUser = await pool.query(
        "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *",
        [email, hashedPassword, role]
    );


    //generate JWT token for user access
    generateToken(res, newUser.rows[0].user_id, newUser.rows[0].role)
     

    res.status(201).json({
        message: "User registered successfully",
        user: newUser.rows[0]
    });

    //next() - I will redirect automatically is successfully registered
})


export const registerEmployer = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { companyName, industry, contactName, businessEmail, companySize, password } = req.body;

    // Validate industry
    const industries: string[] = [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'Manufacturing',
        'Retail',
        'Hospitality',
        'Construction',
        'Transportation',
        'Media',
        'Other'
    ];
    if (!industries.includes(industry)) {
        res.status(400).json({ message: "Invalid industry" });
        return;
    }

    // Validate company size
    const companySizes: string[] = [
        '1-10 employees',
        '11-50 employees',
        '51-200 employees',
        '201-500 employees',
        '501-1000 employees',
        '1000+ employees'
    ];
    if (!companySizes.includes(companySize)) {
        res.status(400).json({ message: "Invalid company size" });
        return;
    }

    // Check if user exists
    const userExists = await pool.query("SELECT user_id FROM users WHERE email = $1", [businessEmail]);

    if (userExists.rows.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into users table
    const newUser = await pool.query(
        "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *",
        [businessEmail, hashedPassword, 'Employer']
    );

    const userId = newUser.rows[0].user_id;

    // Insert into employerProfiles table
    const newEmployerProfile = await pool.query(
        `INSERT INTO employerProfiles (user_id, company_name, industry, company_size, description) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [userId, companyName, industry, companySize, `Contact Name: ${contactName}`]
    );

    // Generate JWT token
    generateToken(res, userId, 'Employer');

    res.status(201).json({
        message: "Employer registered successfully",
        user: newUser.rows[0],
        employerProfile: newEmployerProfile.rows[0]
    });
});

export const registerJobseeker = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, password, location } = req.body;

    // Split fullName into firstName and lastName
    const [firstName, ...lastNameParts] = fullName.split(" ");
    const lastName = lastNameParts.join(" ");

    // Check if user exists
    const userExists = await pool.query("SELECT user_id FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into users table
    const newUser = await pool.query(
        "INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *",
        [email, hashedPassword, 'Jobseeker']
    );

    const userId = newUser.rows[0].user_id;

    // Insert into jobseekerProfiles table
    const newJobseekerProfile = await pool.query(
        `INSERT INTO jobseekerprofiles (user_id, first_name, last_name, location) 
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [userId, firstName, lastName, location]
    );

    // Generate JWT token
    generateToken(res, userId, 'Jobseeker');

    res.status(201).json({
        message: "Jobseeker registered successfully",
        user: newUser.rows[0],
        jobseekerProfile: newJobseekerProfile.rows[0]
    });
});



export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body

    // Check if user exists
    const userQuery = await pool.query(
        `SELECT users.user_id, users.email, users.password_hash, users.role, users.last_login
        FROM users
        WHERE email = $1`,
        [email]
    );

    if (userQuery.rows.length === 0) {
        res.status(401).json({ message: "User doesn't exist!" });
        return;
    }

    //query the user  
    const user = userQuery.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
    }

    //generate JWT token
    await generateToken(res, user.user_id, user.role);
    // await console.log("😐😐", req.cookies)

    // Update last_login to the current time
    await pool.query(
        "UPDATE users SET last_login = NOW() WHERE user_id = $1",
        [user.user_id]
    );
 
    res.status(200).json({
        message: "Login successful",
        user: {
            user_id: user.user_id,
            email: user.email,
            role: user.role,
            last_login: user.last_login
        }
    });

    //next();
})


export const logoutUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //We need to immedietly invalidate the access token and the refreh token 
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // Expire immediately
    });

    res.cookie("refresh_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0) // Expire immediately
    });

    res.status(200).json({ message: "User logged out successfully" });
});


// 😐 {
//     'content-type': 'application/json',
//     'user-agent': 'PostmanRuntime/7.43.2',
//     accept: '*/*',
//     'cache-control': 'no-cache',
//     'postman-token': 'bb7c709f-7dcd-43ae-b722-c2b69e0a0944',
//     host: 'localhost:3000',
//     'accept-encoding': 'gzip, deflate, br',
//     connection: 'keep-alive',
//     'content-length': '68',
//     cookie: 'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInJvbGVJZCI6MiwiaWF0IjoxNzQxOTQzNjc0LCJleHAiOjE3NDE5NDQ1NzR9.O_0lQVeM3VW6tWo8b1SJHUudZsgFRbA_ODhQPD8G-Bk; refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0MTk0MzY3NCwiZXhwIjoxNzQ0NTM1Njc0fQ.sak_bhDvyo-NGeqqpKKf4tnGUZ3Jlx3lMsPMknqGujk'
//   }