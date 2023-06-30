"use client";
import { Paper, Box, Typography, Button } from "@mui/material";

interface Props {
  id: string;
  name: string;
  price: number;
  interval: string;
  currency: string;
  active: boolean;
}

const Pricing = ({ id, name, price, interval, currency }: Props) => {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, alignItems: "center" }}>
      <Typography
        variant="h6"
        textAlign="center"
      >
        {name}
      </Typography>
      <Typography>{`$${price / 100}/${interval}`}</Typography>
      <Typography>{`Unlimited Groups`}</Typography>
      <Typography>{`Journal/Live Chat`}</Typography>
      <Button>Select Plan</Button>
    </Paper>
  );
};

export default Pricing;
