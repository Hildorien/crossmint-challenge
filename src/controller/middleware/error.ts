import { Request, Response } from "express";


export function handleError(error: Error, req: Request, res: Response, next: Function) {
    console.log("Error handler middleware");
    console.error(error);
    res.status(500).json({ message: error.message });
}