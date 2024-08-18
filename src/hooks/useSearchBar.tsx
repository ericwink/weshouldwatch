import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getSearchSuggestions from "../lib/getSearchSuggestions";
import useDebounce from "./useDebounce";

const useSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm);
  const {
    refetch: getSuggestions,
    data: suggestions,
    isLoading: suggestionsLoading,
  } = useQuery({
    queryKey: [searchTerm],
    queryFn: async () => await getSearchSuggestions(debouncedSearch),
    enabled: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (debouncedSearch) {
      console.log("TRIGGER THE FETCH");
      getSuggestions();
    }
  }, [debouncedSearch]);

  return {
    setSearchTerm,
    searchTerm,
    getSuggestions,
    suggestions,
    suggestionsLoading,
  };
};

export default useSearchBar;
