"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { revalidatePath } from "next/cache";
import type { MediaPayload } from "./interface";
import Stripe from "stripe";
import sgMail from "@sendgrid/mail";
import { z } from "zod";
import { stringValidator, mediaPayloadValidator } from "./validators";

const supabase = createServerComponentClient<Database>({ cookies });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

// create a group, here rather than API becuase revalidatePath doesn't work there for some reason
export async function createGroup(groupName: string) {
  try {
    //check that user exists
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: true, message: "You are not authorized to make this request" };

    stringValidator.parse(groupName);

    //pull list of groups created
    let { data: groups, error: groupsError } = await supabase.from("group").select("*").eq("created_by", user.id);
    if (groupsError) throw new Error(groupsError.message);

    //pull user subscription status
    let { data: userData, error: usersError } = await supabase.from("users").select("is_subscribed").single();
    if (usersError) throw new Error(usersError.message);

    if (!userData?.is_subscribed && groups!.length >= 1) return { error: true, message: "You must be a Premium member to make multiple groups" };

    const { data, error } = await supabase.from("group").insert([{ group_name: groupName }]);
    if (error) throw new Error(error.message);

    revalidatePath("/mygroups");
    return { error: false, message: "Group created successfully" };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: true, message: error.issues[0].message };
    console.log(error);
    return { error: true, message: "There was an error. Please try again" };
  }
}

export async function deleteGroup(id: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: true, message: "You are not authorized to make this request" };

    stringValidator.parse(id);

    const { data, error } = await supabase.from("group").delete().eq("id", id);
    if (error) throw new Error(error.message);

    revalidatePath("/mygroups");

    return { error: false, message: "Group Deleted!" };
  } catch (error) {
    if (error instanceof z.ZodError) return { error: true, message: error.issues[0].message };
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  }
}

export async function leaveGroup(id: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: true, message: "You are not authorized to make this request" };

    stringValidator.parse(id);

    let { error: userExitError } = await supabase.from("user_group_join").delete().eq("user_id", user.id).eq("group_id", id);
    if (userExitError) throw new Error(userExitError.message);

    //if user has this group as their selected primary, remove it and null the date
    let { data: checkPrimaryJoined, error: checkPrimaryJoinedError } = await supabase.from("users").select("primary_joined").single();
    if (checkPrimaryJoinedError) throw new Error(checkPrimaryJoinedError.message);

    if (checkPrimaryJoined?.primary_joined === id) {
      const { data, error: primaryJoinedUpdateError } = await supabase.from("users").update({ primary_joined: null, primary_joined_update: null }).eq("id", user.id);
      if (primaryJoinedUpdateError) throw new Error(primaryJoinedUpdateError.message);
    }

    revalidatePath("/mygroups");
    return { error: false, message: "You have successfully left the group!" };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: true, message: error.issues[0].message };
    console.log(error);
    return { error: true, message: "An error occurred. Please try again" };
  }
}

export async function addMedia(mediaPayload: MediaPayload) {
  try {
    mediaPayloadValidator.parse(mediaPayload);

    const { data, error } = await supabase.from("media").insert([{ ...mediaPayload }]);
    if (error) throw new Error(error.message);
    return { message: "succes!" };
  } catch (error) {
    if (error instanceof z.ZodError) return { error: true, message: error.issues[0].message };
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  }
}

export async function addMediaToGroup(mediaPayload: MediaPayload, groupId: string, reason: string) {
  try {
    mediaPayloadValidator.parse(mediaPayload);
    stringValidator.parse(groupId);
    stringValidator.parse(reason);

    const result = await addMedia(mediaPayload);
    if (result.error) throw new Error(result.message);

    const { data, error } = await supabase.from("group_media").insert([{ group_id: groupId, added_reason: reason, watched: false, media_id: mediaPayload.tmdb_id }]);
    if (error) throw new Error(error.message);

    revalidatePath(`/media/${mediaPayload.tmdb_id}?media_type=${mediaPayload.media_type}`);
    return { error: false, message: "Successfully added to group!" };
  } catch (error) {
    if (error instanceof z.ZodError) return { error: true, message: error.issues[0].message };
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  }
}

