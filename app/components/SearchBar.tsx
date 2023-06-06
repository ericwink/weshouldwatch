"use client";

import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, IconButton, FormControl, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  marginRight: `${theme.spacing(3)}`,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em)`,
    width: "100%",
  },
}));

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <>
      <Search>
        <StyledInputBase
          placeholder="We Should Watch..."
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <IconButton
          color="inherit"
          disabled={!searchTerm}
          onClick={() => {
            router.push(`/search/${searchTerm}`);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Search>
    </>
  );
};

export default SearchBar;
