/// <reference lib="webworker" />

let numbers: number[] = [];

function calcStats(nums: number[]) {
  const sorted = [...nums].sort((a, b) => a - b);
  const count = nums.length;
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  const avg = nums.reduce((a, b) => a + b, 0) / count;
  const median =
    count % 2 === 0
      ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
      : sorted[Math.floor(count / 2)];
  const std = Math.sqrt(
    nums.reduce((sum, n) => sum + Math.pow(n - avg, 2), 0) / count
  );
  return { count, min, max, avg, median, std };
}

addEventListener("message", ({ data }) => {
  if (data.type === "init") {
    numbers = data.payload;
  } else if (data.type === "append") {
    numbers = numbers.concat(data.payload);
  }
  const stats = calcStats(numbers);
  postMessage({ type: "stats", payload: stats });
});
