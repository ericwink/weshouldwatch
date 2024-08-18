import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getSearchSuggestions from "../lib/getSearchSuggestions";
import useDebounce from "./useDebounce";

const useSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const tmdbKey = process.env.MOVIE_DB_API;
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${tmdbKey}&language=en-US&page=1&include_adult=false&query=${searchTerm}`;

  const debouncedSearch = useDebounce(searchTerm);
  const {
    refetch: getSuggestions,
    data: suggestions,
    isLoading: suggestionsLoading,
  } = useQuery({
    queryKey: [searchTerm],
    queryFn: async () => await getSearchSuggestions(debouncedSearch),
    enabled: !!debouncedSearch,
  });

  return {
    setSearchTerm,
    searchTerm,
    getSuggestions,
    suggestions,
    suggestionsLoading,
  };
};

export default useSearchBar;
