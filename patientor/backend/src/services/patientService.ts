import type { NonSensitivePatient, Patient } from "../types.ts";
import patient from "../../data/patients.ts";

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

export default {
  getPatients,
  getNonSensitivePatients,
};
