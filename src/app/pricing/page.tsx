export const revalidate = 0;

import Stripe from "stripe";
import Pricing from "@/src/components/Pricing";
import FreeTier from "@/src/components/FreeTier";
import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";

interface PriceInfo {
  id: string;
  name: string;
  price: number | null;
  interval: string;
  currency: string;
  active: false;
}

const PricingPage = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const { data: prices } = await stripe.prices.list();

  const plans = await Promise.all(
    prices.map(async price => {
      const product = await stripe.products.retrieve(price.product as string);
      return {
        id: price.id,
        name: product.name,
        price: price.unit_amount!,
        interval: price.recurring?.interval as string,
        currency: price.currency,
        active: product.active,
      };
    })
  );

  const sortedPlans = plans.sort((a, b) => a.price - b.price);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", p: 2, minHeight: { xs: "100vh", md: "calc(100vh - 65px)" }, justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        <FreeTier />
        {sortedPlans.map(plan => {
          if (plan.active === true)
            return (
              <Pricing
                key={plan.id}
                {...plan}
              />
            );
        })}
      </Box>
      <Typography>
        Please review our{" "}
        <Link href="/refund">
          <b>Refund Policy</b>
        </Link>{" "}
        prior to purchase
      </Typography>
    </Container>
  );
};

export default PricingPage;
