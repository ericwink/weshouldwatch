"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import { theme } from "./theme";

type Props = {
  children: ReactNode;
};

export const MuiSetup = ({ children }: Props) => {
  return (
    <>
      <CssBaseline />
      <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
};
