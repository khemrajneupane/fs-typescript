import { Gender, type PatientWithoutID, type GenderType } from "./types.ts";

export const isGender = (param: string): param is GenderType => {
  return Object.values(Gender).includes(param as GenderType);
};

export const isPatientWithoutId = (
  object: unknown,
): object is PatientWithoutID => {
  if (!object || typeof object !== "object") {
    return false;
  }

  if (
    !("name" in object) ||
    !("dateOfBirth" in object) ||
    !("ssn" in object) ||
    !("gender" in object) ||
    !("occupation" in object)
  ) {
    return false;
  }

  if (
    typeof object.name !== "string" ||
    typeof object.dateOfBirth !== "string" ||
    typeof object.ssn !== "string" ||
    typeof object.gender !== "string" ||
    typeof object.occupation !== "string"
  ) {
    return false;
  }
  if (!isGender(object.gender)) {
    return false;
  }

  return true;
};
