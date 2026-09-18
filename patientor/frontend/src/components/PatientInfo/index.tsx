import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Gender, type Patient } from "../../types";
import patientService from "../../services/patients";
import { Box, Paper, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "../EntryDetails";

interface DiagnosesProps {
  diagnoses: Diagnosis[];
}
const PatientInfo = ({ diagnoses }: DiagnosesProps) => {
  console.log(diagnoses);
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    void patientService.getById(id).then((data) => setPatient(data));
  }, [id]);

  if (!patient) {
    return <div>Loading patient info</div>;
  }
  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <TransgenderIcon />;
    }
  };
  return (
    <Paper sx={{ padding: 1 }}>
      <Typography variant="h3">
        {patient.name} {genderIcon(patient.gender)}
      </Typography>

      <Box sx={{ marginTop: 3, marginBottom: 3 }}>
        <Typography>ssn: {patient.ssn}</Typography>

        <Typography>ocupation: {patient.occupation}</Typography>
      </Box>

      {patient.entries.length > 0 && (
        <Typography sx={{ fontWeight: "bold" }}>entries</Typography>
      )}
      {patient.entries.map((entry: Entry) => {
        return (
          <Box
            sx={{ marginTop: 2, border: "1px solid black", borderRadius: 1 }}
            key={entry.id}
          >
            <EntryDetails entry={entry} />
          </Box>
        );
      })}
    </Paper>
  );
};

export default PatientInfo;
