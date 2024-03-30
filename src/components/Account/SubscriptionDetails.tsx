import Stripe from "stripe";
import { UserAccount } from "@/src/lib/interface";
import { Typography, Box } from "@mui/material";
import RedeemIcon from "@mui/icons-material/Redeem";

const SubscriptionDetails = async ({ userAccount }: { userAccount: UserAccount }) => {
  if (userAccount.interval === "Test")
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <RedeemIcon fontSize="large" />
        <Typography textAlign="center">Looks like you were gifted a subscription! Nice!</Typography>
      </Box>
    );

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });
  const subscription = await stripe.subscriptions.list({ customer: userAccount.stripe_customer!, status: "all" });
  console.log("subscription data: ", subscription);
  const unixEndDate = subscription.data[0]?.current_period_end;

  console.log("userAccount data: ", userAccount);

  if (!unixEndDate)
    return (
      <div>
        <Typography textAlign="center">Looks like you don't have a subscription end date... Please contact support...</Typography>
      </div>
    );

  const nextBillingDate = new Date(unixEndDate * 1000);
  const formattedDate = nextBillingDate.toLocaleDateString();

  const canceled = subscription.data[0]?.cancel_at_period_end;

  return (
    <div>
      <Typography textAlign="center">Current Subscription: {canceled ? "Canceled" : "Active"}</Typography>
      <Typography textAlign="center">
        {canceled ? "Premium Ends On:" : "Next Billing Date:"} {formattedDate || "Tester"}
      </Typography>
    </div>
  );
};

export default SubscriptionDetails;
