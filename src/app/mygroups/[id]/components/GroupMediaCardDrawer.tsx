"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Box, Drawer } from "@mui/material";
import { useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GroupMediaCardDrawer = ({ children }: Props) => {
  const [state, setState] = useState(false);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState((prev) => !prev);
  };

  return (
    <div>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          backgroundColor: "#ffffff74",
          "&:hover": { backgroundColor: "#ffffffa6" },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="bottom" open={state} onClose={toggleDrawer}>
        <Box
          sx={{ width: "auto" }}
          role="presentation"
          // onClick={toggleDrawer}
          // onKeyDown={toggleDrawer}
        >
          {children}
        </Box>
      </Drawer>
    </div>
  );
};

export default GroupMediaCardDrawer;
