import { useState } from "react";
import { Client, CreditParticipant } from "../types";
import { searchClients } from "../utils";

export const useClientSearch = (allClients: Client[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Client[]>([]);

  const performSearch = (term: string) => {
    setSearchTerm(term);
    const results = searchClients(allClients, term);
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  return {
    searchTerm,
    searchResults,
    performSearch,
    clearSearch
  };
};