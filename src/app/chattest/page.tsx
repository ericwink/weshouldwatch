"use client";
import ChatWindow from "@/src/components/ChatWindow";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { addComment } from "@/src/lib/serverActions";

const chatTestPage = () => {
  const [message, setMessage] = useState<string>("");
  const supabase = createClientComponentClient();

  const addComment = async (group_id: number, media_id: number, comment: string) => {
    try {
      const { data, error } = await supabase.from("comments").insert([{ group_id: group_id, media_id: media_id, comment: comment }]);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } catch (error) {
      throw new Error("Failed to add comment");
    }
  };

  const {isLoading, data, } = useMutation({
    mutationFn: async (group_id: number, media_id: number, comment: string) => {

     const { data, error } = await supabase.from("comments").insert([{ group_id: group_id, media_id: media_id, comment: comment }]);
     if (error) {
        throw new Error(error.message);
      }
      return 'success'
    },
  });

  const mutation = useMutation({
    mutationFn: addComment
  })

  const handleClick = async () => {
    mutation.mutate(36, 315011, message)
  };

  return (
    <>
      <TextField
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button onClick={handleClick}>Send</Button>
      <ChatWindow />
    </>
  );
};

export default chatTestPage;
