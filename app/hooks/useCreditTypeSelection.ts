import { useState } from "react";

export const useCreditTypeSelection = () => {
  const [selectedCreditType, setSelectedCreditType] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  const resetCreditType = () => {
    setSelectedCreditType("");
    setSelectedVariant("");
  };

  const updateCreditType = (creditType: string) => {
    setSelectedCreditType(creditType);
    setSelectedVariant(""); // Reset variant when type changes
  };

  return {
    selectedCreditType,
    selectedVariant,
    setSelectedVariant,
    resetCreditType,
    updateCreditType
  };
};