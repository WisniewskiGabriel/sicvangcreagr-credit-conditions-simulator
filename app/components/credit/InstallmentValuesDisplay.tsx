"use client";

import { Card } from "primereact/card";
import { InstallmentOption } from "../../types";
import { getFormattedInstallmentValue } from "../../utils";

interface InstallmentValuesDisplayProps {
  loanAmount: number;
  interestRate: number;
  selectedInstallments: number;
  installmentOptions: InstallmentOption[];
  onInstallmentSelect: (installments: number) => void;
}

export const InstallmentValuesDisplay = ({
  loanAmount,
  interestRate,
  selectedInstallments,
  installmentOptions,
  onInstallmentSelect
}: InstallmentValuesDisplayProps) => {
  return (
    <Card
      title="Valores por Parcelamento"
      className="shadow-lg"
      subTitle={`Baseado no valor de ${getFormattedInstallmentValue(loanAmount, interestRate, 1)} com ${Math.round(interestRate * 100) / 100}% ao ano`}
      data-scroll-target="installment-values"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {installmentOptions.map((option) => {
          const isSelected = option.value === selectedInstallments;
          const value = getFormattedInstallmentValue(loanAmount, interestRate, option.value);
          
          return (
            <div
              key={option.value}
              className={`rounded-lg p-4 border-2 transition-all duration-200 cursor-pointer text-center ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400 transform scale-105'
                  : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:transform hover:scale-102'
              }`}
              onClick={() => onInstallmentSelect(option.value)}
            >
              <div className="space-y-2">
                <div>
                  <p className={`text-sm font-bold ${
                    isSelected 
                      ? 'text-blue-800 dark:text-blue-200' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {option.label}
                  </p>
                  <p className={`text-xs ${
                    isSelected 
                      ? 'text-blue-600 dark:text-blue-300' 
                      : 'text-gray-500 dark:text-gray-500'
                  }`}>
                    {option.value === 1 ? 'À vista' : 'parcelas'}
                  </p>
                </div>
                
                <div>
                  <p className={`font-bold transition-all duration-200 ${
                    isSelected 
                      ? 'text-2xl text-green-600 dark:text-green-400' 
                      : 'text-lg text-green-600 dark:text-green-400'
                  }`}>
                    {value}
                  </p>
                  <p className={`text-xs ${
                    isSelected 
                      ? 'text-blue-600 dark:text-blue-300' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {option.value === 1 ? 'valor total' : 'por parcela'}
                  </p>
                </div>

                <div className={`text-xs ${
                  isSelected 
                    ? 'text-blue-600 dark:text-blue-300' 
                    : 'text-gray-500 dark:text-gray-500'
                }`}>
                  {option.value === 1 ? 'Sem juros' : 'Juros compostos'}
                </div>

                {isSelected && (
                  <div className="mt-2 pt-2 border-t border-blue-300 dark:border-blue-600">
                    <div className="flex items-center justify-center gap-1">
                      <i className="pi pi-check-circle text-blue-600 dark:text-blue-400 text-sm"></i>
                      <span className="text-xs font-medium text-blue-800 dark:text-blue-200">
                        Selecionado
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};