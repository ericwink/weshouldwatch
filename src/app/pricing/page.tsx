export const revalidate = 0;

import Stripe from "stripe";
import Pricing from "@/src/components/Pricing";

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
    <div className="flex gap-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {sortedPlans.map(plan => {
        if (plan.active === true)
          return (
            <Pricing
              key={plan.id}
              {...plan}
            />
          );
      })}
    </div>
  );
};

export default PricingPage;
