import { InstallmentOption, RoleOption, CreditTypesData, Client } from "../types";

export const INSTALLMENT_OPTIONS: InstallmentOption[] = [
  { label: '1x', value: 1 },
  { label: '2x', value: 2 },
  { label: '6x', value: 6 },
  { label: '12x', value: 12 },
  { label: '24x', value: 24 },
  { label: '48x', value: 48 }
];

export const ROLE_OPTIONS: RoleOption[] = [
  { label: 'Proponente', value: 'Proponente' },
  { label: 'Grupo Econômico', value: 'Grupo Econômico' },
  { label: 'Avalista', value: 'Avalista' }
];

export const ADDITIONAL_ROLE_OPTIONS: RoleOption[] = [
  { label: 'Grupo Econômico', value: 'Grupo Econômico' },
  { label: 'Avalista', value: 'Avalista' }
];

export const CREDIT_TYPES: CreditTypesData = {
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

export const MOCK_CLIENTS: Client[] = [
  { id: '1', cpf: '123.456.789-10', name: 'João Silva Santos', bankAccount: '12345-6', email: 'joao@email.com', phone: '(11) 99999-1234' },
  { id: '2', cpf: '987.654.321-00', name: 'Maria Oliveira Costa', bankAccount: '54321-8', email: 'maria@email.com', phone: '(11) 88888-5678' },
  { id: '3', cpf: '456.789.123-45', name: 'Carlos Eduardo Lima', bankAccount: '98765-4', email: 'carlos@email.com', phone: '(11) 77777-9012' },
  { id: '4', cpf: '321.654.987-89', name: 'Ana Paula Ferreira', bankAccount: '11111-2', email: 'ana@email.com', phone: '(11) 66666-3456' },
  { id: '5', cpf: '789.123.456-12', name: 'Roberto Souza Almeida', bankAccount: '22222-3', email: 'roberto@email.com', phone: '(11) 55555-7890' },
  { id: '6', cpf: '654.321.789-56', name: 'Fernanda Costa Ribeiro', bankAccount: '33333-4', email: 'fernanda@email.com', phone: '(11) 44444-1234' }
];

export const MIN_PROFITABLE_RATE = 15;
export const DEFAULT_LOAN_AMOUNT = 10000;
export const DEFAULT_INTEREST_RATE = 5.5;
export const DEFAULT_INSTALLMENTS = 12;