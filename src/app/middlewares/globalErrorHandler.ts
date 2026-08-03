import { NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (envVars.NODE_ENV === "development") {
      console.error("Error from Global Error Handler:", err);
  };

  let statusCode = err.statusCode || 500;
  let message: string = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    error: err.message || 'An unexpected error occurred',
  });
}