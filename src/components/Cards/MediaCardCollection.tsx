"use client";

import { useState } from "react";
import ChatModal from "../Chat/ChatModal";
import ReasonModal from "../../app/mygroups/[id]/components/ReasonModal";
import ConfirmDelete from "../../app/mygroups/components/ConfirmDelete";
import { toast } from "react-toastify";
import { CondensedMedia } from "@/src/lib/interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeMediaFromGroup } from "@/src/lib/supabaseClientHelper";
import axios from "axios";
import MediaBoxCard from "./MediaBoxCard";
import MediaListCard from "./MediaListCard";

interface Props {
  media: CondensedMedia;
  groupId: string;
  listView: boolean;
}

const MediaCardCollection = ({ media, groupId, listView }: Props) => {
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [newReason, setNewReason] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: removeMedia, isLoading } = useMutation({
    mutationFn: async () => await removeMediaFromGroup(media.entry_id, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupMedia", { id: groupId }, { type: media.media_type }],
      });
      setShowDeleteModal(false);
      toast.success("Media removed from group!");
    },
    onError: () =>
      toast.error("There was an error, please try again!", {
        theme: "colored",
      }),
  });

  const { mutate: updateReason, isLoading: reasonLoading } = useMutation({
    mutationFn: async () =>
      await axios.post("/api/group/editMedia", {
        columnToUpdate: "added_reason",
        newValue: newReason,
        rowId: media.entry_id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupMedia", { id: groupId }, { type: media.media_type }],
      });
      setShowReasonModal(false);
      setNewReason("");
      toast.success("Reason updated!", { theme: "colored" });
    },
    onError: () =>
      toast.error("There was an error, please try again!", {
        theme: "colored",
      }),
  });

  return (
    <>
      <ChatModal
        groupId={groupId}
        media={media}
        chatIsOpen={chatIsOpen}
        setChatIsOpen={setChatIsOpen}
      />
      <ReasonModal
        open={showReasonModal}
        setOpen={setShowReasonModal}
        handleSubmit={async () => await updateReason()}
        setReason={setNewReason}
        reason={newReason}
        isLoading={reasonLoading}
      />
      <ConfirmDelete
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        confirmDelete={() => removeMedia()}
        warningMessage="This media and all associated chats will be removed forever."
        isLoading={isLoading}
      />
      {listView ? (
        <MediaListCard
          groupId={groupId}
          media={media}
          setChatIsOpen={setChatIsOpen}
          setShowDeleteModal={setShowDeleteModal}
          setShowReasonModal={setShowReasonModal}
        />
      ) : (
        <MediaBoxCard
          groupId={groupId}
          media={media}
          setChatIsOpen={setChatIsOpen}
          setShowDeleteModal={setShowDeleteModal}
          setShowReasonModal={setShowReasonModal}
        />
      )}
    </>
  );
};

export default MediaCardCollection;
