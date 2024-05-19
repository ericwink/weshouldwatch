import * as React from "react";
import { IconButton, Drawer, Box, FormControlLabel, Switch } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import GenreChipFilter from "./GenreChipFilter";
import type { GenreFilter } from "./Cards/CardGridFilter";

interface Props {
  listView: boolean;
  setListView: React.Dispatch<React.SetStateAction<boolean>>;
  genres: GenreFilter[];
  setGenres: React.Dispatch<React.SetStateAction<GenreFilter[]>>;
}

const FilterDrawer = ({ listView, setListView, genres, setGenres }: Props) => {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setState(open);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <FilterListIcon />
      </IconButton>
      <Drawer
        anchor="bottom"
        open={state}
        onClose={toggleDrawer(false)}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
        >
          <FormControlLabel
            control={
              <Switch
                checked={listView}
                onChange={() => setListView(prev => !prev)}
              />
            }
            label="List View"
          />
        </Box>

        <GenreChipFilter
          genres={genres}
          setGenres={setGenres}
        />
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
