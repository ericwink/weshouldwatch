"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const removeMediaInput = z.object({
  groupId: z.string(),
  rowId: z.number(),
  userId: z.string(),
  mediaType: z.enum(["movies", "tv"]),
});

type RemoveMediaInputType = z.infer<typeof removeMediaInput>;

export const removeMedia = async (input: RemoveMediaInputType) => {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const parsedInpput = removeMediaInput.safeParse(input);
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

  const result = await supabase
    .from("group_media")
    .delete()
    .eq("id", parsedInpput.data.rowId);

  if (result.error) return { error: "There was an error, please try again" };

  revalidatePath(`mygroups/[id]/${input.mediaType}`);
};
