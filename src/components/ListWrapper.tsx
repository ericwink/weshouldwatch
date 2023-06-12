"use client";

import { List } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ListWrapper({ children }: Props) {
  return <List>{children}</List>;
}
