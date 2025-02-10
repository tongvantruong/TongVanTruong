const sumToGivenIntegerWithForLoop = (n) => {
  let sum = 0;
  const limit = Math.abs(n);

  for (let current = 0; current <= limit; current++) {
    sum += current;
  }

  return n < 0 ? -sum : sum;
};

const sumToGivenIntegerWithWhileLoop = (n) => {
  let sum = 0;
  const limit = Math.abs(n);
  let current = 0;

  while (current <= limit) {
    sum += current;
    current++;
  }

  return n < 0 ? -sum : sum;
};

const sumToGivenIntegerWithFormula = (n) => {
  const limit = Math.abs(n);
  const sum = (limit * (limit + 1)) / 2; // Formula for sum of n integers: n(n + 1) / 2

  return n < 0 ? -sum : sum;
};

const sumToGivenIntegerWithRecursion = (n) => {
  const limit = Math.abs(n);
  if (limit === 0) return 0;

  const sum = limit + sumToGivenIntegerWithRecursion(limit - 1);
  return n < 0 ? -sum : sum;
};

const sumToGivenIntegerWithArray = (n) => {
  const limit = Math.abs(n);

  const sum = Array.from({ length: limit }, (_, index) => index + 1).reduce(
    (sum, current) => sum + current,
    0
  );
  return n < 0 ? -sum : sum;
};

console.log(`For Loop: ${sumToGivenIntegerWithForLoop(5)}`);
console.log(`While Loop: ${sumToGivenIntegerWithForLoop(5)}`);
console.log(`Formula: ${sumToGivenIntegerWithForLoop(5)}`);
console.log(`Recursion: ${sumToGivenIntegerWithRecursion(5)}`);
console.log(`Array: ${sumToGivenIntegerWithArray(5)}`);

console.log(`For Loop: ${sumToGivenIntegerWithForLoop(-5)}`);
console.log(`While Loop: ${sumToGivenIntegerWithForLoop(-5)}`);
console.log(`Formula: ${sumToGivenIntegerWithForLoop(-5)}`);
console.log(`Recursion: ${sumToGivenIntegerWithRecursion(-5)}`);
console.log(`Array: ${sumToGivenIntegerWithArray(-5)}`);
