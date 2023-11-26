import * as React from "react";
import { IconButton, Drawer } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface Props {
  children: React.ReactNode;
}

const FilterDrawer = ({ children }: Props) => {
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
        {children}
      </Drawer>
    </div>
  );
};

export default FilterDrawer;
