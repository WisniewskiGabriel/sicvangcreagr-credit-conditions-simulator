"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { CreditType, CreditTypesData } from "../../types";

interface CreditTypeSelectorProps {
  selectedCreditType: string;
  selectedVariant: string;
  creditTypes: CreditTypesData;
  onCreditTypeChange: (creditType: string) => void;
  onVariantChange: (variant: string) => void;
  onReset: () => void;
}

export const CreditTypeSelector = ({
  selectedCreditType,
  selectedVariant,
  creditTypes,
  onCreditTypeChange,
  onVariantChange,
  onReset
}: CreditTypeSelectorProps) => {
  // Get current credit type data
  const getCurrentCreditType = (): CreditType | undefined => {
    return creditTypes.creditos_agricolas.find(credit => credit.tipo === selectedCreditType);
  };

  // Get available variants based on selected credit type
  const getAvailableVariants = () => {
    const currentType = getCurrentCreditType();
    return currentType ? currentType.variantes.map(variant => ({ label: variant, value: variant })) : [];
  };

  return (
    <Card
      title="Seleção de Tipo de Crédito"
      className="shadow-lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            label="Limpar"
            icon="pi pi-times"
            severity="secondary"
            outlined
            onClick={onReset}
          />
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="creditType"
            className="font-semibold text-gray-700 dark:text-gray-200"
          >
            Tipo de Crédito Agrícola
          </label>
          <Dropdown
            id="creditType"
            value={selectedCreditType}
            onChange={(e) => onCreditTypeChange(e.value)}
            options={creditTypes.creditos_agricolas.map(credit => ({
              label: credit.tipo,
              value: credit.tipo
            }))}
            placeholder="Selecione o tipo de crédito"
            className="w-full"
          />
        </div>

        {selectedCreditType && (
          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <i className="pi pi-info-circle mr-2"></i>
              {getCurrentCreditType()?.descricao}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="creditVariant"
            className="font-semibold text-gray-700 dark:text-gray-200"
          >
            Variante Específica
          </label>
          <Dropdown
            id="creditVariant"
            value={selectedVariant}
            onChange={(e) => onVariantChange(e.value)}
            options={getAvailableVariants()}
            placeholder={selectedCreditType ? "Selecione a variante" : "Primeiro selecione o tipo"}
            disabled={!selectedCreditType}
            className="w-full"
          />
        </div>

        {selectedCreditType && selectedVariant && (
          <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
            <div className="flex items-center gap-2">
              <i className="pi pi-check-circle text-green-600 dark:text-green-400"></i>
              <div>
                <p className="font-semibold text-green-800 dark:text-green-200">
                  Seleção Confirmada
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {selectedCreditType} - {selectedVariant}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
            Tipos Disponíveis:
          </p>
          <div className="flex flex-wrap gap-2">
            {creditTypes.creditos_agricolas.map((credit, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                {credit.tipo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};