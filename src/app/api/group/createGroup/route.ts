import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/src/lib/database.types";
import { revalidateTag } from "next/cache";
import { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { groupName }: { groupName: string } = await req.json();

  //check that user exists
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Response("You are not authorized to make this request", { status: 401 });

  try {
    //pull list of groups created
    let { data: groups, error: groupsError } = await supabase.from("group").select("*").eq("created_by", user.id);
    if (groupsError) throw new Error(groupsError.message);

    //pull user subscription status
    let { data: userData, error: usersError } = await supabase.from("users").select("is_subscribed").single();
    if (usersError) throw new Error(usersError.message);

    if (!userData?.is_subscribed && groups!.length >= 1) return new Response("You must be subscribed to make this request", { status: 403 });

    const { data, error } = await supabase.from("group").insert([{ group_name: groupName }]);
    if (error) throw new Error(error.message);

    revalidateTag("/mygroups");
    return new Response("Group Creation Successful", { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
