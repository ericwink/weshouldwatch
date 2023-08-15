import Stripe from "stripe";
import { UserAccount } from "@/src/lib/interface";
import { Typography } from "@mui/material";

const SubscriptionDetails = async ({ userAccount }: { userAccount: UserAccount }) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const subscription = await stripe.subscriptions.list({ customer: userAccount.stripe_customer!, status: "all" });
  console.log(subscription);
  const unixEndDate = subscription.data[0].current_period_end;
  const nextBillingDate = new Date(unixEndDate * 1000);
  const formattedDate = nextBillingDate.toLocaleDateString();

  const canceled = subscription.data[0].cancel_at_period_end;

  return (
    <div>
      <Typography textAlign="center">Current Subscription: {canceled ? "Canceled" : "Active"}</Typography>
      <Typography textAlign="center">
        {canceled ? "Premium Ends On:" : "Next Billing Date:"} {formattedDate}
      </Typography>
    </div>
  );
};

export default SubscriptionDetails;
