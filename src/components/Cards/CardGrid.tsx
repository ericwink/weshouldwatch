"use client";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Container } from "@mui/material";
import { ReactNode } from "react";

const CardGrid = ({ children }: { children: ReactNode }) => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={1}
        justifyContent="center"
      >
        {children}
      </Grid>
    </Container>
  );
};

export default CardGrid;
