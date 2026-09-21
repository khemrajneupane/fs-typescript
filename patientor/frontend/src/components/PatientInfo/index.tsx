import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Gender, type Patient } from "../../types";
import patientService from "../../services/patients";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "../EntryDetails";
import HealthCheckForm from "../entry-forms/HealthCheckForm";
import HospitalForm from "../entry-forms/HospitalForm";
import OccupationalHealthcareForm from "../entry-forms/OccupationalHealthcareForm";

interface DiagnosesProps {
  diagnoses: Diagnosis[];
}
const PatientInfo = ({ diagnoses }: DiagnosesProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [entryType, setEntryType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare" | null
  >(null);

  const [showEntryForm, setShowEntryForm] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    void patientService.getById(id).then((data) => setPatient(data));
  }, [id]);
  const updateUI = async () => {
    if (!id) {
      return;
    }

    const updatedPatient = await patientService.getById(id);
    setPatient(updatedPatient);
  };
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
      {!showEntryForm && (
        <Button
          variant="contained"
          sx={{ marginTop: 3 }}
          onClick={() => {
            setShowEntryForm(true);
            setEntryType("HealthCheck");
          }}
        >
          Add New Entry
        </Button>
      )}
      {showEntryForm && (
        <FormControl fullWidth sx={{ marginTop: 3, marginBottom: 3 }}>
          <InputLabel id="entry-type-label">Entry Type</InputLabel>
          <Select
            labelId="entry-type-label"
            value={entryType ?? ""}
            label="Entry type"
            onChange={(event) =>
              setEntryType(
                event.target.value as
                  | "HealthCheck"
                  | "Hospital"
                  | "OccupationalHealthcare",
              )
            }
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
          </Select>
        </FormControl>
      )}

      {showEntryForm && entryType === "HealthCheck" && (
        <HealthCheckForm
          patientId={patient.id}
          onEntryAdded={updateUI}
          diagnoses={diagnoses}
        />
      )}

      {showEntryForm && entryType === "Hospital" && (
        <HospitalForm
          patientId={patient.id}
          onEntryAdded={updateUI}
          diagnoses={diagnoses}
        />
      )}

      {showEntryForm && entryType === "OccupationalHealthcare" && (
        <OccupationalHealthcareForm
          patientId={patient.id}
          onEntryAdded={updateUI}
          diagnoses={diagnoses}
        />
      )}
    </Paper>
  );
};

export default PatientInfo;
