import express, { type Response } from "express";
import type { NonSensitivePatient } from "../types.ts";
import patientService from "../services/patientService.ts";
import { isPatientWithoutId } from "../utils.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const nonsensitivePatients = patientService.getNonSensitivePatients();
  res.send(nonsensitivePatients);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (!isPatientWithoutId(body)) {
    return res.status(400).json({
      error: "Improper patient formatting!",
    });
  }
  const addPatient = patientService.addPatient(body);
  return res.send(addPatient);
});

export default router;
