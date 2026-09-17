import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gender, type Patient } from "../../types";
import patientService from "../../services/patients";
import { Box, Paper, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
const PatientInfo = () => {
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

      <Box sx={{ marginTop: 3 }}>
        <Typography>ssn: {patient.ssn}</Typography>

        <Typography>ocupation: {patient.occupation}</Typography>

        <Typography>date of birth: {patient.dateOfBirth}</Typography>
      </Box>
    </Paper>
  );
};

export default PatientInfo;
