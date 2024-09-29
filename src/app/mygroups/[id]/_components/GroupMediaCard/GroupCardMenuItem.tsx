"use client";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactNode } from "react";

interface Props {
  onClick: () => void;
  label: string | ReactNode;
  icon: React.ReactNode;
}

const GroupCardMenuItem = ({ onClick, label, icon }: Props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

export default GroupCardMenuItem;
