"use client";

import Image from "next/image";
import TMDB from "../../public/tmdblogo-small.svg";
import { Typography } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center p-0.5 opacity-50 absolute bottom-0 w-full">
      <Typography
        variant="subtitle2"
        mb={0.5}
      >
        © {year} Eric Winkelspecht
      </Typography>
      <Typography variant="subtitle2">Media Data provided by:</Typography>
      <Image
        src={TMDB}
        alt="The Movie Database Logo"
      />
    </footer>
  );
};

export default Footer;
