"use client";

import { Container } from "@mui/material";
import { ReactNode } from "react";

export default function ServerComponentContainer({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}
