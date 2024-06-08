import { useState } from "react";
import { addMediaToGroup } from "../lib/serverActions";
import type { MediaPayload } from "../lib/interface";
import { toast } from "react-toastify";

interface Args {
  mediaPayload: MediaPayload;
  id: string;
  group_media: { media_id: number | null }[];
  media_id: number;
}

const useAddMediaToGroup = (args: Args) => {
  const { id, mediaPayload, group_media, media_id } = args;
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

  return { isLoading, open, setReason, handleSubmit, setOpen, reason, isIncluded };
};

export default useAddMediaToGroup;
