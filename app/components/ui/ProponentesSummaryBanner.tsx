"use client";

import { Button } from "primereact/button";
import { Client } from "../../types";

interface ProponentesSummaryBannerProps {
  proponentes: Client[];
  onChangeProponentes: () => void;
}

export const ProponentesSummaryBanner = ({
  proponentes,
  onChangeProponentes
}: ProponentesSummaryBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i className="pi pi-users text-xl"></i>
          <div>
            <h3 className="font-bold text-lg">
              Proponentes Selecionados ({proponentes.length})
            </h3>
            <p className="text-sm opacity-90">
              {proponentes.map(c => c.name).join(', ')}
            </p>
          </div>
        </div>
        <Button
          label="Alterar Proponentes"
          icon="pi pi-pencil"
          size="small"
          onClick={onChangeProponentes}
        />
      </div>
    </div>
  );
};