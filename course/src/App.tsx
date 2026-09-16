interface CourseNameProps {
  name: string;
}
const Header = (props: CourseNameProps) => {
  return <h1>{props.name}</h1>;
};

interface Total {
  total: number;
}
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}
interface CoursePartBasic extends CoursePartDescriptionBase {
  kind: "basic";
}

interface CoursePartBackground extends CoursePartDescriptionBase {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}
interface CoursePartRequirements extends CoursePartDescriptionBase {
  requirements: string[];
  kind: "special";
}
type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartRequirements;

interface ContentProps {
  parts: CoursePart[];
}
interface PartProps {
  parts: CoursePart;
}
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};
const Part = (props: PartProps) => {
  switch (props.parts.kind) {
    case "basic":
      return (
        <div>
          <p>
            <strong>
              {props.parts.name} {props.parts.exerciseCount}
            </strong>
            <br />
            <em>{props.parts.description}</em>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <strong>
              {props.parts.name} {props.parts.exerciseCount}
            </strong>
            <br />
            project exercises {props.parts.groupProjectCount}
          </p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <strong>
              {props.parts.name} {props.parts.exerciseCount}
            </strong>
            <br />
            <em>{props.parts.description}</em>
            <br />
            Submitted to{" "}
            <a href={props.parts.backgroundMaterial}>
              {props.parts.backgroundMaterial}
            </a>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <strong>
              {props.parts.name} {props.parts.exerciseCount}
            </strong>
            <br />
            required skills: {props.parts.requirements.join(", ")}
          </p>
        </div>
      );
    default:
      return assertNever(props.parts);
  }
};

const Content = (props: ContentProps) => {
  return props.parts.map((item) => {
    return (
      <>
        <Part key={item.name} parts={item} />
      </>
    );
  });
};

const Total = (props: Total) => {
  return <p>Number of exercises {props.total}</p>;
};
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
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
