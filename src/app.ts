import express, { Application, NextFunction, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";


const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1", IndexRoutes)

// Basic route
app.get('/', async (req: Request, res: Response) => {

  res.status(201).json({
    success: true,
    message: 'HMS Backend Api is working',
  
  })
});


app.use(globalErrorHandler);
app.use(notFound);

export default app