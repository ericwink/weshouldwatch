"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      size="small"
      onClick={() => router.back()}
      sx={{ display: "flex", gap: 1, position: { xs: "relative", sm: "absolute" }, top: { sm: 2 }, left: { sm: 2 } }}
    >
      <ArrowBackIcon /> Back
    </Button>
  );
};

export default BackButton;
