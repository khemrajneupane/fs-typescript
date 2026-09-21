import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { useState, type SyntheticEvent } from "react";
import { OccupationalHealthcareEntry } from "../../types";
import patientService from "../../services/patients";

interface OccupationalHealthcareFormProps {
  patientId: string;
  onEntryAdded: () => void;
}
const OccupationalHealthcareForm = ({
  patientId,
  onEntryAdded,
}: OccupationalHealthcareFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [error, setError] = useState("");

  const diagnosisCodesFormatting = diagnosisCodes
    .split(",")
    .map((code) => code.trim())
    .filter((code) => code !== "");

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
      diagnosisCodes: diagnosisCodesFormatting,
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
      setDiagnosisCodes("");
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
    setDiagnosisCodes("");
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
          type="text"
          fullWidth
          margin="normal"
          value={sickLeaveStartDate}
          onChange={(event) => setSickLeaveStartDate(event.target.value)}
        />
        <TextField
          label="Sick Leave End Date"
          fullWidth
          margin="normal"
          value={sickLeaveEndDate}
          onChange={(event) => setSickLeaveEndDate(event.target.value)}
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

export default OccupationalHealthcareForm;
