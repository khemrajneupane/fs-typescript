interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface ArgsTypes {
  target: number;
  dailyHours: number[];
}
const parseArgs = (args: string[]): ArgsTypes => {
  if (args.length < 2) throw new Error("Not enough arguments");
  const target = Number(args[0]);
  const dailyHours = args.slice(1).map(Number);
  if (isNaN(target)) {
    throw new Error("Target not a number");
  }
  if (dailyHours.some(isNaN)) {
    throw new Error("Daily hours not a number");
  }
  return {
    target,
    dailyHours,
  };
};
const calculateExercises = (target: number, daily_hours: number[]): Result => {
  const periodLength = daily_hours.length;
  const trainingDays = daily_hours.reduce(
    (accumulator, currentValue) =>
      currentValue > 0 ? accumulator + 1 : accumulator,
    0,
  );
  const totalHours = daily_hours.reduce(
    (accumulator, currentValue) => currentValue + accumulator,
    0,
  );
  const average = totalHours / periodLength;
  const success = average > target;
  let rating: number;
  let ratingDescription: string;
  if (average > target) {
    rating = 3;
    ratingDescription = "very good !";
  } else if (average >= target / 2) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "poor performance";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
try {
  const { target, dailyHours } = parseArgs(process.argv.slice(2));
  console.log(calculateExercises(target, dailyHours));
} catch (error: unknown) {
  let errorMessage = "Something happened";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}
