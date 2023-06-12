"use client";

import { ListItem, ListItemText, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  media_id: number;
  group_name: string;
  group_media: { media_id: number | null }[];
}

export default function AddMediaGroupEntry({ media_id, group_name, group_media }: Props) {
  const checkIfIncluded = (group_media: { media_id: number | null }[]) => {
    for (let media of group_media) {
      if (media.media_id === media_id) return true;
    }
    return false;
  };

  const isIncluded = checkIfIncluded(group_media);

  const button = isIncluded ? <CheckCircleIcon /> : <AddCircleIcon />;
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label={isIncluded ? "Already In Group" : "Add to Group"}
          disabled={isIncluded}
        >
          {button}
        </IconButton>
      }
    >
      <ListItemText primary={group_name} />
    </ListItem>
  );
}
