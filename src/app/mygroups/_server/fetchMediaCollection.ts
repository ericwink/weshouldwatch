import type { GroupMedia } from "@/src/types";
import type { SupabaseClient } from "@supabase/supabase-js";

export const fetchMediaCollection = async (id: string, supabase: SupabaseClient) => {
    let { data: group_media, error } = await supabase
      .from("group_media")
      .select(
        `
      *,
      media (
        *
      ) , user_public_profile ( user_name, profile_pic )
    `
      )
      .eq("group_id", id)
      .order("id", { ascending: false });
    return group_media as GroupMedia[];
  };