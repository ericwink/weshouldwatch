"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { TextField, Button, CircularProgress } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const ChatTextbox = () => {
  const [comment, setComment] = useState<string>("");
  const supabase = createClientComponentClient();
  const queryClient = useQueryClient();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const { mutate: addComment, isLoading } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.from("comments").insert([{ group_id: 36, media_id: 385687, comment: comment }]);
      if (error) {
        throw new Error(error.message);
      }
      return "success";
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", { group_id: 36 }, { media_id: 385687 }] });
      setComment("");
    },
  });

  return (
    <>
      <TextField
        value={comment}
        onChange={handleChange}
      />
      <Button
        disabled={isLoading}
        onClick={() => addComment()}
      >
        {isLoading ? <CircularProgress size={25} /> : "Send"}
      </Button>
    </>
  );
};

export default ChatTextbox;
