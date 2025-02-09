import { useMemo, useState } from "react";
import Select, { OnChangeValue } from "react-select";
import "./CryptoConverter.scss";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import currencyData from "../../data/currencies.json";
import { Currency } from "../../types/currency"; // TODO: set alias to import @/

const DEFAULT_TITLE = "Cryptocurrency Converter" as const;

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
  const [amount, setAmount] = useState<number>(1);
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
    setIsLoading(() => true);
    await fetchData();
    setIsLoading(() => false);
  };

  return (
    <div className={`converter converter--${theme}`}>
      <h2 className="converter__title" data-testid="title">
        {title}
      </h2>
      <NumericFormat
        className="converter__input"
        placeholder="Enter amount to convert"
        value={amount}
        allowLeadingZeros
        onValueChange={handleAmountChange}
        disabled={isLoading}
      />
      <div className="converter__selects">
        <Select
          onChange={handleFromCurrencyChange}
          defaultValue={defaultFromCurrency}
          options={currencies}
          value={fromCurrency}
          isDisabled={isLoading}
          formatOptionLabel={getFormattedOptionLabel}
        />
        <button
          className="converter__selects-swap"
          disabled={isLoading}
          onClick={swapCurrencies}
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
          defaultValue={defaultToCurrency}
          value={toCurrency}
          options={currencies}
          isDisabled={isLoading}
          formatOptionLabel={getFormattedOptionLabel}
        />
      </div>
      <button
        className="converter__button"
        disabled={isLoading}
        onClick={handleUpdate}
      >
        Update
      </button>
      {isLoading ? (
        <p className="converter__result">Loading...</p>
      ) : (
        <p className="converter__result">
          {amount} {fromCurrency?.label} = <b>{convertedAmount} </b>
          {toCurrency?.label}
        </p>
      )}
    </div>
  );
};

export default CryptoConverter;
