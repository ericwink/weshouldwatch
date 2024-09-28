import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/src/lib/database.types";
import GroupMediaCard from "../components/GroupMediaCard";
import GroupMediaCardDrawer from "../components/GroupMediaCardDrawer";
import GroupMediaCardMenuHeader from "../components/GroupMediaCardMenuHeader";
import GroupMediaCardMenu from "../components/GroupMediaCardMenu";

interface Props {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const GroupMoviesPage = async ({ params, searchParams }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) redirect("/login");
  const watched = searchParams?.watched === "true";

  let query = supabase
    .from("group_media")
    .select(`*,media(*), user_public_profile ( user_name, profile_pic )`)
    .eq("group_id", `${params.id}`);

  if (searchParams?.watched) query.eq("watched", watched);

  const movies = await query;

  if (movies.error)
    throw new Error("There was an error getting your movies. Please try again");

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center">
      {movies.data.map((movie) => (
        <GroupMediaCard
          media={movie.media}
          user={movie.user_public_profile}
          key={movie.id}
        >
          <GroupMediaCardDrawer>
            <GroupMediaCardMenuHeader
              added_reason={movie.added_reason}
              user={movie.user_public_profile}
            />
            <GroupMediaCardMenu
              addedByUserId={movie.added_by}
              mediaId={movie.media_id}
              mediaType="movie"
              watched={movie.watched}
              groupId={params.id}
            />
          </GroupMediaCardDrawer>
        </GroupMediaCard>
      ))}
    </div>
  );
};

export default GroupMoviesPage;
