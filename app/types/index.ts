export interface Client {
  id: string;
  cpf: string;
  name: string;
  bankAccount: string;
  email: string;
  phone: string;
}

export interface CreditParticipant {
  client: Client;
  role: string;
}

export interface InstallmentOption {
  label: string;
  value: number;
}

export interface RoleOption {
  label: string;
  value: string;
}

export interface CreditType {
  tipo: string;
  descricao: string;
  variantes: string[];
}

export interface CreditTypesData {
  creditos_agricolas: CreditType[];
}

export interface CreditOperationData {
  loanAmount: number;
  interestRate: number;
  installments: number;
  creditType: string;
  variant: string;
  participants: CreditParticipant[];
}