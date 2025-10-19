"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Tag } from "primereact/tag";
import { useState } from "react";

interface Client {
  id: string;
  cpf: string;
  name: string;
  bankAccount: string;
  email: string;
  phone: string;
}

interface CreditParticipant {
  client: Client;
  role: string;
}

export default function Home() {
  const [selectedInstallments, setSelectedInstallments] = useState<number>(12);
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [selectedCreditType, setSelectedCreditType] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  
  // Confirmation flow state
  const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [creditParticipants, setCreditParticipants] = useState<CreditParticipant[]>([]);

  // Installment options
  const installmentOptions = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '6x', value: 6 },
    { label: '12x', value: 12 },
    { label: '24x', value: 24 },
    { label: '48x', value: 48 }
  ];

  // Role options for credit participants
  const roleOptions = [
    { label: 'Proponente', value: 'Proponente' },
    { label: 'Grupo Econômico', value: 'Grupo Econômico' },
    { label: 'Avalista', value: 'Avalista' }
  ];

  // Mock client database
  const mockClients: Client[] = [
    { id: '1', cpf: '123.456.789-10', name: 'João Silva Santos', bankAccount: '12345-6', email: 'joao@email.com', phone: '(11) 99999-1234' },
    { id: '2', cpf: '987.654.321-00', name: 'Maria Oliveira Costa', bankAccount: '54321-8', email: 'maria@email.com', phone: '(11) 88888-5678' },
    { id: '3', cpf: '456.789.123-45', name: 'Carlos Eduardo Lima', bankAccount: '98765-4', email: 'carlos@email.com', phone: '(11) 77777-9012' },
    { id: '4', cpf: '321.654.987-89', name: 'Ana Paula Ferreira', bankAccount: '11111-2', email: 'ana@email.com', phone: '(11) 66666-3456' },
    { id: '5', cpf: '789.123.456-12', name: 'Roberto Souza Almeida', bankAccount: '22222-3', email: 'roberto@email.com', phone: '(11) 55555-7890' },
    { id: '6', cpf: '654.321.789-56', name: 'Fernanda Costa Ribeiro', bankAccount: '33333-4', email: 'fernanda@email.com', phone: '(11) 44444-1234' }
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

  // Search clients function
  const searchClients = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = mockClients.filter(client => 
      client.cpf.includes(term) ||
      client.name.toLowerCase().includes(term.toLowerCase()) ||
      client.bankAccount.includes(term)
    );
    
    setSearchResults(filtered);
  };

  // Add client to credit participants
  const addClientToCredit = (client: Client, role: string) => {
    // Ensure we have a valid role
    if (!role) {
      alert('Selecione uma função para o cliente.');
      return;
    }

    // Check if client is already added
    const existingParticipant = creditParticipants.find(p => p.client.id === client.id);
    
    if (existingParticipant) {
      // Update role if client exists
      setCreditParticipants(prev => 
        prev.map(p => p.client.id === client.id ? { ...p, role } : p)
      );
    } else {
      // Add new participant with specified role
      setCreditParticipants(prev => [...prev, { client, role }]);
    }

    // Clear search input and results after adding client
    setSearchTerm('');
    setSearchResults([]);
  };

  // Remove client from credit participants
  const removeClientFromCredit = (clientId: string) => {
    setCreditParticipants(prev => prev.filter(p => p.client.id !== clientId));
  };

  // Update participant role
  const updateParticipantRole = (clientId: string, newRole: string) => {
    setCreditParticipants(prev => 
      prev.map(p => p.client.id === clientId ? { ...p, role: newRole } : p)
    );
  };

  // Start confirmation flow
  const startConfirmationFlow = () => {
    if (!selectedCreditType || !selectedVariant) {
      alert('Por favor, selecione o tipo de crédito e variante antes de continuar.');
      return;
    }
    setShowConfirmationDialog(true);
  };

  // Finalize credit operation
  const finalizeCreditOperation = () => {
    if (creditParticipants.length === 0) {
      alert('Adicione pelo menos um participante ao crédito.');
      return;
    }

    const hasProponente = creditParticipants.some(p => p.role === 'Proponente');
    if (!hasProponente) {
      alert('É necessário ter pelo menos um Proponente na operação.');
      return;
    }

    // Here you would typically send data to backend
    console.log('Credit Operation Data:', {
      loanAmount,
      interestRate,
      installments: selectedInstallments,
      creditType: selectedCreditType,
      variant: selectedVariant,
      participants: creditParticipants
    });

    alert('Operação de crédito iniciada com sucesso!');
    setShowConfirmationDialog(false);
    setCreditParticipants([]);
    setSearchTerm('');
    setSearchResults([]);
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
              <div className="flex justify-end gap-2">
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
                <Button 
                  label="Calcular" 
                  icon="pi pi-eye" 
                  severity="info"
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
                {/* <Button 
                  label="Confirmar Seleção" 
                  icon="pi pi-check" 
                  disabled={!selectedCreditType || !selectedVariant}
                /> */}
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

        {/* Credit Operation Action Section */}
        <Card className="shadow-xl border-2 border-blue-200 dark:border-blue-800">
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
                selectedCreditType && selectedVariant 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
              }`}>
                <i className={`pi text-xs ${
                  selectedCreditType && selectedVariant 
                    ? 'pi-check-circle' 
                    : 'pi-exclamation-triangle'
                }`}></i>
                <span className="font-medium">
                  {selectedCreditType && selectedVariant ? 'Pronto' : 'Pendente'}
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
                  {getInstallmentValue(1)}
                </p>
              </div>

              {/* Interest Rate Card */}
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <i className="pi pi-percentage text-blue-500 text-sm"></i>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Taxa</span>
                </div>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {interestRate}% a.a.
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
                  {getInstallmentValue(selectedInstallments)}
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
              {(!selectedCreditType || !selectedVariant) ? (
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
                      onClick={copyToClipboard}
                      tooltip="Copia um resumo para enviar ao cliente"
                    />
                    <Button
                      label="Iniciar Operação"
                      icon="pi pi-arrow-right"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 border-0"
                      onClick={startConfirmationFlow}
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

        {/* Credit Operation Confirmation Dialog */}
        <Dialog
          visible={showConfirmationDialog}
          style={{ width: '80vw', maxWidth: '1000px' }}
          header="Confirmar Operação de Crédito"
          modal
          onHide={() => setShowConfirmationDialog(false)}
          footer={
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {creditParticipants.length} participante(s) adicionado(s)
              </div>
              <div className="flex gap-2">
                <Button
                  label="Cancelar"
                  icon="pi pi-times"
                  severity="secondary"
                  outlined
                  onClick={() => setShowConfirmationDialog(false)}
                />
                <Button
                  label="Iniciar Operação"
                  icon="pi pi-check"
                  severity="success"
                  onClick={finalizeCreditOperation}
                  disabled={creditParticipants.length === 0}
                />
              </div>
            </div>
          }
        >
          <div className="space-y-6">
            {/* Operation Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Resumo da Operação
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Valor:</span>
                  <span className="ml-2 font-semibold">{getInstallmentValue(1)}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Taxa:</span>
                  <span className="ml-2 font-semibold">{interestRate}% ao ano</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Parcelas:</span>
                  <span className="ml-2 font-semibold">{selectedInstallments}x de {getInstallmentValue(selectedInstallments)}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Tipo:</span>
                  <span className="ml-2 font-semibold">{selectedCreditType} - {selectedVariant}</span>
                </div>
              </div>
            </div>

            {/* Client Search */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                Buscar e Adicionar Clientes
              </h3>
              <div>
                <InputText
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    searchClients(e.target.value);
                  }}
                  placeholder="Buscar por CPF, nome ou conta bancária..."
                  className="w-full"
                />
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="border rounded-lg dark:border-gray-600">
                  <DataTable 
                    value={searchResults} 
                    size="small"
                    stripedRows
                    className="text-sm"
                  >
                    <Column field="cpf" header="CPF" />
                    <Column field="name" header="Nome" />
                    <Column field="bankAccount" header="Conta" />
                    <Column
                      header="Ação"
                      body={(client: Client) => (
                        <Button
                          label="Adicionar"
                          icon="pi pi-plus"
                          size="small"
                          onClick={() => addClientToCredit(client, "Proponente")}
                          disabled={creditParticipants.some(p => p.client.id === client.id)}
                        />
                      )}
                    />
                  </DataTable>
                </div>
              )}
            </div>

            {/* Selected Participants */}
            {creditParticipants.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  Participantes da Operação
                </h3>
                <div className="border rounded-lg dark:border-gray-600">
                  <DataTable 
                    value={creditParticipants} 
                    size="small"
                    stripedRows
                    className="text-sm"
                  >
                    <Column field="client.cpf" header="CPF" />
                    <Column field="client.name" header="Nome" />
                    <Column field="client.bankAccount" header="Conta" />
                    <Column
                      field="role"
                      header="Função"
                      body={(participant: CreditParticipant) => (
                        <Dropdown
                          value={participant.role}
                          onChange={(e) => updateParticipantRole(participant.client.id, e.value)}
                          options={roleOptions}
                          className="w-full"
                        />
                      )}
                    />
                    <Column
                      header="Ação"
                      body={(participant: CreditParticipant) => (
                        <Button
                          icon="pi pi-trash"
                          severity="danger"
                          size="small"
                          text
                          onClick={() => removeClientFromCredit(participant.client.id)}
                        />
                      )}
                    />
                  </DataTable>
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </main>
    </div>
  );
}
