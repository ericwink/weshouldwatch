"use client";

import {
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { addMediaToGroup } from "../../../lib/serverActions";
import type { MediaPayload } from "../../../lib/interface";
import { useState } from "react";
import { toast } from "react-toastify";
import ReasonModal from "./ReasonModal";

interface Props {
  media_id: number;
  id: string;
  group_name: string;
  group_media: { media_id: number | null }[];
  mediaPayload: MediaPayload;
}

export default function AddMediaGroupEntry({
  id,
  media_id,
  group_name,
  group_media,
  mediaPayload,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    setOpen(false);
    setIsLoading(true);
    const result = await addMediaToGroup(mediaPayload, id, reason);
    if (result.error) {
      toast.error(`${result.message}`, { theme: "colored" });
    } else {
      toast.success(`${result.message}`, { theme: "colored" });
    }
    setIsLoading(false);
  };

  const checkIfIncluded = (group_media: { media_id: number | null }[]) => {
    for (let media of group_media) {
      if (media.media_id === media_id) return true;
    }
    return false;
  };

  const isIncluded = checkIfIncluded(group_media);

  const button = isIncluded ? <CheckCircleIcon /> : <AddCircleIcon />;
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label={isIncluded ? "Already In Group" : "Add to Group"}
            disabled={isIncluded}
            onClick={() => setOpen(true)}
          >
            {isLoading ? <CircularProgress size={25} /> : button}
          </IconButton>
        }
      >
        <ListItemText primary={group_name} />
      </ListItem>
      <ReasonModal
        open={open}
        setOpen={setOpen}
        reason={reason}
        setReason={setReason}
        handleSubmit={() => handleSubmit()}
      />
    </>
  );
}