export async function acceptInvite(group_id: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: true, message: "An error occurred. Please sign in and try again." };

    stringValidator.parse(group_id);

    //pull list of groups user has access to
    let { data: groups, error: groupsError } = await supabase.from("group").select("*");
    if (groupsError) throw new Error(groupsError.message);
    if (groups === null) groups = [];

    let groupsJoined = 0;
    for (let group of groups) {
      if (group.id === group_id) return { error: true, message: "You are already a member of this group" };
      if (group.created_by !== user.id) groupsJoined++;
    }

    //pull user subscription status
    let { data: userData, error: usersError } = await supabase.from("users").select("is_subscribed").single();
    if (usersError) throw new Error(usersError.message);
    const isSubscribed = userData?.is_subscribed;

    if (!isSubscribed && groupsJoined >= 1) return { error: true, message: "Sign up for Premium to join more than one group" };

    const { data, error } = await supabase.from("user_group_join").insert([{ group_id: group_id, user_id: user.id }]);
    if (error) throw new Error(error.message);

    //update user record
    const { data: userUpdate, error: userUpdateError } = await supabase.from("users").update({ primary_joined: group_id, primary_joined_update: null }).eq("id", user.id);
    if (userUpdateError) throw new Error(userUpdateError.message);

    return { error: false, message: "Invitation accepted!" };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: true, message: error.issues[0].message };
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  }
}

export async function stripeCheckout(priceId: string) {
  try {
    //get current session from jwt
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: true, message: "An error occurred. Please sign in and try again." };

    stringValidator.parse(priceId);

    //get stripe customer id based on above session

    let { data, error } = await supabase.from("users").select("stripe_customer").single();
    if (!data) return { error: true, message: "No stripe customer found. Please contact support" };
    if (error) throw new Error(error.message);

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
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: true, message: error.issues[0].message };
    console.log(error);
    return { error: true, message: "There was an error. Please try again" };
  }
}

export async function stripeCustomerPortal() {
  try {
    //get current session from jwt
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: true, message: "An error occurred. Please sign in and try again." };

    //get stripe customer id based on above session
    let { data, error } = await supabase.from("users").select("stripe_customer").single();
    if (!data) return { error: true, message: "No stripe customer found. Please contact support" };
    if (error) throw new Error(error.message);

    const session = await stripe.billingPortal.sessions.create({
      customer: data.stripe_customer!,
      return_url: `${process.env.HOST_URL}/account`,
    });

    return { error: false, sessionUrl: session.url };
  } catch (error: any) {
    console.log(error);
    return { error: true, message: "There was an error. Please try again" };
  }
}

export async function updatePrimary(columnName: "primary_created" | "primary_joined", groupId: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: true, message: "An error occurred. Please sign in and try again." };

    stringValidator.parse(columnName);
    stringValidator.parse(groupId);

    const dateColumnName: "primary_created_update" | "primary_joined_update" = `${columnName}_update`;

    let { data: lastUpdatedData, error: dateError } = await supabase.from("users").select(dateColumnName).single();
    if (dateError) throw new Error(dateError.message);

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
    if (error) throw new Error(error.message);

    return { error: false, message: "Primary group updated!" };
  } catch (error: any) {
    if (error instanceof z.ZodError) return { error: true, message: error.issues[0].message };
    console.log(error);
    return { error: true, message: "There was an error, please try again." };
  }
}

export async function handleFormSubmit(formData: FormData) {
  try {
    const request = {
      name: formData.get("name"),
      email: formData.get("email"),
      onBehalfOf: formData.get("on-behalf-of"),
      reason: formData.get("reason"),
      allAccurate: formData.get("all-accurate"),
      consumerOrAgent: formData.get("consumer-or-agent"),
      understandDeletion: formData.get("understand-deletion"),
      agreeToPrivacyPolicy: formData.get("agree-to-privacy-policy"),
    };

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const message = {
      from: process.env.EMAIL_FROM!,
      to: "weshouldwatchmailer@gmail.com",
      subject: "IMPORTANT - DSAR FORM SUBMISSION",
      html: JSON.stringify(request),
    };

    // send the email
    await sgMail.send(message);
    return { error: false, message: "success" };
  } catch (error) {
    console.log(error);
    return { error: true, message: "there was an error" };
  }
}
