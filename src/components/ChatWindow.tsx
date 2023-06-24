"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../lib/database.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ChatWindow = () => {
  const supabase = createClientComponentClient<Database>();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", { group_id: 36 }, { media_id: 385687 }],
    queryFn: async () => {
      let { data: comments, error } = await supabase.from("comments").select("*").eq("group_id", 36).eq("media_id", 385687);
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      return comments;
    },
  });

  // subscribe to changes in comments table

  const comments = supabase
    .channel("channel_for_comments")
    .on("postgres_changes", { event: "*", schema: "public", table: "comments", filter: "group_id=eq.36" }, payload => {
      console.log("Change received!", payload);
      queryClient.invalidateQueries({ queryKey: ["comments", { group_id: 36 }, { media_id: 385687 }] });
    })
    .subscribe();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>'An error occurred try again'</div>;
  return (
    <>
      {data?.map(comment => (
        <div key={comment.id}>
          <p>Comment: {comment.comment}</p>
          <p>User: {comment.user_id}</p>
        </div>
      ))}
    </>
  );
};

export default ChatWindow;
