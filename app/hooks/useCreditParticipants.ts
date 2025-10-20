import { useState } from "react";
import { Client, CreditParticipant } from "../types";

export const useCreditParticipants = () => {
  const [creditParticipants, setCreditParticipants] = useState<CreditParticipant[]>([]);

  const addParticipant = (client: Client, role: string): boolean => {
    // Ensure we have a valid role
    if (!role) {
      alert('Selecione uma função para o associado.');
      return false;
    }

    // In confirmation modal, only allow Avalista or Grupo Econômico
    if (role === 'Proponente') {
      alert('Proponentes só podem ser selecionados no início. Use Avalista ou Grupo Econômico.');
      return false;
    }

    // Check if client is already added
    const existingParticipant = creditParticipants.find(p => p.client.id === client.id);
    
    if (existingParticipant) {
      // Update role if client exists (only if not a Proponente)
      if (existingParticipant.role !== 'Proponente') {
        setCreditParticipants(prev => 
          prev.map(p => p.client.id === client.id ? { ...p, role } : p)
        );
      } else {
        alert('Proponentes não podem ter sua função alterada.');
        return false;
      }
    } else {
      // Add new participant with specified role
      setCreditParticipants(prev => [...prev, { client, role }]);
    }

    return true;
  };

  const removeParticipant = (clientId: string): boolean => {
    // Check if client is a Proponente (cannot be removed)
    const participant = creditParticipants.find(p => p.client.id === clientId);
    if (participant && participant.role === 'Proponente') {
      alert('Proponentes não podem ser removidos. Para alterar, reinicie a seleção.');
      return false;
    }
    
    setCreditParticipants(prev => prev.filter(p => p.client.id !== clientId));
    return true;
  };

  const updateParticipantRole = (clientId: string, newRole: string): boolean => {
    // Check if client is a Proponente (cannot change role)
    const participant = creditParticipants.find(p => p.client.id === clientId);
    if (participant && participant.role === 'Proponente') {
      alert('A função de Proponentes não pode ser alterada.');
      return false;
    }

    // Don't allow changing to Proponente
    if (newRole === 'Proponente') {
      alert('Use apenas Avalista ou Grupo Econômico para novos participantes.');
      return false;
    }
    
    setCreditParticipants(prev => 
      prev.map(p => p.client.id === clientId ? { ...p, role: newRole } : p)
    );
    return true;
  };

  const addProponentes = (proponentes: Client[]) => {
    const proponenteParticipants: CreditParticipant[] = proponentes.map(client => ({
      client,
      role: 'Proponente'
    }));
    setCreditParticipants(proponenteParticipants);
  };

  const clearParticipants = () => {
    setCreditParticipants([]);
  };

  return {
    creditParticipants,
    addParticipant,
    removeParticipant,
    updateParticipantRole,
    addProponentes,
    clearParticipants
  };
};