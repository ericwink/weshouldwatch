"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../lib/database.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UserAvatar from "./UserAvatar";
import { Box, Paper, Typography } from "@mui/material";

const ChatWindow = () => {
  const supabase = createClientComponentClient<Database>();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", { group_id: 36 }, { media_id: 385687 }],
    queryFn: async () => {
      let { data: comments, error } = await supabase.from("comments").select("*, user_public_profile (*)").eq("group_id", 36).eq("media_id", 385687);
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
      // console.log("Change received!", payload);
      queryClient.invalidateQueries({ queryKey: ["comments", { group_id: 36 }, { media_id: 385687 }] });
    })
    .subscribe();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>'An error occurred try again'</div>;

  //manipulate the data so that for each thing if the user is the same we get an array of comments?

  //map through data
  //create a new object with all of the data, but transform comment to array
  //if next item has the same user_id as the previous item, push the comment to the previous comment array
  //repeat

  const newArray = data?.map((comment, i) => {
    let commentStore: string[] = [];
    if (data[i + 1] && comment.user_id === data[next].user_id) {
      commentStore.push(comment.comment);
    } else {
      return {
        profile_pic: comment.user_public_profile?.profile_pic,
        user_name: comment.user_public_profile?.user_name,
        comment: [...commentStore, comment.comment],
      };
    }
  });

  console.log({ newArray });

  return (
    <>
      {data?.map(comment => (
        <Box
          display="flex"
          gap={2}
          p={1}
          key={comment.id}
        >
          <Box sx={{ alignSelf: "flex-end" }}>
            <UserAvatar userImage={comment.user_public_profile?.profile_pic} />
          </Box>
          <Paper sx={{ p: 1 }}>
            <Typography variant="subtitle1">{comment.user_public_profile?.user_name}</Typography>
            <Typography>{comment.comment}</Typography>
          </Paper>
        </Box>
      ))}
    </>
  );
};

export default ChatWindow;
