"use client";

import style from "./groupEntry.module.css";
import { useTransition } from "react";
import { addMediaToGroup } from "../../lib/server-actions";
import { toast } from "../Toasty/Toasty";
import { FaCheck, FaPlusCircle } from "react-icons/fa";

interface Collection {
  id: string;
  watched: boolean;
}

interface Props {
  collection: Collection[];
  id: string;
  name: string;
  mediaInfo: {
    mediaId: string;
    title: string;
    poster_path: string;
    genres: string[];
    mediaType: string;
  };
}

const GroupEntry = ({ collection, id, name, mediaInfo }: Props) => {
  const [isPending, startTransition] = useTransition();

  const checkIfIncluded = (collection: Collection[]) => {
    for (let each of collection) {
      if (each.id === mediaInfo.mediaId) return true;
    }
    return false;
  };

  const serverAction = async () => {
    const success = await addMediaToGroup(id, mediaInfo.mediaId, mediaInfo.title, mediaInfo.poster_path, mediaInfo.genres, mediaInfo.mediaType);
    if (success) {
      toast.success(`Movie added to ${name}!`, { toastId: `${id}-${mediaInfo.mediaId}-success` });
    } else {
      toast.error("Something went wrong. Please try again", { toastId: `${id}-${mediaInfo.mediaId}-fail` });
    }
  };

  const checkResult = checkIfIncluded(collection);

  const buttonText = checkResult ? <FaCheck /> : <FaPlusCircle />;

  return (
    <>
      <li className={style.container}>
        <h1>{name}</h1>
        <button
          onClick={() => startTransition(() => serverAction())}
          disabled={checkResult}
        >
          {isPending ? "loading" : buttonText}
        </button>
      </li>
    </>
  );
};

export default GroupEntry;
