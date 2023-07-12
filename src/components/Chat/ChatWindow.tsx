"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../lib/database.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, Paper, Typography, Avatar } from "@mui/material";
import { useRef, useEffect } from "react";

interface UserComments {
  user_name: string | undefined;
  profile_pic: string | null | undefined;
  comments: string[];
}

interface CommentData {
  comment: string;
  created_at: string;
  group_id: number;
  id: number;
  media_id: number;
  user_id: string;
  user_public_profile: {
    created_at: string | null;
    profile_pic: string | null;
    user_id: string;
    user_name: string;
  } | null;
}

const aggregateComments = (commentData: CommentData[] | null) => {
  const userComments: UserComments = {
    user_name: "",
    profile_pic: "",
    comments: [],
  };
  const chatArray: UserComments[] = [];

  commentData?.forEach((entry, i) => {
    let prevUser = commentData[i - 1]?.user_id;
    let currentUser = commentData[i].user_id;
    let nextUser = commentData[i + 1]?.user_id;

    if (currentUser === prevUser) {
      userComments.comments.push(entry.comment);
    } else {
      userComments.user_name = entry.user_public_profile?.user_name;
      userComments.profile_pic = entry.user_public_profile?.profile_pic;
      userComments.comments = [entry.comment];
    }

    if (nextUser !== currentUser) chatArray.push({ ...userComments });
  });

  return chatArray;
};

interface Props {
  groupId: number;
  mediaId: number;
}

const ChatWindow = ({ groupId, mediaId }: Props) => {
  const supabase = createClientComponentClient<Database>();
  const queryClient = useQueryClient();
  const bottomEl = useRef<null | HTMLDivElement>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", { group_id: groupId }, { media_id: mediaId }],
    queryFn: async () => {
      let { data: comments, error } = await supabase.from("comments").select("*, user_public_profile (*)").eq("group_id", groupId).eq("media_id", mediaId);
      let aggregatedComments = aggregateComments(comments);
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }
      return aggregatedComments;
    },
  });

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  // subscribe to changes in comments table

  const comments = supabase
    .channel(`channel_for_${groupId}_${mediaId}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "comments", filter: `group_id=eq.${groupId}` }, payload => {
      queryClient.invalidateQueries({ queryKey: ["comments", { group_id: groupId }, { media_id: mediaId }] });
    })
    .subscribe();

  if (isLoading) return <div>{`Loading...`}</div>;

  if (error) return <div>{`An error occurred try again`}</div>;

  return (
    <Box sx={{ maxHeight: "100%", pb: "80px", overflow: "auto" }}>
      {data?.map((comment, i) => (
        <Box
          display="flex"
          gap={2}
          p={1}
          key={i}
          ref={i === data.length - 1 ? bottomEl : null}
        >
          <Box sx={{ alignSelf: "flex-end" }}>
            <Avatar
              src={comment.profile_pic ?? ""}
              alt={comment.user_name}
            />
          </Box>
          <Paper sx={{ p: 1 }}>
            <Typography
              variant="subtitle1"
              mb={1}
            >
              {comment.user_name}
            </Typography>
            {comment.comments.map(each => (
              <div key={each}>
                <Typography>{each}</Typography>
              </div>
            ))}
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default ChatWindow;
