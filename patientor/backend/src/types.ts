import { z } from "zod";

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

export const GenderSchema = z.enum([Gender.Male, Gender.Female, Gender.Other]);

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: GenderType;
  occupation: string;
}

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: GenderSchema,
  occupation: z.string(),
});

export type PatientWithoutID = z.infer<typeof NewPatientSchema>;
export type NonSensitivePatient = Omit<Patient, "ssn">;
