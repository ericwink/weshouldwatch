import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getSearchSuggestions from "../lib/getSearchSuggestions";
import useDebounce from "./useDebounce";

const useSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm);
  const {
    refetch: getSuggestions,
    data: suggestions,
    isFetching: suggestionsLoading,
  } = useQuery({
    queryKey: [searchTerm],
    queryFn: async () => await getSearchSuggestions(debouncedSearch),
    enabled: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (debouncedSearch) {
      getSuggestions();
    }
  }, [debouncedSearch]);

  return {
    setSearchTerm,
    searchTerm,
    getSuggestions,
    suggestions,
    suggestionsLoading,
    open,
    setOpen,
  };
};

export default useSearchBar;
