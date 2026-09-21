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
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import patientService from "../../services/patients";
const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return [0, 1, 2, 3].includes(value);
};
interface HealthCheckFormProps {
  patientId: string;
  onEntryAdded: () => void;
  diagnoses: Diagnosis[];
}
const HealthCheckForm = ({
  patientId,
  onEntryAdded,
  diagnoses,
}: HealthCheckFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const submitForm = async (event: SyntheticEvent) => {
    event.preventDefault();
    setError("");
    if (!description || !date || !specialist || !rating) {
      setError("All fields are required.");
      return;
    }
    const ratingNum = Number(rating);
    if (!isHealthCheckRating(ratingNum)) {
      setError("rating between 0-3 required!");
      return;
    }
    const newEntry: Omit<HealthCheckEntry, "id"> = {
      description,
      date,
      specialist,
      type: "HealthCheck",
      healthCheckRating: ratingNum,
      diagnosisCodes: diagnosisCodes,
    };
    try {
      await patientService.addEntry(patientId, newEntry);
      onEntryAdded();
      setDescription("");
      setDate("");
      setSpecialist("");
      setRating("");
      setDiagnosisCodes([]);
    } catch (error) {
      console.log("ADD ENTRY ERROR:", error);
      setError("Invalid input");
    }
  };
  const handleCancel = () => {
    setDescription("");
    setDate("");
    setSpecialist("");
    setRating("");
    setDiagnosisCodes([]);
  };
  return (
    <Paper sx={{ paddingY: 3 }}>
      <Typography sx={{ fontSize: "18px" }}>New HealthCheck Entry</Typography>

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
        <FormControl fullWidth margin="normal">
          <InputLabel id="health-check-rating-label">
            Health Check Rating
          </InputLabel>

          <Select
            labelId="health-check-rating-label"
            value={rating}
            label="HealthCheck rating"
            onChange={(event) => setRating(event.target.value)}
          >
            <MenuItem value={HealthCheckRating.Healthy}>0 is Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>1 is Low risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>
              2 is High risk
            </MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>
              3 is Critical risk
            </MenuItem>
          </Select>
        </FormControl>
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

export default HealthCheckForm;
