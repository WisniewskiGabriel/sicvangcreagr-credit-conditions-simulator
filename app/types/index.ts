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

// Authentication types
export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  user_metadata?: any;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  getUser: () => Promise<User | null>;
}