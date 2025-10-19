"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { Slider } from "primereact/slider";
import { InstallmentOption } from "../../types";
import { MIN_PROFITABLE_RATE } from "../../constants";

interface LoanCalculatorProps {
  loanAmount: number;
  onLoanAmountChange: (value: number) => void;
  interestRate: number;
  onInterestRateChange: (value: number) => void;
  selectedInstallments: number;
  onInstallmentsChange: (value: number) => void;
  installmentOptions: InstallmentOption[];
  onReset: () => void;
  onViewConditions: () => void;
}

export const LoanCalculator = ({
  loanAmount,
  onLoanAmountChange,
  interestRate,
  onInterestRateChange,
  selectedInstallments,
  onInstallmentsChange,
  installmentOptions,
  onReset,
  onViewConditions
}: LoanCalculatorProps) => {
  return (
    <Card
      title="Calculadora de Empréstimo"
      className="shadow-lg"
      footer={
        <div className="flex justify-end gap-2">
          <Button
            label="Limpar"
            icon="pi pi-refresh"
            severity="secondary"
            outlined
            onClick={onReset}
          />
          <Button 
            label="Ver condições" 
            icon="pi pi-eye" 
            severity="info"
            onClick={onViewConditions}
          />
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="loanAmount"
            className="font-semibold text-gray-700 dark:text-gray-200"
          >
            Valor do Empréstimo
          </label>
          <InputNumber
            id="loanAmount"
            value={loanAmount}
            onValueChange={(e) => onLoanAmountChange(e.value ?? 0)}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="interestRate"
            className="font-semibold text-gray-700 dark:text-gray-200"
          >
            Taxa de Juros (%)
          </label>
          
          {/* Interest Rate Display with Direct Input */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <InputNumber
                value={interestRate}
                onValueChange={(e) => onInterestRateChange(Math.max(1, Math.min(30, e.value ?? 0)))}
                minFractionDigits={1}
                maxFractionDigits={2}
                min={1}
                max={30}
                className="w-24 text-xl font-bold"
                suffix="%"
              />
            </div>
            {interestRate < MIN_PROFITABLE_RATE && (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full text-sm">
                <i className="pi pi-exclamation-triangle"></i>
                <span className="font-medium">Não rentável</span>
              </div>
            )}
          </div>

          {/* Slider with Arrow Controls */}
          <div className="flex items-center gap-3 px-3">
            <Button
              icon="pi pi-chevron-left"
              size="small"
              severity="secondary"
              outlined
              onClick={() => onInterestRateChange(Math.max(1, interestRate - 0.1))}
              className="p-2"
              tooltip="Diminuir 0.1%"
            />
            <div className="flex-1">
              <Slider
                id="interestRate"
                value={interestRate}
                onChange={(e) => onInterestRateChange(e.value as number)}
                min={1}
                max={30}
                step={0.1}
                className="w-full"
              />
            </div>
            <Button
              icon="pi pi-chevron-right"
              size="small"
              severity="secondary"
              outlined
              onClick={() => onInterestRateChange(Math.min(30, interestRate + 0.1))}
              className="p-2"
              tooltip="Aumentar 0.1%"
            />
          </div>

          {/* Scale */}
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-3 mt-1">
            <span>1%</span>
            <span>5%</span>
            <span>10%</span>
            <span className="font-semibold text-orange-600 dark:text-orange-400">15% (Min. Rentável)</span>
            <span>20%</span>
            <span>25%</span>
            <span>30%</span>
          </div>

          {/* Profit Indicator */}
          <div className={`mt-2 p-2 rounded-lg text-sm ${
            interestRate >= MIN_PROFITABLE_RATE 
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
          }`}>
            <div className="flex items-center gap-2">
              <i className={`pi ${interestRate >= MIN_PROFITABLE_RATE ? 'pi-check-circle' : 'pi-exclamation-triangle'}`}></i>
              <span className="font-medium">
                {interestRate >= MIN_PROFITABLE_RATE 
                  ? `Rentável (+${(interestRate - MIN_PROFITABLE_RATE).toFixed(1)}% acima do mínimo)` 
                  : `Prejuízo (${(MIN_PROFITABLE_RATE - interestRate).toFixed(1)}% abaixo do mínimo)`
                }
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="installments"
            className="font-semibold text-gray-700 dark:text-gray-200"
          >
            Opções de Parcelamento
          </label>
          <SelectButton
            id="installments"
            value={selectedInstallments}
            onChange={(e) => onInstallmentsChange(e.value)}
            options={installmentOptions}
            className="w-full"
          />
        </div>
      </div>
    </Card>
  );
};