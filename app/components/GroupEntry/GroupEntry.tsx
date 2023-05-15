"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import style from "./groupEntry.module.css";
import { useTransition } from "react";
import { addMediaToGroup } from "./actions";
import { Toasty, toast } from "../Toasty/Toasty";

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

  const serverAction = async () => {
    const data = await addMediaToGroup(id, mediaInfo.mediaId, mediaInfo.title, mediaInfo.poster_path);
    if (data) {
      toast.error(data, { toastId: "error1" });
    } else {
      toast.success("Movie added to group!", { toastId: "success1" });
    }
  };

  const checkResult = checkIfIncluded(collection);

  const buttonText = checkResult ? check : add;

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
      <Toasty />
    </>
  );
};

export default GroupEntry;
