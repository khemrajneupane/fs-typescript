import { useEffect, useState } from "react";

import type { NonSensitiveDiaryEntry } from "./types";
import diaryService from "./diaryService";
import DiaryList from "./components/DiaryList";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    [],
  );
  useEffect(() => {
    diaryService.getAll().then((data) => setDiaryEntries(data));
  }, []);

  return <DiaryList diaries={diaryEntries} />;
}

export default App;
