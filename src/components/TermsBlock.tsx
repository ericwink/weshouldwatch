import { Box, Typography, Divider } from "@mui/material";
import Link from "next/link";

const TermsBlock = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <Typography
        variant="caption"
        textAlign="center"
      >
        Use of the service indicates agreement to our policies:
      </Typography>
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
        <Typography variant="caption">
          <Link href="/terms">Terms</Link>
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
        />
        <Typography variant="caption">
          <Link href="/privacy">Privacy</Link>
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
        />
        <Typography variant="caption">
          <Link href="/cookies">Cookies</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default TermsBlock;
