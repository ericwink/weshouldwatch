"use client";

import { useTransition } from "react";
import { FaCheck, FaPlusCircle } from "react-icons/fa";

interface Collection {
  id: string;
  watched: boolean;
}

interface Props {
  collection: Collection[];
  id: string;
  name: string;
  mediaId: string;
  serverAction: (id: string, name: string) => Promise<void>;
}

const GroupEntry = ({ collection, id, name, mediaId, serverAction }: Props) => {
  const [isPending, startTransition] = useTransition();

  const checkIfIncluded = (collection: Collection[]) => {
    for (let each of collection) {
      if (each.id === mediaId) return true;
    }
    return false;
  };

  const checkResult = checkIfIncluded(collection);

  const buttonText = checkResult ? <FaCheck /> : <FaPlusCircle />;

  return (
    <li className="flex justify-between items-center">
      <h1>{name}</h1>

      <button
        onClick={() => startTransition(() => serverAction(id))}
        disabled={checkResult}
      >
        {isPending ? "loading" : buttonText}
      </button>
    </li>
  );
};

export default GroupEntry;
