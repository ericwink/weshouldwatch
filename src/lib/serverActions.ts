"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { revalidatePath } from "next/cache";
import type { mediaPayload } from "./interface";

const supabase = createServerComponentClient<Database>({ cookies });

export async function addGroup(name: string) {
  const { data, error } = await supabase.from("group").insert([{ group_name: name }]);
  if (error) {
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  } else {
    revalidatePath("/mygroups");
    return { error: false, message: "succes!" };
  }
}

export async function deleteGroup(id: number) {
  const { data, error } = await supabase.from("group").delete().eq("id", id);
  revalidatePath("/mygroups");
  if (error) console.log({ error });
}

export async function addMedia(mediaPayload: mediaPayload) {
  const { data, error } = await supabase.from("media").insert([{ ...mediaPayload }]);
  if (error && error.code !== "23505") {
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  } else {
    return { message: "succes!" };
  }
}

export async function addMediaToGroup(mediaPayload: mediaPayload, groupId: number, reason: string) {
  console.log(reason);
  const result = await addMedia(mediaPayload);
  if (result.error) return result;
  const { data, error } = await supabase.from("group_media").insert([{ group_id: groupId, added_reason: reason, watched: false, media_id: mediaPayload.tmdb_id }]);
  if (error) {
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  } else {
    revalidatePath(`/media/${mediaPayload.tmdb_id}?media_type=${mediaPayload.media_type}`);
    return { error: false, message: "succes!" };
  }
}
