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
  const [weather, setWeather] = useState<Weather | "">("");
  const [visibility, setVisibility] = useState<Visibility | "">("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (weather === "") {
      setError("Error: please select weather");
      return;
    }
    if (visibility === "") {
      setError("Error: please select visibility");
      return;
    }
    const newDiary: NewDiaryEntry = {
      date,
      weather: weather,
      visibility: visibility,
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
          visibility{" "}
          <label>
            great
            <input
              type="radio"
              name="visibility"
              value="great"
              checked={visibility === "great"}
              onChange={(event) =>
                setVisibility(event.target.value as Visibility)
              }
            />
          </label>
          <label>
            good
            <input
              type="radio"
              name="visibility"
              value="good"
              checked={visibility === "good"}
              onChange={(event) =>
                setVisibility(event.target.value as Visibility)
              }
            />
          </label>
          <label>
            ok
            <input
              type="radio"
              name="visibility"
              value="ok"
              checked={visibility === "ok"}
              onChange={(event) =>
                setVisibility(event.target.value as Visibility)
              }
            />
          </label>
          <label>
            poor
            <input
              type="radio"
              name="visibility"
              value="poor"
              checked={visibility === "poor"}
              onChange={(event) =>
                setVisibility(event.target.value as Visibility)
              }
            />
          </label>
        </div>
        <div>
          weather{" "}
          <label>
            sunny
            <input
              type="radio"
              name="weather"
              value="sunny"
              checked={weather === "sunny"}
              onChange={(event) => setWeather(event.target.value as Weather)}
            />
          </label>
          <label>
            rainy
            <input
              type="radio"
              name="weather"
              value="rainy"
              checked={weather === "rainy"}
              onChange={(event) => setWeather(event.target.value as Weather)}
            />
          </label>
          <label>
            cloudy
            <input
              type="radio"
              name="weather"
              value="cloudy"
              checked={weather === "cloudy"}
              onChange={(event) => setWeather(event.target.value as Weather)}
            />
          </label>
          <label>
            stormy
            <input
              type="radio"
              name="weather"
              value="stormy"
              checked={weather === "stormy"}
              onChange={(event) => setWeather(event.target.value as Weather)}
            />
          </label>
          <label>
            windy
            <input
              type="radio"
              name="weather"
              value="windy"
              checked={weather === "windy"}
              onChange={(event) => setWeather(event.target.value as Weather)}
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
