import "server-only";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";

export const userIsGroupMember = async (groupId: string) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .single();

  if (!user?.is_subscribed) {
    if (user?.primary_created !== groupId && user?.primary_joined !== groupId) {
      return false;
    }
  }

  const { data, error } = await supabase
    .from("user_group_join")
    .select("*")
    .eq("group_id", groupId)
    .eq("user_id", user.id)
    .single();

  if (!data) return false;

  return true;
};
