"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { addMediaToGroup } from "../../../lib/server-actions";
import GroupEntry from "@/app/components/GroupEntry/GroupEntry";

interface Collection {
  id: string;
  watched: boolean;
}

interface Group {
  collection: Collection[];
  id: string;
  name: string;
}

interface Props {
  groupData: Group[];
  email: string;
  mediaInfo: {
    mediaId: string;
    title: string;
    poster_path: string;
    genres: string[];
    mediaType: string;
  };
}

const GroupSendContainer = ({ mediaInfo, groupData, email }: Props) => {
  const [reason, setReason] = useState("");

  const serverAction = async (id: string) => {
    const success = await addMediaToGroup(email, reason, id, mediaInfo.mediaId, mediaInfo.title, mediaInfo.poster_path, mediaInfo.genres, mediaInfo.mediaType);
    if (success) {
      setReason("");
    } else {
      alert("Something went wrong. Please try again");
    }
  };

  const entries = groupData.map(group => {
    return (
      <GroupEntry
        {...group}
        mediaId={mediaInfo.mediaId}
        key={group.id}
        serverAction={serverAction}
      />
    );
  });

  return (
    <div>
      <Input
        type="text"
        placeholder="Tell them why you're adding it..."
        value={reason}
        onChange={e => setReason(e.target.value)}
        className="mb-3"
      />
      <ul className="flex flex-col gap-1">{entries}</ul>
    </div>
  );
};

export default GroupSendContainer;
