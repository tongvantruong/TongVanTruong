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

- `sumToGivenIntegerWithForLoop`: Time Complexity is `O(n)`
- `sumToGivenIntegerWithWhileLoop`: Time Complexity is `O(n)`
- `sumToGivenIntegerWithFormula`: Time Complexity is `O(1)` which makes this the best option

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

### Note
I left some TODO comments in the code, as I would update it further if I have more time or while working on it.

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

## Problem 3

<details>
  <summary>List out the computational inefficiencies and anti-patterns found in the code block below.</summary>
  
  1. This code block uses
    - ReactJS with TypeScript.
    - Functional components.
    - React Hooks
  2. You should also provide a refactored version of the code, but more points are awarded to accurately stating the issues and explaining correctly how to improve them.

  ```ts
  interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  interface Props extends BoxProps {
  
  }
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
  	const getPriority = (blockchain: any): number => {
  	  switch (blockchain) {
  	    case 'Osmosis':
  	      return 100
  	    case 'Ethereum':
  	      return 50
  	    case 'Arbitrum':
  	      return 30
  	    case 'Zilliqa':
  	      return 20
  	    case 'Neo':
  	      return 20
  	    default:
  	      return -99
  	  }
  	}
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
  		  const balancePriority = getPriority(balance.blockchain);
  		  if (lhsPriority > -99) {
  		     if (balance.amount <= 0) {
  		       return true;
  		     }
  		  }
  		  return false
  		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
  			const leftPriority = getPriority(lhs.blockchain);
  		  const rightPriority = getPriority(rhs.blockchain);
  		  if (leftPriority > rightPriority) {
  		    return -1;
  		  } else if (rightPriority > leftPriority) {
  		    return 1;
  		  }
      });
    }, [balances, prices]);
  
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }
  ```
</details>

### Solutions
1. All types that can be reused or generic (not only use in this component) should be moved the other files
2. I prefer using `type` over `interface` in React component because of shorter sytax, consistency as type can be used for any type including Primitive Types (string, number, boolean). I will use `interface` in case I want to take advatage if it's merging feature
3. `FormattedWalletBalance` should extends `WalletBalance` to avoid duplicated code
4. `Props` should be renamed to a meaningful name. e.g. `WalletPageProps`
5. Destruture props inline is easier to read. And I would rename `rest` to `otherProps`
```ts
const WalletPage: React.FC<WalletPageProps> = ({
  children,
  ...otherProps
}: WalletPageProps) => {}
```
6. Should set type for all variables. e.g.
```ts
const balances: WalletBalance[] = useWalletBalances();
const prices: Price[] = usePrices();
const sortedBalances: WalletBalance[]
const formattedBalances: FormattedWalletBalance[]
```
7. `getPriority` function should be refactored
- Don't use `any`, let create type for it. `blockchain` can be a property of `WalletBalance` and it can be a Union type.
- The return type is `number`. It should be typed as `Priority` to remove magic numbers (100, 50, 30..., -99)
- Combine 2 case statement that returns a same value
8. `sortedBalances` should be refactored:
- `predicate` in `filter` should be extracted and named properly. It can also be a helper/util function that is tested by unit test
- the condition `balance.amount <= 0` in filter seems wrong. We want to sort the balances by priority. Why we need to rermove all `balance.amount > 0`? It depends on bussiness and other codes. So I will just leave it as it is.
- `.sort((lhs: WalletBalance, rhs: WalletBalance)` should name the meaningful variables. I guess `lhs` = `left hand side` but code should let us guess like that!
```ts
.sort((leftBalance: WalletBalance, rightBalance: WalletBalance)
```
- Extract function in `sort` and name it properly, e.g. `descendingOrder`. Simplify code inside the sort: `return rightPriority - leftPriority;`
9. `balance.amount.toFixed()` seems useless. I assume we can format the number to currency or decimal format. `12345` -> `$12,345`.
10. Should use `formattedBalances` to render data instead of `sortedBalances`


Full Code after refactored:
```ts
// I assume that all missing imports are existing in other places.

// types and enums should move to a specific file to reusable and clean code
type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";
const priorities = {
  High: 100,
  Medium: 50,
  Low: 30,
  VeryLow: 20,
  Unknown: -99,
} as const;
type Priority = (typeof priorities)[keyof typeof priorities];

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// I assume this is type for Prices
type Prices = { [currency: string]: number };

interface WalletPageProps extends BoxProps {}
const WalletPage: React.FC<WalletPageProps> = ({
  children,
  ...otherProps
}: WalletPageProps) => {
  const balances: WalletBalance[] = useWalletBalances();
  const prices: Prices = usePrices(); //

  const getPriority = (blockchain: Blockchain): Priority => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances: WalletBalance[] = useMemo(() => {
    // it seems this condition is wrong
    const hasNoAmountInBalance = (balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      return balancePriority > -99 && balance.amount <= 0;
    };
    const descendingOrder = (
      leftBalance: WalletBalance,
      rightBalance: WalletBalance
    ) => {
      const leftPriority = getPriority(leftBalance.blockchain);
      const rightPriority = getPriority(rightBalance.blockchain);
      return rightPriority - leftPriority;
    };
    return balances.filter(hasNoAmountInBalance).sort(descendingOrder);
  }, [balances, prices]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed(),
      };
    }
  );

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...otherProps}>{rows}</div>;
};

```
