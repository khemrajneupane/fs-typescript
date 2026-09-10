interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (daily_hours: number[], target: number): Result => {
  const periodLength = daily_hours.length;
  const trainingDays = daily_hours.reduce(
    (accumulator, currentValue) =>
      currentValue > 0 ? (accumulator += 1) : accumulator,
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
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
