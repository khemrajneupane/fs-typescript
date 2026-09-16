import { useEffect, useState } from "react";

import type { DiaryEntry } from "./types";
import diaryService from "./diaryService";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    diaryService.getAll().then((data) => setDiaryEntries(data));
  }, []);
  const addDiary = (diary: DiaryEntry) => {
    setDiaryEntries((previous) => [...previous, diary]);
  };
  return (
    <div>
      <DiaryForm onAddDiary={addDiary} />
      <DiaryList diaries={diaryEntries} />
    </div>
  );
}

export default App;
