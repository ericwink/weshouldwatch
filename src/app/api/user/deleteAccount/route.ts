import { getServiceSupabase } from "@/src/lib/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import { NextApiResponse } from "next";
import Stripe from "stripe";

export async function POST(req: Request, res: NextApiResponse) {
  const supabaseRoute = createRouteHandlerClient<Database>({ cookies });
  const supabase = getServiceSupabase();
  const { userId, stripeId }: { userId: string; stripeId: string } = await req.json();

  try {
    console.log(userId, stripeId);

    //check that user exists
    const {
      data: { user },
    } = await supabaseRoute.auth.getUser();
    if (!user) return new Response("You are not authorized to make this request", { status: 401 });

    //check that current user Id and requested user delete are the same
    if (user.id !== userId) return new Response("You are not authorized to make this request", { status: 401 });

    //check if user still has an active subscription
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-11-15",
    });
    const subscription = await stripe.subscriptions.list({ customer: stripeId, status: "all" });

    if (subscription.data.length > 0) {
      const canceled = subscription.data[0].cancel_at_period_end;
      const status = subscription.data[0].status;

      if (status === "active" && canceled === false) {
        console.log("still active subscription");
        return new Response("You still have an active subscription. Please cancel first, then try again", { status: 403 });
      }
    }

    //remove any folder with images
    const { data: files, error: fileError } = await supabaseRoute.storage.from("avatars").list(`${user.id}`);
    if (files) {
      files.forEach(async image => {
        await supabase.storage.from("avatars").remove([`${user.id}/${image.name}`]);
      });
    }
    if (fileError) throw new Error(fileError.message);

    const { data, error } = await supabase.from("delete_account").insert([{ user_id: user.id }]);
    if (error) console.log(error);
    if (error) throw new Error("Something went wrong, please try again");

    return new Response("Account Deleted", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
}
