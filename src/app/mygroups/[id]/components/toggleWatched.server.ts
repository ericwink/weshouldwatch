"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const toggleWatchedInput = z.object({
  groupId: z.string(),
  mediaId: z.number(),
  watched: z.boolean(),
});

type ToggleWatchedInput = z.infer<typeof toggleWatchedInput>;

export const toggleWatched = async (input: ToggleWatchedInput) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const parsedInpput = toggleWatchedInput.safeParse(input);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You are not authorized to make this request" };

  if (parsedInpput.error) return { error: parsedInpput.error.message };

  const { data, error } = await supabase
    .from("group_media")
    .update({ watched: parsedInpput.data.watched })
    .eq("group_id", parsedInpput.data.groupId)
    .eq("media_id", parsedInpput.data.mediaId);

  if (error) return { error: error.message };

  revalidatePath('mygroups/[id]/movies')
};
