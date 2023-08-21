"use client";

import { Container, Typography, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PaymentCancelledPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, []);

  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}
    >
      <Typography
        variant="h3"
        component="h1"
      >
        Payment Cancelled
      </Typography>
      <Typography>Your payment has not been processed, you will not be charged, and a subscription has not been purchased.</Typography>
      <Typography>
        If you are not automatically redirected to the homepage after 5 seconds please click <Link href="https://www.weshouldwatch.app/">here</Link>
      </Typography>
    </Container>
  );
};

export default PaymentCancelledPage;
