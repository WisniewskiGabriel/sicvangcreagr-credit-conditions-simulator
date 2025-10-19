"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";

export default function Home() {
  const [selectedInstallments, setSelectedInstallments] = useState<number>(12);
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [selectedCreditType, setSelectedCreditType] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  // Installment options
  const installmentOptions = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '6x', value: 6 },
    { label: '12x', value: 12 },
    { label: '24x', value: 24 },
    { label: '48x', value: 48 }
  ];

  // Calculate installment value using compound interest formula
  const calculateInstallmentValue = (principal: number, rate: number, periods: number): number => {
    if (periods === 1) return principal; // No interest for single payment
    
    const monthlyRate = rate / 100 / 12; // Convert annual rate to monthly decimal
    if (monthlyRate === 0) return principal / periods; // If no interest
    
    const installmentValue = principal * (monthlyRate * Math.pow(1 + monthlyRate, periods)) / 
                           (Math.pow(1 + monthlyRate, periods) - 1);
    return installmentValue;
  };

  // Get formatted installment value
  const getInstallmentValue = (installments: number): string => {
    const value = calculateInstallmentValue(loanAmount, interestRate, installments);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Generate client template text
  const generateClientTemplate = (): string => {
    const template = `
💰 SIMULAÇÃO DE CRÉDITO AGRÍCOLA

📋 Detalhes do Empréstimo:
• Valor: ${getInstallmentValue(1)}
• Taxa de Juros: ${interestRate}% ao ano
• Tipo: ${selectedCreditType || 'Não selecionado'}
• Variante: ${selectedVariant || 'Não selecionada'}

💳 Opções de Parcelamento:

${installmentOptions.map(option => {
  const value = getInstallmentValue(option.value);
  const isSelected = option.value === selectedInstallments;
  const prefix = isSelected ? '🟢 ' : '⚪ ';
  const suffix = option.value === 1 ? ' (À vista - sem juros)' : ` (${option.value} parcelas)`;
  return `${prefix}${option.label}: ${value}${suffix}`;
}).join('\n')}

📞 Entre em contato para mais informações!
    `.trim();
    return template;
  };

  // Copy to clipboard function with fallback
  const copyToClipboard = async () => {
    const text = generateClientTemplate();
    
    try {
      // Check if clipboard API is available
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        alert('Informações copiadas para a área de transferência!');
      } else {
        // Fallback method for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          alert('Informações copiadas para a área de transferência!');
        } catch (fallbackErr) {
          console.error('Fallback copy failed:', fallbackErr);
          // Show the text in a prompt as last resort
          prompt('Copie o texto abaixo:', text);
        }
        
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Erro ao copiar:', err);
      // Show the text in a prompt as last resort
      prompt('Não foi possível copiar automaticamente. Copie o texto abaixo:', text);
    }
  };

  // Credit types data
  const creditTypes = {
    creditos_agricolas: [
      {
        tipo: "Custeio",
        descricao: "Cobertura de despesas temporárias do ciclo produtivo",
        variantes: [
          "Pronaf Custeio",
          "Pronamp Custeio", 
          "Custeio para Demais Produtores",
          "Custeio para Culturas Específicas",
          "Custeio para Pecuária"
        ]
      },
      {
        tipo: "Investimento",
        descricao: "Aquisição de bens ou serviços duráveis para a propriedade",
        variantes: [
          "Aquisição de Máquinas e Implementos (FINAME)",
          "Irrigação e Agricultura de Precisão",
          "Benfeitorias e Armazenagem",
          "Formação e Recuperação de Pastagens",
          "Aquisição de Animais",
          "Pronaf Investimento",
          "Pronamp Investimento",
          "Plano ABC (Agricultura de Baixa Emissão de Carbono)"
        ]
      },
      {
        tipo: "CPR",
        descricao: "Título de crédito para financiamento e comercialização",
        variantes: [
          "CPR Física",
          "CPR Financeira",
          "CPR Pré-Fixada",
          "CPR Pós-Fixada",
          "CPR Indexada",
          "CPR de Entrega Escalonada"
        ]
      }
    ]
  };

  // Get current credit type data
  const getCurrentCreditType = () => {
    return creditTypes.creditos_agricolas.find(credit => credit.tipo === selectedCreditType);
  };

  // Get available variants based on selected credit type
  const getAvailableVariants = () => {
    const currentType = getCurrentCreditType();
    return currentType ? currentType.variantes.map(variant => ({ label: variant, value: variant })) : [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <main className="mx-auto max-w-6xl space-y-6 py-8">
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-800 dark:text-white">
            Simulador de crédito agrícola
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Condições e taxas para linhas de crédito agrícola 
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            title="Calculadora de Empréstimo"
            className="shadow-lg"
            footer={
              <div className="flex justify-between items-center">
                <Button
                  label="Copiar Resumo"
                  icon="pi pi-copy"
                  severity="info"
                  outlined
                  size="small"
                  onClick={copyToClipboard}
                  tooltip="Copia um resumo para enviar ao cliente"
                />
                <div className="flex gap-2">
                  <Button
                    label="Limpar"
                    icon="pi pi-refresh"
                    severity="secondary"
                    outlined
                    onClick={() => {
                      setLoanAmount(10000);
                      setInterestRate(5.5);
                      setSelectedInstallments(12);
                    }}
                  />
                  <Button label="Calcular" icon="pi pi-calculator" />
                </div>
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
                  onValueChange={(e) => setLoanAmount(e.value ?? 0)}
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
                <InputNumber
                  id="interestRate"
                  value={interestRate}
                  onValueChange={(e) => setInterestRate(e.value ?? 0)}
                  minFractionDigits={2}
                  maxFractionDigits={2}
                  className="w-full"
                />
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
                  onChange={(e) => setSelectedInstallments(e.value)}
                  options={installmentOptions}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

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
                  onClick={() => {
                    setSelectedCreditType("");
                    setSelectedVariant("");
                  }}
                />
                <Button 
                  label="Confirmar Seleção" 
                  icon="pi pi-check" 
                  disabled={!selectedCreditType || !selectedVariant}
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
                  onChange={(e) => {
                    setSelectedCreditType(e.value);
                    setSelectedVariant(""); // Reset variant when type changes
                  }}
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
                  onChange={(e) => setSelectedVariant(e.value)}
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
        </div>

        {/* Full-width installment values card */}
        <Card
          title="Valores por Parcelamento"
          className="shadow-lg"
          subTitle={`Baseado no valor de ${getInstallmentValue(1)} com ${interestRate}% ao ano`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {installmentOptions.map((option) => {
              const isSelected = option.value === selectedInstallments;
              const value = getInstallmentValue(option.value);
              
              return (
                <div
                  key={option.value}
                  className={`rounded-lg p-4 border-2 transition-all duration-200 cursor-pointer text-center ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400 transform scale-105'
                      : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:transform hover:scale-102'
                  }`}
                  onClick={() => setSelectedInstallments(option.value)}
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

        {/* <Card title="Quick Start" className="shadow-lg">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                1
              </span>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  Development Server
                </p>
                <code className="mt-1 block rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                  npm run dev
                </code>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                2
              </span>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  Production Build
                </p>
                <code className="mt-1 block rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                  npm run build
                </code>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                3
              </span>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  Format Code
                </p>
                <code className="mt-1 block rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800">
                  npm run format
                </code>
              </div>
            </div>
          </div>
        </Card> */}
      </main>
    </div>
  );
}
