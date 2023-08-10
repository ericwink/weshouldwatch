"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { revalidatePath } from "next/cache";
import type { MediaPayload } from "./interface";
import Stripe from "stripe";

const supabase = createServerComponentClient<Database>({ cookies });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

// create a group, here rather than API becuase revalidatePath doesn't work there for some reason
export async function createGroup(groupName: string) {
  //check that user exists
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: true, message: "You are not authorized to make this request" };

  //pull list of groups created
  let { data: groups, error: groupsError } = await supabase.from("group").select("*").eq("created_by", user.id);
  if (groupsError) {
    console.log(groupsError);
    return { error: true, message: "There was an error please try again" };
  }

  //pull user subscription status
  let { data: userData, error: usersError } = await supabase.from("users").select("is_subscribed").single();
  if (usersError) {
    console.log(usersError);
    return { error: true, message: "There was an error please try again" };
  }

  if (!userData?.is_subscribed && groups!.length >= 1) return { error: true, message: "You must be a Premium member to make multiple groups" };

  const { data, error } = await supabase.from("group").insert([{ group_name: groupName }]);
  // .select()
  // .single();
  if (error) {
    console.log(error);
    return { error: true, message: "There was an error please try again" };
  }

  // const { data: userUpdate, error: userUpdateError } = await supabase.from("users").update({ primary_created: data.id, primary_created_update: null }).eq("id", user.id);

  revalidatePath("/mygroups");
  return { error: false, message: "Group created successfully" };
}

export async function deleteGroup(id: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: true, message: "You are not authorized to make this request" };

  const { data, error } = await supabase.from("group").delete().eq("id", id);
  if (error) {
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  }
  revalidatePath("/mygroups");
  return { error: false, message: "Group Deleted!" };
}

export async function leaveGroup(id: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: true, message: "You are not authorized to make this request" };

  let { error: userExitError } = await supabase.from("user_group_join").delete().eq("user_id", user.id).eq("group_id", id);
  if (userExitError) return { error: true, message: "An error occurred. Please try again." };

  // do we want to remove all contributions?
  // const { error: removeMediaError } = await supabase.from("group_media").delete().eq("added_by", user.id).eq("group_id", id);
  // if (removeMediaError) return { error: true, message: "An error occurred. Please try again." };

  //if user has this group as their selected primary, remove it and null the date
  let { data: checkPrimaryJoined, error: priaryJoinedError } = await supabase.from("users").select("primary_joined").single();

  if (checkPrimaryJoined?.primary_joined === id) {
    const { data: updatePrimaryJoined, error: PrimaryJoinedError } = await supabase.from("users").update({ primary_joined: null, primary_joined_update: null }).eq("id", user.id);
    if (PrimaryJoinedError) return { error: true, message: "There was an error, please try again." };
  }

  revalidatePath("/mygroups");
  return { error: false, message: "You have successfully left the group!" };
}

export async function addMedia(mediaPayload: MediaPayload) {
  const { data, error } = await supabase.from("media").insert([{ ...mediaPayload }]);
  if (error && error.code !== "23505") {
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  }
  return { message: "succes!" };
}

export async function addMediaToGroup(mediaPayload: MediaPayload, groupId: string, reason: string) {
  const result = await addMedia(mediaPayload);
  if (result.error) return result;
  const { data, error } = await supabase.from("group_media").insert([{ group_id: groupId, added_reason: reason, watched: false, media_id: mediaPayload.tmdb_id }]);
  if (error) {
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  }
  revalidatePath(`/media/${mediaPayload.tmdb_id}?media_type=${mediaPayload.media_type}`);
  return { error: false, message: "Successfully added to group!" };
}

export async function acceptInvite(group_id: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: true, message: "An error occurred. Please sign in and try again." };

  //pull list of groups user has access to
  let { data: groups, error: groupsError } = await supabase.from("group").select("*");
  if (groupsError) return { error: true, message: "There was an error please try again" };
  if (groups === null) groups = [];

  let groupsJoined = 0;
  for (let group of groups) {
    if (group.id === group_id) return { error: true, message: "You are already a member of this group" };
    if (group.created_by !== user.id) groupsJoined++;
  }

  //pull user subscription status
  let { data: userData, error: usersError } = await supabase.from("users").select("is_subscribed").single();
  if (usersError) return { error: true, message: "There was an error please try again" };
  const isSubscribed = userData?.is_subscribed;

  if (!isSubscribed && groupsJoined >= 1) return { error: true, message: "Sign up for Premium to join more than one group" };

  const { data, error } = await supabase.from("user_group_join").insert([{ group_id: group_id, user_id: user.id }]);
  if (error) {
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  }

  //update user record
  const { data: userUpdate, error: userUpdateError } = await supabase.from("users").update({ primary_joined: group_id, primary_joined_update: null }).eq("id", user.id);
  if (userUpdateError) {
    console.log(userUpdateError);
    return { error: true, message: "An error occurred. Please try again." };
  }

  return { error: false, message: "Invitation accepted!" };
}

export async function stripeCheckout(priceId: string) {
  //get current session from jwt
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: true, message: "An error occurred. Please sign in and try again." };

  //get stripe customer id based on above session

  let { data, error } = await supabase.from("users").select("stripe_customer").single();
  if (!data) return { error: true, message: "No stripe customer found. Please contact support" };
  if (error) {
    console.log(error);
    return { error: true, message: "There was an error. Please try again" };
  }
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    customer: data.stripe_customer!,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.HOST_URL}/payment/success`,
    cancel_url: `${process.env.HOST_URL}/payment/cancelled`,
  });
  return { error: false, sessionId: session.id };
}

export async function stripeCustomerPortal() {
  //get current session from jwt
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: true, message: "An error occurred. Please sign in and try again." };

  //get stripe customer id based on above session

  let { data, error } = await supabase.from("users").select("stripe_customer").single();
  if (!data) return { error: true, message: "No stripe customer found. Please contact support" };
  if (error) {
    console.log(error);
    return { error: true, message: "There was an error. Please try again" };
  }
  const session = await stripe.billingPortal.sessions.create({
    customer: data.stripe_customer!,
    return_url: `${process.env.HOST_URL}/account`,
  });
  return { error: false, sessionUrl: session.url };
}

export async function updatePrimary(columnName: "primary_created" | "primary_joined", groupId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: true, message: "An error occurred. Please sign in and try again." };

  const dateColumnName: "primary_created_update" | "primary_joined_update" = `${columnName}_update`;

  let { data: lastUpdatedData, error: dateError } = await supabase.from("users").select(dateColumnName).single();

  type LastUpdatedData = {
    [key in "primary_created_update" | "primary_joined_update"]: string | null;
  };

  if (lastUpdatedData) {
    const storedDate = (lastUpdatedData as LastUpdatedData)[dateColumnName];
    const lastUpdate = new Date(storedDate as string);
    const currentDate = new Date();
    const millisecondsDiff = currentDate.getTime() - lastUpdate.getTime();
    const daysDifference = Math.floor(millisecondsDiff / (1000 * 60 * 60 * 24));
    if (daysDifference < 30) return { error: true, message: `Primary group can only be updated once every 30 days. Last updated ${storedDate}` };
  }

  const { data, error } = await supabase
    .from("users")
    .update({ [columnName]: groupId, [dateColumnName]: new Date().toISOString() })
    .eq("id", user.id);
  if (error) return { error: true, message: "There was an error, please try again." };
  return { error: false, message: "Primary group updated!" };
}
