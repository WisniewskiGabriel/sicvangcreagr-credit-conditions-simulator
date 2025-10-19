"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { getFormattedInstallmentValue, generateClientTemplate, copyToClipboard } from "../../utils";
import { InstallmentOption } from "../../types";

interface CreditOperationActionProps {
  loanAmount: number;
  interestRate: number;
  selectedInstallments: number;
  selectedCreditType: string;
  selectedVariant: string;
  installmentOptions: InstallmentOption[];
  onStartOperation: () => void;
}

export const CreditOperationAction = ({
  loanAmount,
  interestRate,
  selectedInstallments,
  selectedCreditType,
  selectedVariant,
  installmentOptions,
  onStartOperation
}: CreditOperationActionProps) => {
  const isConfigurationComplete = selectedCreditType && selectedVariant;

  const handleCopyTemplate = async () => {
    const template = generateClientTemplate(
      loanAmount,
      interestRate,
      selectedInstallments,
      selectedCreditType,
      selectedVariant,
      installmentOptions
    );
    await copyToClipboard(template);
  };

  return (
    <Card className="shadow-xl border-2 border-blue-200 dark:border-blue-800" data-scroll-target="credit-operation">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-full text-white">
              <i className="pi pi-credit-card text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Iniciar Operação de Crédito
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Revise os dados e confirme a operação
              </p>
            </div>
          </div>
          
          {/* Status Tag */}
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            isConfigurationComplete 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
              : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
          }`}>
            <i className={`pi text-xs ${
              isConfigurationComplete 
                ? 'pi-check-circle' 
                : 'pi-exclamation-triangle'
            }`}></i>
            <span className="font-medium">
              {isConfigurationComplete ? 'Pronto' : 'Pendente'}
            </span>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {/* Loan Amount Card */}
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2 mb-1">
              <i className="pi pi-dollar text-green-500 text-sm"></i>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Valor</span>
            </div>
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              {getFormattedInstallmentValue(loanAmount, interestRate, 1)}
            </p>
          </div>

          {/* Interest Rate Card */}
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2 mb-1">
              <i className="pi pi-percentage text-blue-500 text-sm"></i>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Taxa</span>
            </div>
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              {Math.round(interestRate * 100) / 100}% a.a.
            </p>
          </div>

          {/* Installments Card */}
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2 mb-1">
              <i className="pi pi-calendar text-purple-500 text-sm"></i>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Parcelas</span>
            </div>
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              {selectedInstallments}x
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {getFormattedInstallmentValue(loanAmount, interestRate, selectedInstallments)}
            </p>
          </div>

          {/* Credit Type Card */}
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2 mb-1">
              <i className="pi pi-tag text-orange-500 text-sm"></i>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Tipo</span>
            </div>
            {selectedCreditType ? (
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                  {selectedCreditType}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {selectedVariant}
                </p>
              </div>
            ) : (
              <p className="text-sm text-orange-500 font-semibold">
                Não selecionado
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {!isConfigurationComplete ? (
            <div className="text-center w-full">
              <Button
                label="Complete a Configuração"
                icon="pi pi-exclamation-triangle"
                severity="warning"
                disabled
                className="w-full sm:w-auto"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Selecione o tipo de crédito para continuar
              </p>
            </div>
          ) : (
            <div className="space-y-3 w-full">
              {/* Main Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  label="Copiar Resumo"
                  icon="pi pi-copy"
                  severity="info"
                  outlined
                  className="flex-1"
                  onClick={handleCopyTemplate}
                  tooltip="Copia um resumo para enviar ao cliente"
                />
                <Button
                  label="Iniciar Operação"
                  icon="pi pi-arrow-right"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 border-0"
                  onClick={onStartOperation}
                />
              </div>
              
              {/* Trust Indicators */}
              <div className="flex justify-center items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <i className="pi pi-shield text-green-500"></i>
                  <span>Seguro</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="pi pi-clock text-blue-500"></i>
                  <span>Rápido</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="pi pi-copy text-blue-500"></i>
                  <span>Compartilhável</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};