import { Client } from "../types";

/**
 * Calculate installment value using compound interest formula
 */
export const calculateInstallmentValue = (principal: number, rate: number, periods: number): number => {
  if (periods === 1) return principal; // No interest for single payment
  
  const monthlyRate = rate / 100 / 12; // Convert annual rate to monthly decimal
  if (monthlyRate === 0) return principal / periods; // If no interest
  
  const installmentValue = principal * (monthlyRate * Math.pow(1 + monthlyRate, periods)) / 
                         (Math.pow(1 + monthlyRate, periods) - 1);
  return installmentValue;
};

/**
 * Get formatted installment value as currency string
 */
export const getFormattedInstallmentValue = (loanAmount: number, interestRate: number, installments: number): string => {
  const value = calculateInstallmentValue(loanAmount, interestRate, installments);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

/**
 * Generate client template text for sharing
 */
export const generateClientTemplate = (
  loanAmount: number, 
  interestRate: number, 
  selectedInstallments: number,
  selectedCreditType: string,
  selectedVariant: string,
  installmentOptions: { label: string; value: number }[]
): string => {
  const getInstallmentValue = (installments: number): string => {
    return getFormattedInstallmentValue(loanAmount, interestRate, installments);
  };

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

/**
 * Search clients by term (CPF, name, or bank account)
 */
export const searchClients = (clients: Client[], term: string): Client[] => {
  if (!term.trim()) {
    return [];
  }

  return clients.filter(client => 
    client.cpf.includes(term) ||
    client.name.toLowerCase().includes(term.toLowerCase()) ||
    client.bankAccount.includes(term)
  );
};

/**
 * Copy text to clipboard with fallback methods
 */
export const copyToClipboard = async (text: string): Promise<void> => {
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