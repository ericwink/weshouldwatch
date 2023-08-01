"use client";
import { Paper, Typography, Button, Divider } from "@mui/material";
import { useUserStore } from "../lib/store";
import Link from "next/link";
import { stripeCheckout } from "../lib/serverActions";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

interface Props {
  id: string;
  name: string;
  price: number;
  interval: string;
  currency: string;
  active: boolean;
}

const Pricing = ({ id, name, price, interval, currency }: Props) => {
  const displayName = name.split(" - ");
  const user = useUserStore(state => state.user);

  const loginButton = !user;
  const selectPlan = !!user && !user.is_subscribed;
  const managePlan = !!user && user.is_subscribed;

  const handleCheckout = async () => {
    const response = await stripeCheckout(id);
    if (response.error) return toast.error(`${response.message}`, { theme: "colored" });
    console.log(response);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: response.sessionId! });
  };

  return (
    <Paper sx={{ display: "flex", flexDirection: "column", gap: 1.5, p: 2, alignItems: "center", width: "250px" }}>
      <Typography
        textAlign="center"
        mb={1}
      >
        {`${displayName[0]}`}
        <br />
        {`(${displayName[1]})`}
      </Typography>
      <Typography
        variant="h4"
        mb={1}
      >{`$${price / 100}/${interval}`}</Typography>
      <Divider
        orientation="horizontal"
        flexItem
      />
      <Typography>{`Create Unlimited Groups`}</Typography>
      <Divider
        orientation="horizontal"
        flexItem
      />
      <Typography>{`Join Unlimited Groups`}</Typography>
      <Divider
        orientation="horizontal"
        flexItem
      />
      <Typography>{`Access to Journal/Live Chat`}</Typography>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ marginBottom: 1 }}
      />
      {loginButton && (
        <Button variant="contained">
          <Link href={"/login"}>Login</Link>
        </Button>
      )}
      {selectPlan && (
        <Button
          variant="contained"
          onClick={handleCheckout}
        >
          Select Plan
        </Button>
      )}
      {managePlan && (
        <Button variant="contained">
          <Link href={"/account"}>Manage Subscription</Link>
        </Button>
      )}
    </Paper>
  );
};

export default Pricing;
