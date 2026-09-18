import { Typography } from "@mui/material";
import type { Entry } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import FavoriteIcon from "@mui/icons-material/Favorite";
const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const healthCheckRatingIcon = (rating: number) => {
    switch (rating) {
      case 0:
        return <FavoriteIcon sx={{ color: "green" }} />;

      case 1:
        return <FavoriteIcon sx={{ color: "gold" }} />;

      case 2:
        return <FavoriteIcon sx={{ color: "orange" }} />;

      case 3:
        return <FavoriteIcon sx={{ color: "red" }} />;

      default:
        return null;
    }
  };
  switch (entry.type) {
    case "Hospital":
      return (
        <>
          <Typography>
            {entry.date} <LocalHospitalIcon />
          </Typography>

          <Typography sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>

          <Typography>
            <strong>Discharge:</strong> {entry.discharge.date},{" "}
            {entry.discharge.criteria}
          </Typography>

          <Typography>diagnoses by {entry.specialist}</Typography>
        </>
      );

    case "OccupationalHealthcare":
      return (
        <>
          <Typography>
            {entry.date} <MedicationLiquidIcon /> {entry.employerName}
          </Typography>

          <Typography sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>

          {entry.sickLeave && (
            <Typography>
              <strong>Sick leave:</strong> {entry.sickLeave.startDate} -{" "}
              {entry.sickLeave.endDate}
            </Typography>
          )}

          <Typography>diagnoses by {entry.specialist}</Typography>
        </>
      );

    case "HealthCheck":
      return (
        <>
          <Typography>
            {entry.date} <MedicationIcon />{" "}
          </Typography>
          <Typography sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          <Typography>
            {healthCheckRatingIcon(entry.healthCheckRating)}
          </Typography>
          <Typography>diagnoses by {entry.specialist}</Typography>
        </>
      );

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
