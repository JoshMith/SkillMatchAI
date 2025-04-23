import { Request, Response, NextFunction } from "express"
/**
 * @desc - Avoud the problem of try catch not automatically passed to asynchnronous threads
 * @param fn The asynchronous function to wrap async functions
 * @returns A function that executes the async function and catechs the error
 */
const asyncHandler = <T = any, R extends Request = Request>(
    fn: (req: R, res: Response, next: NextFunction) => Promise<T>
) => {
    return (req: R, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export default asyncHandler;