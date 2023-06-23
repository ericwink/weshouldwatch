"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../lib/database.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ChatWindow = () => {
  const [comments, setComments] = useState();
  const supabase = createClientComponentClient<Database>();

  const { isLoading, error, data } = useQuery({
    queryKey: ["chat36385687"],
    queryFn: async () => {
      let { data: comments, error } = await supabase.from("comments").select("*").eq("group_id", 36).eq("media_id", 385687);
      if (error) {
        throw new Error(error.message);
      }
      return comments;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>'An error occurred try again'</div>;
  console.log(data);
  return (
    <>
      {data?.map(comment => (
        <>
          <p>Comment: {comment.comment}</p>
          <p>User: {comment.user_id}</p>
        </>
      ))}
    </>
  );
};

export default ChatWindow;

//set a state for the messages
//set a function to call out and retrieve the messages
//update the messages and update the display
