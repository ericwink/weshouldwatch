import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import GroupMediaCard from "../../components/GroupMediaCard";
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
    .select(`media_id,watched,added_by,media(*)`)
    .eq("group_id", `${params.id}`);

  if (movies.error)
    throw new Error("There was an error getting your movies. Please try again");

  return (
    <>
      <div>Movies Page</div>
      <div className="w-full flex flex-wrap gap-2 justify-center">
        {movies.data.map((movie) => (
          <GroupMediaCard media={movie.media} />
        ))}
      </div>
    </>
  );
};

export default GroupMoviesPage;
