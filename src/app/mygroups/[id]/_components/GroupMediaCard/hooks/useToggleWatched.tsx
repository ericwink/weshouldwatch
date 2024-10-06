import { toast } from "react-toastify";
import { TransitionStartFunction } from "react";
import { toggleWatched } from "../../../_server/toggleWatched.server";

interface Args {
  watched: boolean;
  groupId: string;
  startTransition: TransitionStartFunction;
  userId: string;
  rowId: number;
  mediaType: "movies" | "tv";
}

const useToggleWatched = () => {
  const handleToggleWatched = async ({
    startTransition,
    watched,
    groupId,
    rowId,
    userId,
    mediaType,
  }: Args) => {
    try {
      startTransition(async () => {
        const result = await toggleWatched({
          watched: !watched,
          groupId,
          rowId,
          userId,
          mediaType,
        });
        if (result?.error) {
          if (Array.isArray(result.error)) {
            result.error.forEach((e) => toast.error(e.message));
          } else {
            toast.error(result.error);
          }
        }
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  return handleToggleWatched;
};

export default useToggleWatched;
