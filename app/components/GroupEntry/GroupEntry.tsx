"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import style from "./groupEntry.module.css";
import { useTransition } from "react";
import { addMediaToGroup } from "./actions";

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
  };
}

const GroupEntry = ({ collection, id, name, mediaInfo }: Props) => {
  const add = <FontAwesomeIcon icon={faCirclePlus} />;
  const check = <FontAwesomeIcon icon={faCheck} />;
  const [isPending, startTransition] = useTransition();

  const checkIfIncluded = (collection: Collection[]) => {
    for (let each of collection) {
      if (each.id === mediaInfo.mediaId) return true;
    }
    return false;
  };

  const checkResult = checkIfIncluded(collection);

  const buttonText = checkResult ? check : add;

  return (
    <li className={style.container}>
      <h1>{name}</h1>
      <button
        onClick={() => startTransition(() => addMediaToGroup(id, mediaInfo.mediaId, mediaInfo.title, mediaInfo.poster_path))}
        disabled={checkResult}
      >
        {isPending ? "loading" : buttonText}
      </button>
    </li>
  );
};

export default GroupEntry;
