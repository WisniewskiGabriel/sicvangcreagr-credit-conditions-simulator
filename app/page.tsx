"use client";

import { useState } from "react";
import { 
  PageHeader,
  ConfigurationReadyBanner,
  ProponentesSummaryBanner,
  InitialClientSelection,
  LoanCalculator,
  CreditTypeSelector,
  InstallmentValuesDisplay,
  CreditOperationAction,
  CreditConfirmationDialog
} from "./components";
import { Client, CreditOperationData } from "./types";
import { 
  INSTALLMENT_OPTIONS,
  ADDITIONAL_ROLE_OPTIONS,
  CREDIT_TYPES,
  MOCK_CLIENTS
} from "./constants";
import { 
  useLoanCalculator,
  useCreditTypeSelection,
  useCreditParticipants
} from "./hooks";

export default function Home() {
  // Loan calculator state
  const {
    selectedInstallments,
    setSelectedInstallments,
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    resetCalculator
  } = useLoanCalculator();

  // Credit type selection state
  const {
    selectedCreditType,
    selectedVariant,
    setSelectedVariant,
    resetCreditType,
    updateCreditType
  } = useCreditTypeSelection();

  // Credit participants management
  const {
    creditParticipants,
    addParticipant,
    removeParticipant,
    updateParticipantRole,
    addProponentes,
    clearParticipants
  } = useCreditParticipants();

  // Initial client selection state
  const [initialProponentesSelected, setInitialProponentesSelected] = useState<Client[]>([]);
  const [showInitialClientSelection, setShowInitialClientSelection] = useState<boolean>(true);
  
  // Confirmation flow state
  const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);

  // Add client to initial Proponentes selection
  const addInitialProponente = (client: Client) => {
    setInitialProponentesSelected(prev => [...prev, client]);
  };

  // Remove client from initial Proponentes selection
  const removeInitialProponente = (clientId: string) => {
    setInitialProponentesSelected(prev => prev.filter(c => c.id !== clientId));
  };

  // Confirm initial client selection and proceed to main form
  const confirmInitialSelection = () => {
    if (initialProponentesSelected.length === 0) {
      alert('Selecione pelo menos um Proponente para continuar.');
      return;
    }
    
    // Add initial proponentes to credit participants
    addProponentes(initialProponentesSelected);
    setShowInitialClientSelection(false);
  };

  // Clear initial selection
  const clearInitialSelection = () => {
    setInitialProponentesSelected([]);
  };

  // Reset to initial client selection
  const resetToInitialSelection = () => {
    setInitialProponentesSelected([]);
    clearParticipants();
    setShowInitialClientSelection(true);
    resetCreditType();
    resetCalculator();
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
    const operationData: CreditOperationData = {
      loanAmount,
      interestRate,
      installments: selectedInstallments,
      creditType: selectedCreditType,
      variant: selectedVariant,
      participants: creditParticipants
    };

    console.log('Credit Operation Data:', operationData);
    alert('Operação de crédito iniciada com sucesso!');
    setShowConfirmationDialog(false);
  };

  // Scroll to operation section
  const scrollToOperation = () => {
    document.querySelector('[data-scroll-target="credit-operation"]')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  };

  // Scroll to installment values
  const scrollToInstallmentValues = () => {
    document.querySelector('[data-scroll-target="installment-values"]')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 dark:from-gray-900 dark:to-gray-800">
      <main className="mx-auto max-w-6xl space-y-6 py-8">
        <PageHeader
          title="Simulador de crédito agrícola"
          subtitle="Condições e taxas para linhas de crédito agrícola"
        />

        {/* Initial Client Selection Screen */}
        {showInitialClientSelection ? (
          <InitialClientSelection
            mockClients={MOCK_CLIENTS}
            initialProponentesSelected={initialProponentesSelected}
            onAddProponente={addInitialProponente}
            onRemoveProponente={removeInitialProponente}
            onConfirmSelection={confirmInitialSelection}
            onClearSelection={clearInitialSelection}
          />
        ) : (
          <>
            {/* Configuration Ready Warning Banner */}
            <ConfigurationReadyBanner
              selectedCreditType={selectedCreditType}
              selectedVariant={selectedVariant}
              onScrollToOperation={scrollToOperation}
            />

            {/* Selected Proponentes Summary Banner */}
            <ProponentesSummaryBanner
              proponentes={initialProponentesSelected}
              onChangeProponentes={resetToInitialSelection}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <LoanCalculator
                loanAmount={loanAmount}
                onLoanAmountChange={setLoanAmount}
                interestRate={interestRate}
                onInterestRateChange={setInterestRate}
                selectedInstallments={selectedInstallments}
                onInstallmentsChange={setSelectedInstallments}
                installmentOptions={INSTALLMENT_OPTIONS}
                onReset={resetCalculator}
                onViewConditions={scrollToInstallmentValues}
              />

              <CreditTypeSelector
                selectedCreditType={selectedCreditType}
                selectedVariant={selectedVariant}
                creditTypes={CREDIT_TYPES}
                onCreditTypeChange={updateCreditType}
                onVariantChange={setSelectedVariant}
                onReset={resetCreditType}
              />
            </div>

            {/* Full-width installment values card */}
            <InstallmentValuesDisplay
              loanAmount={loanAmount}
              interestRate={interestRate}
              selectedInstallments={selectedInstallments}
              installmentOptions={INSTALLMENT_OPTIONS}
              onInstallmentSelect={setSelectedInstallments}
            />

            {/* Credit Operation Action Section */}
            <CreditOperationAction
              loanAmount={loanAmount}
              interestRate={interestRate}
              selectedInstallments={selectedInstallments}
              selectedCreditType={selectedCreditType}
              selectedVariant={selectedVariant}
              installmentOptions={INSTALLMENT_OPTIONS}
              onStartOperation={startConfirmationFlow}
            />
          </>
        )}

        {/* Credit Operation Confirmation Dialog */}
        <CreditConfirmationDialog
          visible={showConfirmationDialog}
          onHide={() => setShowConfirmationDialog(false)}
          loanAmount={loanAmount}
          interestRate={interestRate}
          selectedInstallments={selectedInstallments}
          selectedCreditType={selectedCreditType}
          selectedVariant={selectedVariant}
          mockClients={MOCK_CLIENTS}
          creditParticipants={creditParticipants}
          additionalRoleOptions={ADDITIONAL_ROLE_OPTIONS}
          onAddParticipant={addParticipant}
          onRemoveParticipant={removeParticipant}
          onUpdateParticipantRole={updateParticipantRole}
          onFinalize={finalizeCreditOperation}
        />
      </main>
    </div>
  );
}