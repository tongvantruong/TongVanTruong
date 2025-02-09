import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CryptoConverter from "./CryptoConverter";
import { it, expect, describe } from "vitest";

describe("CryptoConverter", () => {
  describe("UI", () => {
    it("renders light as default theme if not provided", () => {
      render(<CryptoConverter />);
      expect(screen.getByTestId("converter")).toHaveClass("converter--light");
    });
    it("renders dark theme if provided", () => {
      render(<CryptoConverter theme="dark" />);
      expect(screen.getByTestId("converter")).toHaveClass("converter--dark");
    });
    it("renders default title if not provided", () => {
      render(<CryptoConverter />);
      expect(screen.getByText("Cryptocurrency Converter")).toBeInTheDocument();
    });
    it("renders title if provided", () => {
      render(<CryptoConverter title="Test Title" />);
      expect(screen.getByText("Test Title")).toBeInTheDocument();
    });
    it("renders amount input", () => {
      render(<CryptoConverter />);
      expect(screen.getByTestId("amount-input")).toBeInTheDocument();
    });
    it("renders from currency dropdown", () => {
      render(<CryptoConverter />);
      expect(screen.getByLabelText("Select From Currency")).toBeInTheDocument();
    });
    it("renders swap button", () => {
      render(<CryptoConverter />);
      expect(screen.getByTestId("swap-button")).toBeInTheDocument();
    });
    it("renders to currency dropdown", () => {
      render(<CryptoConverter />);
      expect(screen.getByLabelText("Select To Currency")).toBeInTheDocument();
    });
    it("renders update button", () => {
      render(<CryptoConverter />);
      expect(screen.getByTestId("update-button")).toBeInTheDocument();
    });
    it("renders result text", () => {
      render(<CryptoConverter />);
      expect(screen.getByTestId("result-text")).toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    it("changes the value of the amount input correctly", () => {
      render(<CryptoConverter />);

      const input = screen.getByTestId("amount-input");
      fireEvent.change(input, { target: { value: "10" } });

      expect(input).toHaveValue("10");
    });
    it('selects the "From Currency" correctly', () => {
      render(<CryptoConverter />);

      const fromDropdown = screen.getByLabelText("Select From Currency");
      fireEvent.change(fromDropdown, { target: { value: "OKT" } });

      expect(fromDropdown).toHaveValue("OKT");
    });
    it('selects the "To Currency" correctly', () => {
      render(<CryptoConverter />);

      const toDropdown = screen.getByLabelText("Select To Currency");
      fireEvent.change(toDropdown, { target: { value: "YieldUSD" } });

      expect(toDropdown).toHaveValue("YieldUSD");
    });
    it("swaps the selected currencies when the swap button is clicked", () => {
      const { container } = render(<CryptoConverter />);

      const fromDropdown = container.querySelectorAll(
        ".converter__selects-label"
      )[0];
      const toDropdown = container.querySelectorAll(
        ".converter__selects-label"
      )[1];
      const swapButton = screen.getByTestId("swap-button");

      expect(fromDropdown).toHaveTextContent("WBTC");
      expect(toDropdown).toHaveTextContent("USD");
      fireEvent.click(swapButton);

      expect(fromDropdown).toHaveTextContent("USD");
      expect(toDropdown).toHaveTextContent("WBTC");
    });
    it("calculates and displays the correct result when amount is changed", async () => {
      render(<CryptoConverter />);

      const input = screen.getByTestId("amount-input");
      fireEvent.change(input, { target: { value: "100" } });

      await waitFor(() => {
        const resultLabel = screen.getByTestId("result-text");
        expect(resultLabel).toHaveTextContent(
          "100 WBTC = 2600282.202020202 USD"
        ); // 100 * 26002.82202020202 = 2600282.202020202
      });
    });
    it("calculates and displays the correct result when the update button is clicked", async () => {
      render(<CryptoConverter />);

      const input = screen.getByTestId("amount-input");
      fireEvent.change(input, { target: { value: "10" } });

      const updateButton = screen.getByTestId("update-button");
      fireEvent.click(updateButton);

      await waitFor(() => {
        const resultLabel = screen.getByTestId("result-text");
        expect(resultLabel).toHaveTextContent(
          "10 WBTC = 260028.2202020202 USD"
        ); // 10 * 26002.82202020202 = 260028.2202020202
      });
    });
  });
});
