import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
  const data = axios.get<DiaryEntry[]>(baseUrl).then((res) => {
    return res.data;
  });
  return data;
};
const create = (newData: NewDiaryEntry) => {
  const data = axios.post<DiaryEntry>(baseUrl, newData).then((res) => {
    return res.data;
  });
  return data;
};

export default { getAll, create };
