import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";

const GroupMoviesPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) redirect("/login");

  //   const movies = await supabase.from('group_media').select('id,')

  return <div>Movies Page</div>;
};

export default GroupMoviesPage;
