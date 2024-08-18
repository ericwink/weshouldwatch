"use client";

import { styled, alpha } from "@mui/material/styles";
import { IconButton, Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import useSearchBar from "@/src/hooks/useSearchBar";
import { isMovie, isPerson, isTV } from "@/src/lib/validateMediaType";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  marginRight: `${theme.spacing(2)}`,
  display: "flex",
  flexDirection: "row",
}));

const SearchBar = () => {
  const {
    searchTerm,
    setSearchTerm,
    suggestions,
    suggestionsLoading,
    open,
    setOpen,
  } = useSearchBar();
  const router = useRouter();

  return (
    <Search>
      <Autocomplete
        sx={{
          width: "100%",
          position: "relative",
          "& .MuiAutocomplete-clearIndicator": {
            color: "white", // Change color of the clear icon
          },
          "& .MuiAutocomplete-clearIndicator:hover": {
            color: "offwhite", // Change color on hover
          },
        }}
        noOptionsText="Type for suggestions"
        popupIcon={false}
        loading={suggestionsLoading}
        disablePortal
        blurOnSelect
        clearOnBlur={false}
        open={open}
        getOptionKey={(o) => o.id}
        onChange={(e, value) => {
          if (!value) return;
          return router.push(
            `/media/${value?.id}?media_type=${value?.media_type}`
          );
        }}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        filterOptions={(x) => x}
        id="main-search"
        options={
          suggestions && searchTerm
            ? suggestions.sort(
                (a, b) => -b.media_type.localeCompare(a.media_type)
              )
            : []
        }
        getOptionLabel={(o) => {
          if (isMovie(o)) {
            return o.title;
          }
          if (isTV(o)) return o.name;
          if (isPerson(o)) return o.name;
          return "";
        }}
        groupBy={(o) => o.media_type}
        onInputChange={(e, newValue) => setSearchTerm(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            sx={{
              p: 1,
              paddingLeft: `calc(1em)`,
              "& .MuiInputBase-input": {
                color: "white", // Change text color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove border
                },
                "&:hover fieldset": {
                  border: "none", // Remove border on hover
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove border when focused
                },
              },
            }}
          />
        )}
      />
      <IconButton
        color="inherit"
        disabled={!searchTerm}
        type="submit"
        onClick={() => router.push(`/search/${searchTerm}`)}
      >
        <SearchIcon />
      </IconButton>
    </Search>
  );
};

export default SearchBar;
