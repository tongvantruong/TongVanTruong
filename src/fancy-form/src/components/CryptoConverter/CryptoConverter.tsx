import { useMemo, useState } from "react";
import Select, { OnChangeValue } from "react-select";
import "./CryptoConverter.scss";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import currencyData from "../../data/currencies.json";
import { Currency } from "../../types/currency"; // TODO: set alias to import @/

const DEFAULT_TITLE: string = "Cryptocurrency Converter" as const;
const DEFAULT_AMOUNT: number = 1 as const;

const currencies = currencyData.map((c: Currency) => {
  const iconPath = `/icons/${c.currency}.svg`;
  return { value: c.currency, label: c.currency, icon: iconPath };
});
type CurrencyType = (typeof currencies)[0];

const defaultFromCurrency = currencies.find((c) => c.value === "WBTC");
const defaultToCurrency = currencies.find((c) => c.value === "USD");

type Theme = "dark" | "light";

type FancyFormProps = {
  title?: string;
  theme?: Theme;
};

const CryptoConverter = ({
  title = DEFAULT_TITLE,
  theme = "light",
}: FancyFormProps) => {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [fromCurrency, setFromCurrency] = useState<CurrencyType | undefined>(
    defaultFromCurrency
  );
  const [toCurrency, setToCurrency] = useState<CurrencyType | undefined>(
    defaultToCurrency
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const convertedAmount = useMemo((): number => {
    const fromCurrencyPrice = currencyData.find(
      (c) => c.currency === fromCurrency?.value
    )?.price;
    const toCurrencyPrice = currencyData.find(
      (c) => c.currency === toCurrency?.value
    )?.price;
    setIsLoading(() => false);
    return fromCurrencyPrice && toCurrencyPrice
      ? (amount * fromCurrencyPrice) / toCurrencyPrice
      : 0;
  }, [amount, fromCurrency?.value, toCurrency?.value]);

  const handleAmountChange = (values: NumberFormatValues) => {
    setAmount(values.floatValue ?? amount);
  };

  const handleFromCurrencyChange = (
    value: OnChangeValue<CurrencyType, false>
  ) => setFromCurrency(value ?? fromCurrency);

  const handleToCurrencyChange = (value: OnChangeValue<CurrencyType, false>) =>
    setToCurrency(value ?? toCurrency);

  const getFormattedOptionLabel = (data: CurrencyType) => {
    return (
      <div className="converter__selects-icon">
        <img src={data.icon} alt="Cryptocurrency Icon" width={20} height={20} />
        <span className="converter__selects-label">{data.label}</span>
      </div>
    );
  };

  const swapCurrencies = () => {
    setFromCurrency(() => toCurrency);
    setToCurrency(() => fromCurrency);
  };

  // Mock fetching data
  const fetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 300);
    });
  };

  const handleUpdate = async () => {
    if (isLoading || amount <= 0) return;

    setIsLoading(() => true);
    await fetchData();
    setIsLoading(() => false);
  };

  return (
    <div className={`converter converter--${theme}`} data-testid="converter">
      <h2 className="converter__title">{title}</h2>
      <NumericFormat
        className="converter__input"
        placeholder="Enter amount to convert"
        value={amount}
        allowLeadingZeros
        onValueChange={handleAmountChange}
        disabled={isLoading}
        data-testid="amount-input"
      />
      <div className="converter__selects">
        <Select
          onChange={handleFromCurrencyChange}
          options={currencies}
          value={fromCurrency}
          isDisabled={isLoading}
          formatOptionLabel={getFormattedOptionLabel}
          aria-label="Select From Currency"
        />
        <button
          className="converter__selects-swap"
          disabled={isLoading}
          onClick={swapCurrencies}
          data-testid="swap-button"
        >
          <picture className="converter__selects-swap-picture">
            <source srcSet="/icons/swap.svg" media="(min-width: 768px)" />
            <img
              src="/icons/swap-vertical.svg"
              width={20}
              height={20}
              alt="Swap Icon"
            />
          </picture>
        </button>
        <Select
          onChange={handleToCurrencyChange}
          value={toCurrency}
          options={currencies}
          isDisabled={isLoading}
          formatOptionLabel={getFormattedOptionLabel}
          aria-label="Select To Currency"
        />
      </div>
      <button
        className="converter__button"
        disabled={isLoading}
        onClick={handleUpdate}
        data-testid="update-button"
      >
        Update
      </button>
      {isLoading ? (
        <p className="converter__result" data-testid="loading-text">
          Loading...
        </p>
      ) : (
        <p className="converter__result" data-testid="result-text">
          {amount} {fromCurrency?.label} = <b>{convertedAmount} </b>
          {toCurrency?.label}
        </p>
      )}
    </div>
  );
};

export default CryptoConverter;
