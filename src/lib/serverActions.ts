"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import { revalidatePath } from "next/cache";

const supabase = createServerComponentClient<Database>({ cookies });

export async function addGroup(name: string) {
  const { data, error } = await supabase.from("group").insert([{ group_name: name }]);
  if (error) {
    console.log(error);
    return { error: true, message: "An error occurred. Please try again." };
  } else {
    revalidatePath("/mygroups");
    return { message: "succes!" };
  }
}

export async function deleteGroup(id: number) {
  const { data, error } = await supabase.from("group").delete().eq("id", id);
  revalidatePath("/mygroups");
  if (error) console.log({ error });
}
