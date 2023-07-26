import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";

interface Body {
  columnToUpdate: "added_reason" | "watched";
  newValue: string | boolean;
  rowId: number;
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { columnToUpdate, newValue, rowId }: Body = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("You are not authorized to make this request", { status: 401 });

  //check user auth requirement
  let { data: group_media, error: fetchError } = await supabase.from("group_media").select("*").eq("id", rowId).single();
  if (group_media?.added_by !== user.id && columnToUpdate === "added_reason") return new Response("You are not authorized to make this request", { status: 401 });

  const { data, error } = await supabase
    .from("group_media")
    .update({ [columnToUpdate]: newValue })
    .eq("id", rowId)
    .select();

  if (error) return new Response(error.message, { status: 500 });

  return new Response("Update Successful", { status: 200 });
}
