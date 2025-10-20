# 🌾 Simulador de Condições de Crédito Agrícola - SICVANGCREAGR

## 📝 Sobre o Projeto

Este é um **protótipo** de uma tela para negociação de crédito destinada a clientes do setor agrícola. O sistema simula o processo completo de solicitação e configuração de operações de crédito rural, desde a seleção inicial de proponentes até a finalização da operação.

### 🎯 Objetivo

Desenvolver uma interface moderna e intuitiva que permita:
- Simulação de condições de crédito agrícola
- Seleção e gestão de proponentes e participantes
- Cálculo automático de parcelas e juros
- Configuração de diferentes tipos de crédito rural
- Fluxo completo de negociação de crédito

## 🌟 Funcionalidades Principais

### � **Simulador de Empréstimo**
- Cálculo automático de parcelas baseado em valor, taxa de juros e prazo
- Suporte a diferentes opções de parcelamento (1x, 2x, 6x, 12x, 24x, 48x)
- Visualização detalhada dos valores de cada parcela
- Interface responsiva com validação em tempo real

### 👥 **Gestão de Participantes**
- Seleção inicial de proponentes
- Adição de participantes com diferentes funções:
  - **Proponente**: Cliente principal da operação
  - **Grupo Econômico**: Empresas relacionadas
  - **Avalista**: Garantidores da operação
- Sistema de busca e filtro de clientes

### 🏛️ **Tipos de Crédito Agrícola**
- **Custeio**: Cobertura de despesas do ciclo produtivo
  - Pronaf Custeio, Pronamp Custeio, Custeio para Pecuária, etc.
- **Investimento**: Aquisição de bens duráveis
  - FINAME, Irrigação, Benfeitorias, Pronaf Investimento, etc.
- **CPR (Cédula de Produto Rural)**: Financiamento e comercialização
  - CPR Física/Financeira, Pré/Pós-fixada, Indexada, etc.

### � **Fluxo de Confirmação**
- Validação completa dos dados inseridos
- Revisão de todas as condições antes da finalização
- Sistema de confirmação em etapas para segurança

## � Tecnologias Utilizadas

- **Framework**: Next.js 15.5.6 com App Router
- **Bundler**: TurboPack para builds ultra-rápidos
- **UI**: PrimeReact 10.9.7 - Biblioteca completa de componentes
- **Linguagem**: TypeScript 5 para desenvolvimento type-safe
- **Estilização**: Tailwind CSS v4 com plugins do PrimeReact
- **Qualidade**: ESLint + Prettier para formatação consistente

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 20.x ou superior
- npm 10.x ou superior

### Instalação

```bash
# Clone o repositório
git clone https://github.com/WisniewskiGabriel/sicvangcreagr-credit-conditions-simulator.git

# Entre no diretório do projeto
cd sicvangcreagr-credit-conditions-simulator

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Execute o servidor de desenvolvimento com TurboPack
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

### Build de Produção

```bash
# Build para produção com TurboPack
npm run build

# Inicie o servidor de produção
npm start
```

### Qualidade de Código

```bash
# Formate o código com Prettier
npm run format

# Verifique a formatação
npm run format:check

# Execute o ESLint
npm run lint
```

## 📁 Estrutura do Projeto

```
├── app/                          # Páginas do Next.js App Router
│   ├── components/               # Componentes React reutilizáveis
│   │   ├── credit/              # Componentes específicos de crédito
│   │   │   ├── CreditConfirmationDialog.tsx
│   │   │   ├── CreditOperationAction.tsx
│   │   │   ├── CreditTypeSelector.tsx
│   │   │   ├── InitialClientSelection.tsx
│   │   │   ├── InstallmentValuesDisplay.tsx
│   │   │   └── LoanCalculator.tsx
│   │   └── ui/                  # Componentes de interface geral
│   │       ├── ConfigurationReadyBanner.tsx
│   │       ├── PageHeader.tsx
│   │       └── ProponentesSummaryBanner.tsx
│   ├── constants/               # Constantes e dados mock
│   ├── hooks/                   # Custom hooks do React
│   │   ├── useClientSearch.ts
│   │   ├── useCreditParticipants.ts
│   │   ├── useCreditTypeSelection.ts
│   │   └── useLoanCalculator.ts
│   ├── types/                   # Definições de tipos TypeScript
│   ├── utils/                   # Funções utilitárias
│   ├── globals.css             # Estilos globais + CSS do PrimeReact
│   ├── layout.tsx              # Layout raiz da aplicação
│   └── page.tsx                # Página principal
├── public/                      # Assets estáticos
├── next.config.ts              # Configuração do Next.js
├── tsconfig.json               # Configuração do TypeScript
└── package.json                # Dependências e scripts
```

## 🎨 Integração com PrimeReact

O PrimeReact está totalmente integrado com:

- **Tema**: Lara Light Blue (customizável)
- **Ícones**: PrimeIcons
- **Componentes**: Todos os componentes disponíveis para uso

Exemplo de uso:

```tsx
import { Button } from "primereact/button";
import { Card } from "primereact/card";

export default function MeuComponente() {
  return (
    <Card title="Meu Card">
      <Button label="Clique Aqui" icon="pi pi-check" />
    </Card>
  );
}
```

## � Fluxo de Uso da Aplicação

1. **Seleção Inicial**: Escolha dos proponentes principais
2. **Configuração**: Definição de valores, taxa de juros e parcelas
3. **Tipo de Crédito**: Seleção do tipo de crédito agrícola e variante
4. **Visualização**: Análise detalhada das condições calculadas
5. **Participantes**: Adição de avalistas e grupos econômicos
6. **Confirmação**: Revisão final e confirmação da operação

## 🎯 Casos de Uso

- **Gerentes de Conta**: Simulação rápida de condições para clientes
- **Analistas de Crédito**: Avaliação de propostas e cenários
- **Clientes**: Visualização transparente das condições oferecidas
- **Back Office**: Processamento de operações pré-aprovadas

## 🔧 Configurações Destacadas

### TurboPack

TurboPack está habilitado em todos os scripts npm:

- `npm run dev` - Desenvolvimento com TurboPack
- `npm run build` - Build de produção com TurboPack

### Prettier

Configurado com:

- Plugin de ordenação de classes do Tailwind CSS
- Regras de formatação consistentes
- Auto-formatação ao salvar (recomendado no editor)

## 📚 Documentação de Referência

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do PrimeReact](https://primereact.org/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação do TurboPack](https://turbo.build/pack/docs)

## 🚀 Deploy

A maneira mais fácil de fazer deploy da aplicação Next.js é usar a [Plataforma Vercel](https://vercel.com/new).

Confira a [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.

## 🤝 Contribuição

Este é um projeto protótipo. Para contribuições:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é um protótipo desenvolvido para fins de demonstração e aprendizado.

---

**Desenvolvido com ❤️ para o setor agrícola brasileiro**
