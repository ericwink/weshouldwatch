"use client";

import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, IconButton } from "@mui/material";
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
  marginRight: `${theme.spacing(2)}`,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em)`,
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
}));

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <Search>
      <form
        action=""
        onSubmit={e => {
          e.preventDefault();
          router.push(`/search/${searchTerm}`);
        }}
      >
        <StyledInputBase
          placeholder="We Should Watch..."
          inputProps={{ "aria-label": "search" }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          fullWidth
        />
        <IconButton
          color="inherit"
          disabled={!searchTerm}
          sx={{ position: "absolute", right: 0, zIndex: 9 }}
          type="submit"
        >
          <SearchIcon />
        </IconButton>
      </form>
    </Search>
  );
};

export default SearchBar;
