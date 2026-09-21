import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useState, type SyntheticEvent } from "react";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import patientService from "../../services/patients";

interface OccupationalHealthcareFormProps {
  patientId: string;
  onEntryAdded: () => void;
  diagnoses: Diagnosis[];
}
const OccupationalHealthcareForm = ({
  patientId,
  onEntryAdded,
  diagnoses,
}: OccupationalHealthcareFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState("");

  const submitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError("");
    if (!description || !date || !specialist || !employerName) {
      setError("All fields are required.");
      return;
    }
    if (
      (sickLeaveStartDate && !sickLeaveEndDate) ||
      (!sickLeaveStartDate && sickLeaveEndDate)
    ) {
      setError("Sick start-end dates required!");
      return;
    }
    const newEntry: Omit<OccupationalHealthcareEntry, "id"> = {
      description,
      date,
      specialist,
      employerName,
      type: "OccupationalHealthcare",
      diagnosisCodes: diagnosisCodes,
    };
    if (sickLeaveStartDate && sickLeaveEndDate) {
      newEntry.sickLeave = {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate,
      };
    }
    try {
      await patientService.addEntry(patientId, newEntry);
      onEntryAdded();
      setDescription("");
      setDate("");
      setSpecialist("");
      setEmployerName("");
      setDiagnosisCodes([]);
      setSickLeaveStartDate("");
      setSickLeaveEndDate("");
    } catch (error) {
      console.log("ADD ENTRY ERROR:", error);
      setError("Invalid input");
    }
  };
  const handleCancel = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setDiagnosisCodes([]);
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
  };
  return (
    <Paper sx={{ paddingY: 3 }}>
      <Typography sx={{ fontSize: "18px" }}>
        New Occupational Health Entry
      </Typography>

      {error && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,

            backgroundColor: "#ff7961",
          }}
        >
          <ErrorIcon sx={{ color: "red" }} />
          <Typography>{error}</Typography>
        </Box>
      )}

      <form onSubmit={submitForm}>
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <TextField
          label="Date"
          fullWidth
          margin="normal"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          margin="normal"
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
        />
        <TextField
          label="Enployee Name"
          fullWidth
          margin="normal"
          value={employerName}
          onChange={(event) => setEmployerName(event.target.value)}
        />
        <TextField
          label="Sick Leave Start Date"
          type="date"
          fullWidth
          margin="normal"
          value={sickLeaveStartDate}
          onChange={(event) => setSickLeaveStartDate(event.target.value)}
        />
        <TextField
          label="Sick Leave End Date"
          fullWidth
          margin="normal"
          type="date"
          value={sickLeaveEndDate}
          onChange={(event) => setSickLeaveEndDate(event.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>

          <Select
            labelId="diagnosis-codes-label"
            multiple
            value={diagnosisCodes}
            label="Diagnosis codes"
            onChange={(event) =>
              setDiagnosisCodes(event.target.value as string[])
            }
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}-{diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ display: "flex", gap: "5px" }}>
          <Button type="submit" variant="contained">
            ADD
          </Button>
          <Button variant="outlined" onClick={() => handleCancel()}>
            CANCEL
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default OccupationalHealthcareForm;
