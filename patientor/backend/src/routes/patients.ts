import express, { type Request, type Response } from "express";
import type {
  NonSensitivePatient,
  Patient,
  PatientWithoutID,
} from "../types.ts";
import patientService from "../services/patientService.ts";

import { errorMiddleware, newPatientParser } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const nonsensitivePatients = patientService.getNonSensitivePatients();
  res.send(nonsensitivePatients);
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, PatientWithoutID>,
    res: Response<Patient>,
  ) => {
    const addPatient = patientService.addPatient(req.body);
    return res.send(addPatient);
  },
);
router.use(errorMiddleware);
export default router;
