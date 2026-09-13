import express, { type Request, type Response } from "express";
import type {
  NonSensitivePatient,
  Patient,
  PatientWithoutID,
} from "../types.ts";
import patientService from "../services/patientService.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const nonsensitivePatients = patientService.getNonSensitivePatients();
  res.send(nonsensitivePatients);
});

router.post(
  "/",
  (
    req: Request<unknown, unknown, PatientWithoutID>,
    res: Response<Patient>,
  ) => {
    const addPatient = patientService.addPatient(req.body);
    res.send(addPatient);
  },
);

export default router;
