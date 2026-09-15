export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;
export type GenderType = (typeof Gender)[keyof typeof Gender];

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: GenderType;
  occupation: string;
}
export type PatientWithoutID = Omit<Patient, "id">;
export type NonSensitivePatient = Omit<Patient, "ssn">;
