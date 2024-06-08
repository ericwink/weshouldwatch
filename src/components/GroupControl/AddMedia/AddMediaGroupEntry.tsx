"use client";

import { ListItem, ListItemText, IconButton, CircularProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReasonModal from "./ReasonModal";
import type { MediaPayload } from "../../../lib/interface";
import { useAddMediaToGroup } from "@/src/hooks";

interface Props {
  media_id: number;
  id: string;
  group_name: string;
  group_media: { media_id: number | null }[];
  mediaPayload: MediaPayload;
}

export default function AddMediaGroupEntry({ id, media_id, group_name, group_media, mediaPayload }: Props) {
  const { handleSubmit, isLoading, open, setReason, setOpen, reason, isIncluded } = useAddMediaToGroup({ id, mediaPayload, group_media, media_id });

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
