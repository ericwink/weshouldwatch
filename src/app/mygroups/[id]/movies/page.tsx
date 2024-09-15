import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";

interface Props {
  params: {
    id: string;
  };
}

const GroupMoviesPage = async ({ params }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) redirect("/login");

  const movies = await supabase
    .from("group_media")
    .select(`media_id,watched, media(*)`)
    .eq("group_id", `${params.id}`);

  console.log(movies);

  return <div>Movies Page</div>;
};

export default GroupMoviesPage;
