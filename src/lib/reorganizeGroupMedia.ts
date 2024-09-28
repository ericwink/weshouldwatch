import { GroupMedia, Sorted } from "../app/mygroups/[id]/badlayout";

export const reorganizeGroupMedia = (data: GroupMedia[] | null) => {
  const sorted: Sorted = { movie: [], tv: [] };
  if (data === null) return sorted;
  for (let entry of data) {
    let newEntry = {
      entry_id: entry.id,
      media_id: entry.media_id,
      watched: entry.watched,
      added_reason: entry.added_reason,
      added_by: entry.user_public_profile ? { user_id: entry.added_by, ...entry.user_public_profile } : { user_id: "not provided", user_name: "not provided", profile_pic: "not provided" },
      genres: entry.media!.genres,
      media_type: entry.media!.media_type,
      poster_path: entry.media!.poster_path,
      title: entry.media!.title,
      enabled: true,
    };
    if (newEntry.media_type === "movie") {
      sorted.movie.push(newEntry);
    } else {
      sorted.tv.push(newEntry);
    }
  }
  return sorted;
};
