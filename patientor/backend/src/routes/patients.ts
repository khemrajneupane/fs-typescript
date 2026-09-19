import express, { type Request, type Response } from "express";
import type {
  NonSensitivePatient,
  Patient,
  PatientWithoutID,
  EntryWithoutId,
} from "../types.ts";
import { EntrySchema } from "../types.ts";
import patientService from "../services/patientService.ts";

import { errorMiddleware, newPatientParser } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const nonsensitivePatients = patientService.getNonSensitivePatients();
  res.send(nonsensitivePatients);
});
router.get("/:id", (req, res: Response<Patient>) => {
  const patient = patientService.getPatientById(req.params.id);
  if (!patient) {
    res.sendStatus(404);
  } else {
    res.send(patient);
  }
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
router.post(
  "/:id/entries",
  (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response) => {
    const result = EntrySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }
    const entry = result.data;

    const newEntry = patientService.addEntry(entry, req.params.id);
    if (!newEntry) {
      return res.sendStatus(404);
    }
    return res.send(newEntry);
  },
);
router.use(errorMiddleware);
export default router;
