import { Request, Response, NextFunction } from "express";

//Middleware to catch all routes that don't exist 
const notFound = (req: Request, res:Response, next:NextFunction) => {
    const error = new Error(`Resource Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export {notFound}