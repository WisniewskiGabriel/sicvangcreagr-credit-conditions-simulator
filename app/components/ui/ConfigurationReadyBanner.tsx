"use client";

interface ConfigurationReadyBannerProps {
  selectedCreditType: string;
  selectedVariant: string;
  onScrollToOperation: () => void;
}

export const ConfigurationReadyBanner = ({
  selectedCreditType,
  selectedVariant,
  onScrollToOperation
}: ConfigurationReadyBannerProps) => {
  if (!selectedCreditType || !selectedVariant) return null;

  return (
    <div 
      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      onClick={onScrollToOperation}
    >
      <div className="flex items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          <i className="pi pi-check-circle text-xl animate-pulse"></i>
          <div>
            <h3 className="font-bold text-lg">
              ✅ Configuração Completa - Pronto para Iniciar!
            </h3>
            <p className="text-sm opacity-90">
              Clique aqui para prosseguir com a operação de crédito • {selectedCreditType} - {selectedVariant}
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 ml-auto">
          <i className="pi pi-arrow-down animate-bounce"></i>
          <span className="text-sm font-medium">Clique para continuar</span>
        </div>
      </div>
    </div>
  );
};