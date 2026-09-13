import express, { type Response } from "express";
import diagnosesService from "../services/diagnosesService.ts";
import type { Diagnosis } from "../types.ts";

const router = express.Router();
router.get("/", (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = diagnosesService.getDiagnoses();
  res.send(diagnoses);
});

export default router;
