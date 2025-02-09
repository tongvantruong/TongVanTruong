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

Run the below command to check the results

```
node src/problem1/sum.js
```

## Problem 2

### Task
Create a currency swap form based on the template provided in the folder. A user would use this form to swap assets from one currency to another.

### Solution Summary
- Responsive layout on big and small screen
- Support dark mode - can change code to see it
- Live convert when typing on the input
- Validate input with [react-number-format](https://www.npmjs.com/package/react-number-format)
- Allow search on currency Dropdowns using [react-select](https://www.npmjs.com/package/react-select)
- Swap the currencies
- Update value from mocked API, show loading and disabled all the input, buttons, selects

### Unit test results
<img width="1027" alt="image" src="https://github.com/user-attachments/assets/2a102ef9-10d4-4928-a5eb-229effe9a413" />

### How to test
- You can checkout the code and run the below command to test
  ```
  cd src/fancy-form
  npm i
  npm run dev
  ```

  Access: http://localhost:5173/

- Or check this video on Google Drive: https://drive.google.com/file/d/1K1pzJPLsMig_qQEUJs_6TMQ7V6DuBBWm


