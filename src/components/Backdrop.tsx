"use client";

import noBackground from "../../public/We Should Watch.png";
import { Box } from "@mui/material";
import Image from "next/image";

interface Props {
  path: string;
  title: string;
}

export default function Backdrop({ path, title }: Props) {
  const backdrop = path ? `https://image.tmdb.org/t/p/w1280/${path}` : noBackground;

  return (
    <Box height={10}>
      <Image
        src={backdrop}
        alt={`backdrop image for ${title}`}
        fill={true}
        objectFit="cover"
      />
    </Box>
  );
}
