import { useState } from "react";
import { DEFAULT_LOAN_AMOUNT, DEFAULT_INTEREST_RATE, DEFAULT_INSTALLMENTS } from "../constants";

export const useLoanCalculator = () => {
  const [selectedInstallments, setSelectedInstallments] = useState<number>(DEFAULT_INSTALLMENTS);
  const [loanAmount, setLoanAmount] = useState<number>(DEFAULT_LOAN_AMOUNT);
  const [interestRate, setInterestRate] = useState<number>(DEFAULT_INTEREST_RATE);

  const resetCalculator = () => {
    setLoanAmount(DEFAULT_LOAN_AMOUNT);
    setInterestRate(DEFAULT_INTEREST_RATE);
    setSelectedInstallments(DEFAULT_INSTALLMENTS);
  };

  return {
    selectedInstallments,
    setSelectedInstallments,
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    resetCalculator
  };
};