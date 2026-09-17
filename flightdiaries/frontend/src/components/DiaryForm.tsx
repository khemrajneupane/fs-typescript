import { useState } from "react";
import {
  Visibility,
  Weather,
  type DiaryEntry,
  type NewDiaryEntry,
} from "../types";
import diaryService from "../diaryService";
import axios from "axios";

interface DiaryFormProps {
  onAddDiary: (diary: DiaryEntry) => void;
}
const DiaryForm = ({ onAddDiary }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newDiary: NewDiaryEntry = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    };
    diaryService
      .create(newDiary)
      .then((createdDiary) => {
        setError("");
        onAddDiary(createdDiary);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data as {
            error: { message: string }[];
          };
          const errorMessage = errorData.error.map((item) => item.message);
          setError(errorMessage.join(", "));
        }
      });
  };
  return (
    <div>
      <h1>Add new entry</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submitForm}>
        <div>
          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Visibility
            <input
              type="text"
              value={visibility}
              onChange={(event) => setVisibility(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Weather
            <input
              type="text"
              value={weather}
              onChange={(event) => setWeather(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Comment
            <input
              type="text"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};
export default DiaryForm;
