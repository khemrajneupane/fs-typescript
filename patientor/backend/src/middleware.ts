import type { NextFunction, Request, Response } from "express";
import { NewPatientSchema } from "./types.ts";
import { z } from "zod";
export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      error: error.issues,
    });
  }
  return next(error);
};
