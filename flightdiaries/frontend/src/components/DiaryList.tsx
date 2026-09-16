import type { NonSensitiveDiaryEntry } from "../types";

export interface DiaryListProps {
  diaries: NonSensitiveDiaryEntry[];
}

const DiaryList = (props: DiaryListProps) => {
  return (
    <div>
      <h1>Diary entries</h1>
      {props.diaries.map((item) => {
        return (
          <article key={item.id}>
            <h3>
              <strong>{item.date}</strong>
            </h3>
            <p>
              visibility: {item.visibility} <br />
              weather: {item.weather} <br />
              comment: {item.comment}
            </p>
          </article>
        );
      })}
    </div>
  );
};
export default DiaryList;
