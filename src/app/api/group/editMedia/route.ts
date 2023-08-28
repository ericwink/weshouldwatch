import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import { editMediaValidator } from "@/src/lib/validators";
import { z } from "zod";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const body = await req.json();
  const { columnToUpdate, newValue, rowId } = editMediaValidator.parse(body);

  //check that user exists
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("You are not authorized to make this request", { status: 401 });

  try {
    let { data: group_media, error: fetchError } = await supabase.from("group_media").select("*").eq("id", rowId).single();
    if (fetchError) throw new Error(fetchError.message);

    //check user auth requirement
    if (columnToUpdate === "added_reason" && group_media?.added_by !== user.id) return new Response("You are not authorized to make this request", { status: 401 });

    const { data, error } = await supabase
      .from("group_media")
      .update({ [columnToUpdate]: newValue })
      .eq("id", rowId)
      .select();
    if (error) throw new Error(error.message);
    return new Response("Update Successful", { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) new Response(error.issues[0].message, { status: 422 });
    return new Response(error.message, { status: 500 });
  }
}
