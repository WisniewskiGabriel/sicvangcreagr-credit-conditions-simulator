"use client";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Client } from "../../types";
import { useClientSearch } from "../../hooks";

interface InitialClientSelectionProps {
  mockClients: Client[];
  initialProponentesSelected: Client[];
  onAddProponente: (client: Client) => void;
  onRemoveProponente: (clientId: string) => void;
  onConfirmSelection: () => void;
  onClearSelection: () => void;
}

export const InitialClientSelection = ({
  mockClients,
  initialProponentesSelected,
  onAddProponente,
  onRemoveProponente,
  onConfirmSelection,
  onClearSelection
}: InitialClientSelectionProps) => {
  const { searchTerm, searchResults, performSearch, clearSearch } = useClientSearch(mockClients);

  const handleAddProponente = (client: Client) => {
    if (!initialProponentesSelected.find(c => c.id === client.id)) {
      onAddProponente(client);
    }
    clearSearch();
  };

  return (
    <Card
      title="Seleção de Proponentes"
      className="shadow-xl border-2 border-blue-200 dark:border-blue-800"
      subTitle="Primeiro, selecione os associados que serão Proponentes desta operação de crédito"
    >
      <div className="space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-start gap-3">
            <i className="pi pi-info-circle text-blue-500 text-xl mt-1"></i>
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Seleção Obrigatória de Proponentes
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                Os <strong>Proponentes</strong> são os associados principais desta operação de crédito. 
                Eles não poderão ser removidos posteriormente e apenas <strong>Avalistas</strong> e 
                <strong>Grupo Econômico</strong> poderão ser adicionados depois.
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Buscar Associados
            </label>
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
                <Column field="email" header="Email" />
                <Column
                  header="Ação"
                  body={(client: Client) => (
                    <Button
                      label="Selecionar"
                      icon="pi pi-plus"
                      size="small"
                      onClick={() => handleAddProponente(client)}
                      disabled={initialProponentesSelected.some(c => c.id === client.id)}
                    />
                  )}
                />
              </DataTable>
            </div>
          )}
        </div>

        {/* Selected Proponentes */}
        {initialProponentesSelected.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              Proponentes Selecionados ({initialProponentesSelected.length})
            </h3>
            <div className="border rounded-lg dark:border-gray-600 bg-green-50 dark:bg-green-900/20">
              <DataTable 
                value={initialProponentesSelected} 
                size="small"
                stripedRows
                className="text-sm"
              >
                <Column field="cpf" header="CPF" />
                <Column field="name" header="Nome" />
                <Column field="bankAccount" header="Conta" />
                <Column field="email" header="Email" />
                <Column
                  header=""
                  body={() => (
                    <Tag 
                      value="Proponente" 
                      severity="success" 
                      className="text-xs"
                    />
                  )}
                />
                <Column
                  header="Ação"
                  body={(client: Client) => (
                    <Button
                      icon="pi pi-trash"
                      severity="danger"
                      size="small"
                      text
                      onClick={() => onRemoveProponente(client.id)}
                    />
                  )}
                />
              </DataTable>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {initialProponentesSelected.length > 0 
              ? `${initialProponentesSelected.length} Proponente(s) selecionado(s)`
              : 'Nenhum Proponente selecionado'
            }
          </div>
          <div className="flex gap-3">
            <Button
              label="Limpar Seleção"
              icon="pi pi-times"
              severity="secondary"
              outlined
              onClick={onClearSelection}
              disabled={initialProponentesSelected.length === 0}
            />
            <Button
              label="Continuar"
              icon="pi pi-arrow-right"
              severity="success"
              onClick={onConfirmSelection}
              disabled={initialProponentesSelected.length === 0}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};