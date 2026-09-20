import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useState, type SyntheticEvent } from "react";
import { HealthCheckEntry, type HealthCheckRating } from "../../types";
import patientService from "../../services/patients";
const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return [0, 1, 2, 3].includes(value);
};
interface HealthCheckFormProps {
  patientId: string;
  onEntryAdded: () => void;
}
const HealthCheckForm = ({ patientId, onEntryAdded }: HealthCheckFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [rating, setRating] = useState("");
  const [error, setError] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const diagnosisCodesFormatting = diagnosisCodes
    .split(",")
    .map((code) => code.trim())
    .filter((code) => code !== "");

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
      diagnosisCodes: diagnosisCodesFormatting,
    };
    try {
      await patientService.addEntry(patientId, newEntry);
      onEntryAdded();
      setDescription("");
      setDate("");
      setSpecialist("");
      setRating("");
      setDiagnosisCodes("");
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
    setDiagnosisCodes("");
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
          label="HealthCheck rating"
          type="number"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          slotProps={{
            htmlInput: {
              min: 0,
              max: 3,
            },
          }}
        />
        <TextField
          label="Diagnosis codes (comma-separated)"
          fullWidth
          margin="normal"
          value={diagnosisCodes}
          onChange={(event) => setDiagnosisCodes(event.target.value)}
        />
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
