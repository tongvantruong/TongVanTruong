## Problem 1

### Task

Provide 3 unique implementations of the following function in JavaScript.

**Input**: `n` - any integer

_Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`_.

**Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

### Solutions

- `n` is any integer so I assume it can be either positive or negative, then `sum_to_n(-5) === -1 + -2 + -3 + -4 + -5 === -15`
- I named all the functions using CamelCase as it is considered best practice
- I generally avoid adding comments to my code so I named the function a bit longer but easier to read

- `sumToNWithForLoop`: Time Complexity is `O(n)`
- `sumToNWithWhileLoop`: Time Complexity is `O(n)`
- `sumToNWithFormula`: Time Complexity is `O(1)` which makes this the best option

- [Open Code](src/problem1/sum.js)

### How to test

Run the bellow command to check the results

```
node src/problem1/sum.js
```
