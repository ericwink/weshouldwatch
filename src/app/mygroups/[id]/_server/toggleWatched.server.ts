"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const toggleWatchedInput = z.object({
  groupId: z.string(),
  watched: z.boolean(),
  rowId: z.number(),
  userId: z.string(),
});

type ToggleWatchedInput = z.infer<typeof toggleWatchedInput>;

export const toggleWatched = async (input: ToggleWatchedInput) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const parsedInpput = toggleWatchedInput.safeParse(input);
  if (parsedInpput.error) {
    return { error: parsedInpput.error.issues };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You are not authorized to make this request" };

  const isInGroup = supabase
    .from("user_group_join")
    .select("*")
    .eq("user_id", parsedInpput.data.userId)
    .eq("group_id", parsedInpput.data.groupId)
    .single();

  if (!isInGroup)
    return { error: "You are not in this group and cannot make this change" };

  const { data, error } = await supabase
    .from("group_media")
    .update({ watched: parsedInpput.data.watched })
    .eq("id", parsedInpput.data.rowId);

  if (error) return { error: error.message };

  revalidatePath("mygroups/[id]/movies");
};
