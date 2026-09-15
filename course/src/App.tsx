interface CourseNameProps {
  name: string;
}
const Header = (props: CourseNameProps) => {
  return <h1>{props.name}</h1>;
};
interface Part {
  name: string;
  exerciseCount: number;
}
interface ContentProps {
  parts: Part[];
}
interface Total {
  total: number;
}
const Total = (props: Total) => {
  return <p>Number of exercises {props.total}</p>;
};
const Content = (props: ContentProps) => {
  return props.parts.map((item) => {
    return (
      <>
        <p>
          {item.name} {item.exerciseCount}
        </p>
      </>
    );
  });
};
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
