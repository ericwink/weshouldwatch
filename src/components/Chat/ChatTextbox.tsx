"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { TextField, Button, CircularProgress, Box } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  groupId: number;
  mediaId: number;
}

const ChatTextbox = ({ groupId, mediaId }: Props) => {
  const [comment, setComment] = useState<string>("");
  const supabase = createClientComponentClient();
  const queryClient = useQueryClient();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const { mutate: addComment, isLoading } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.from("comments").insert([{ group_id: groupId, media_id: mediaId, comment: comment }]);
      if (error) {
        throw new Error(error.message);
      }
      return "success";
    },
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: ["comments", { group_id: 36 }, { media_id: 385687 }] });
      setComment("");
    },
  });

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 1, p: 1, backgroundColor: "white" }}>
      <TextField
        value={comment}
        onChange={handleChange}
        fullWidth
        multiline
      />
      <Button
        disabled={isLoading}
        variant="contained"
        onClick={() => addComment()}
      >
        {isLoading ? <CircularProgress size={25} /> : "Send"}
      </Button>
    </Box>
  );
};

export default ChatTextbox;
