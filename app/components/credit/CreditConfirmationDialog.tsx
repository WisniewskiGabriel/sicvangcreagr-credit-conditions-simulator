"use client";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Client, CreditParticipant, RoleOption } from "../../types";
import { useClientSearch } from "../../hooks";
import { getFormattedInstallmentValue } from "../../utils";

interface CreditConfirmationDialogProps {
  visible: boolean;
  onHide: () => void;
  loanAmount: number;
  interestRate: number;
  selectedInstallments: number;
  selectedCreditType: string;
  selectedVariant: string;
  mockClients: Client[];
  creditParticipants: CreditParticipant[];
  additionalRoleOptions: RoleOption[];
  onAddParticipant: (client: Client, role: string) => boolean;
  onRemoveParticipant: (clientId: string) => boolean;
  onUpdateParticipantRole: (clientId: string, newRole: string) => boolean;
  onFinalize: () => void;
}

export const CreditConfirmationDialog = ({
  visible,
  onHide,
  loanAmount,
  interestRate,
  selectedInstallments,
  selectedCreditType,
  selectedVariant,
  mockClients,
  creditParticipants,
  additionalRoleOptions,
  onAddParticipant,
  onRemoveParticipant,
  onUpdateParticipantRole,
  onFinalize
}: CreditConfirmationDialogProps) => {
  const { searchTerm, searchResults, performSearch, clearSearch } = useClientSearch(mockClients);

  const handleAddParticipant = (client: Client) => {
    const success = onAddParticipant(client, "Avalista");
    if (success) {
      clearSearch();
    }
  };

  return (
    <Dialog
      visible={visible}
      style={{ width: '80vw', maxWidth: '1000px' }}
      header="Confirmar Operação de Crédito"
      modal
      onHide={onHide}
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
              onClick={onHide}
            />
            <Button
              label="Iniciar Operação"
              icon="pi pi-check"
              severity="success"
              onClick={onFinalize}
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
              <span className="ml-2 font-semibold">{getFormattedInstallmentValue(loanAmount, interestRate, 1)}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Taxa:</span>
              <span className="ml-2 font-semibold">{Math.round(interestRate * 100) / 100}% ao ano</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Parcelas:</span>
              <span className="ml-2 font-semibold">{selectedInstallments}x de {getFormattedInstallmentValue(loanAmount, interestRate, selectedInstallments)}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Tipo:</span>
              <span className="ml-2 font-semibold">{selectedCreditType} - {selectedVariant}</span>
            </div>
          </div>
        </div>

        {/* Client Search */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              Buscar e Adicionar Clientes
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Clientes serão adicionados como <strong>Avalista</strong> por padrão. Você pode alterar a função na tabela abaixo após adicionar.
            </p>
          </div>
          <div>
            <InputText
              value={searchTerm}
              onChange={(e) => performSearch(e.target.value)}
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
                      onClick={() => handleAddParticipant(client)}
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
                    participant.role === 'Proponente' ? (
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Proponente
                        </span>
                        <i className="pi pi-lock text-gray-400 text-xs" title="Não pode ser alterado"></i>
                      </div>
                    ) : (
                      <Dropdown
                        value={participant.role}
                        onChange={(e) => onUpdateParticipantRole(participant.client.id, e.value)}
                        options={additionalRoleOptions}
                        placeholder="Selecione função"
                        className="w-full"
                      />
                    )
                  )}
                />
                <Column
                  header="Ação"
                  body={(participant: CreditParticipant) => (
                    participant.role === 'Proponente' ? (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <i className="pi pi-lock"></i>
                        <span>Fixo</span>
                      </div>
                    ) : (
                      <Button
                        icon="pi pi-trash"
                        severity="danger"
                        size="small"
                        text
                        onClick={() => onRemoveParticipant(participant.client.id)}
                      />
                    )
                  )}
                />
              </DataTable>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};