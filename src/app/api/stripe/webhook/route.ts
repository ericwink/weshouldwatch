import Stripe from "stripe";
import { getServiceSupabase } from "@/src/lib/supabase";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const headersList = headers();
  const signature = headersList.get("stripe-signature");
  const signingSecret = process.env.STRIPE_SIGNING_SECRET!;
  const payload = await req.text();
  //initialize stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature!, signingSecret);
  } catch (error: any) {
    console.log(error);
    return new Response(`Webhook error: ${error.message}`, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const subscriptionData = event.data.object as Stripe.Subscription;
  const plan = subscriptionData.items.data[0].plan.interval;
  console.log("stripe customer id: ", subscriptionData.customer);

  if (event.type === "customer.subscription.updated") {
    const { data, error } = await supabase.from("users").update({ is_subscribed: true, interval: plan }).eq("stripe_customer", subscriptionData.customer);
    console.log({ error });
  }
  if (event.type === "customer.subscription.deleted") {
    const { data, error } = await supabase.from("users").update({ is_subscribed: false, interval: null }).eq("stripe_customer", subscriptionData.customer);
    console.log({ error });
  }

  //   console.log(event);

  return NextResponse.json({ received: true });
}
