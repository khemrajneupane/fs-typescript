import axios from "axios";
import type { NonSensitiveDiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
  const data = axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then((res) => {
    return res.data;
  });
  return data;
};

export default { getAll };
