import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
const app = express();

app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});
app.get("/bmi", (req, res) => {
  console.log(req.query);
  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(Number(req.query.height)) ||
    isNaN(Number(req.query.weight))
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);
  return res.json({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const { target, daily_exercises }: any = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({
      error: "parameters missing",
    });
  }
  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    daily_exercises.some((num) => isNaN(Number(num)))
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }
  const results = calculateExercises(
    Number(target),
    daily_exercises.map(Number),
  );
  return res.json(results);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
