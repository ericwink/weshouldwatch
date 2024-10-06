"use server";

import { z } from "zod";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import { revalidatePath } from "next/cache";

const updateReasonInput = z.object({
  newReason: z.string(),
  groupId: z.string(),
  rowId: z.number(),
  userId: z.string(),
  mediaType: z.enum(["movies", "tv"]),
});

type UpdateReasonInputType = z.infer<typeof updateReasonInput>;

export const updateReason = async (input: UpdateReasonInputType) => {
  try {
    const supabase = createServerActionClient<Database>({ cookies });
    const { data: session } = await supabase.auth.getSession();

    if (!session) return { error: "You must sign in to make this change" };

    const { data: parsedData, error: parsedError } =
      updateReasonInput.safeParse(input);
    if (parsedError) return { error: parsedError.issues };

    const { data: groupMediaEntry, error: groupMediaError } = await supabase
      .from("group_media")
      .select("*")
      .eq("id", parsedData.rowId)
      .single();

    if (groupMediaError) throw groupMediaError;

    const isAddedByRequestor = parsedData.userId === groupMediaEntry.added_by;

    if (!isAddedByRequestor)
      return { error: "You are not authorized to make this change" };

    const result = await supabase
      .from("group_media")
      .update({ added_reason: parsedData.newReason })
      .eq("id", parsedData.rowId);

    if (result.error) throw result.error;
  } catch (error) {
    console.log("Error in updateReason.server", error);
    return { error: "Something went wrong. Please try again" };
  }

  revalidatePath(`/mygroups/[id]/${input.mediaType}`);
};