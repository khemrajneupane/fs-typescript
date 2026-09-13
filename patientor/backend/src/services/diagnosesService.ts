import diagnoses from "../../data/diagnoses.ts";
import type { Diagnosis } from "../types.ts";

const getDiagnoses = (): Diagnosis[] => {
  //console.log(diagnoses);
  return diagnoses;
};

export default {
  getDiagnoses,
};
