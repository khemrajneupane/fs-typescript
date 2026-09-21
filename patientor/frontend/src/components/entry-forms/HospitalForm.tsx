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
import { Diagnosis, HospitalEntry } from "../../types";
import patientService from "../../services/patients";

interface HospitalFormProps {
  patientId: string;
  onEntryAdded: () => void;
  diagnoses: Diagnosis[];
}
const HospitalForm = ({
  patientId,
  onEntryAdded,
  diagnoses,
}: HospitalFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [error, setError] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const submitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError("");
    if (
      !description ||
      !date ||
      !specialist ||
      !dischargeDate ||
      !dischargeCriteria
    ) {
      setError("All fields are required.");
      return;
    }
    const newEntry: Omit<HospitalEntry, "id"> = {
      description,
      date,
      specialist,
      type: "Hospital",
      diagnosisCodes: diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };
    try {
      await patientService.addEntry(patientId, newEntry);
      onEntryAdded();
      setDescription("");
      setDate("");
      setSpecialist("");
      setDischargeDate("");
      setDiagnosisCodes([]);
      setDischargeCriteria("");
    } catch (error) {
      console.log("ADD ENTRY ERROR:", error);
      setError("Invalid input");
    }
  };
  const handleCancel = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setDischargeDate("");
    setDiagnosisCodes([]);
    setDischargeCriteria("");
  };
  return (
    <Paper sx={{ paddingY: 3 }}>
      <Typography sx={{ fontSize: "18px" }}>New Hospital Entry</Typography>

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
          label="Discharge date"
          fullWidth
          margin="normal"
          type="date"
          value={dischargeDate}
          onChange={(event) => setDischargeDate(event.target.value)}
        />
        <TextField
          label="Discharge criteria"
          type="text"
          fullWidth
          margin="normal"
          value={dischargeCriteria}
          onChange={(event) => setDischargeCriteria(event.target.value)}
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

export default HospitalForm;
