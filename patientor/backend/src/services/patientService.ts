import type {
  NonSensitivePatient,
  Patient,
  PatientWithoutID,
} from "../types.ts";
import patient from "../../data/patients.ts";
import { v4 as uuid } from "uuid";

const getPatients = (): Patient[] => patient;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patient.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: PatientWithoutID): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry,
  };
  patient.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
