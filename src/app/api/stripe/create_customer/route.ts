import Stripe from "stripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface StripeRequest {
  record: {
    email: string;
    id: string;
  };
}

export async function POST(req: Request) {
  //  check params sent with Supabase request to ensure it has the secret key
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json({ error: "You are not authorized to call this API" }, { status: 401 });
  }

  //initialize stripe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  //pull contents of body from req, which comes from supabase webhook
  const body: StripeRequest = await req.json();
  // console.log({ body });

  try {
    // make stripe customer
    const customer = await stripe.customers.create({
      email: body.record.email,
    });
    // console.log(customer);

    const supabase = createRouteHandlerClient({ cookies });
    // update table in supabase with stripe data
    // ***THIS IS BROKEN UNTIL NEXT TEAM UPDATES TO FIX ASYNC STORAGE ISSUE****
    const { data, error } = await supabase.from("users").update({ stripe_customer: customer.id }).eq("id", body.record.id);
    console.log({ data });
    console.log({ error });

    return new Response(`stripe customer created: ${customer.id} and user table updated`);
  } catch (error: any) {
    console.log(error);
    return new Response(error.message);
  }
}
