import type {
  Entry,
  EntryWithoutId,
  NonSensitivePatient,
  Patient,
  PatientWithoutID,
} from "../types.ts";
import patient from "../../data/patients.ts";
import { v4 as uuid } from "uuid";

const getPatients = (): Patient[] => patient;
const getPatientById = (id: string): Patient | undefined =>
  patient.find((p) => p.id === id);

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patient.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
const addEntry = (
  entry: EntryWithoutId,
  patientId: string,
): Entry | undefined => {
  const addEntryToThisPatient = getPatientById(patientId);
  if (!addEntryToThisPatient) {
    return undefined;
  }
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  addEntryToThisPatient.entries.push(newEntry);
  return newEntry;
};
const addPatient = (entry: PatientWithoutID): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry,
    entries: [],
  };
  patient.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
};
