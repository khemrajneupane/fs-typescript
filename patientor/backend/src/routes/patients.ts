import express, { type Response } from "express";
import type { NonSensitivePatient } from "../types.ts";
import patientService from "../services/patientService.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const nonsensitivePatients = patientService.getNonSensitivePatients();
  res.send(nonsensitivePatients);
});

export default router;
