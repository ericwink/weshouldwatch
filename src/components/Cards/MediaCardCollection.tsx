"use client";

import { useState } from "react";
import { Paper, Typography, Box, Avatar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import getPoster from "@/src/lib/getPoster";
import ChatModal from "../Chat/ChatModal";
import CardMenu from "./CardMenu";
import ReasonModal from "../GroupControl/AddMedia/ReasonModal";
import ConfirmDelete from "../ConfirmDelete";
import { toast } from "react-toastify";
import { CondensedMedia } from "@/src/lib/interface";
import { editReason } from "@/src/lib/serverActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeMediaFromGroup } from "@/src/lib/supabaseClientHelper";

interface Props {
  media: CondensedMedia;
  groupId: number;
  // removeMedia: (rowId: number, GroupId: number) => Promise<void>;
}

const MediaCardCollection = ({ media, groupId }: Props) => {
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [newReason, setNewReason] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();

  // const updateReasonTest = async () => {
  //   const response = await editReason(newReason, media.entry_id, groupId);
  //   if (response.error) {
  //     toast.error("There was an error, please try again!", { theme: "colored" });
  //   } else {
  //     setShowReasonModal(false);
  //     media.added_reason = newReason; //update the object we pass down so that a click of the menu will re-render correctly. Data from page.tsx updates immediately
  //     setNewReason("");
  //   }
  // };

  const { mutate: removeMedia } = useMutation({
    mutationFn: async () => await removeMediaFromGroup(media.entry_id, groupId),
    onSuccess: () => queryClient.invalidateQueries(["groupMedia", { id: groupId }]),
    onError: () => toast.error("There was an error, please try again!", { theme: "colored" }),
  });
  const { mutate: updateReason } = useMutation({
    mutationFn: async () => await editReason(newReason, media.entry_id, groupId),
    onSuccess: () => {
      queryClient.invalidateQueries(["groupMedia", { id: groupId }]);
      setShowReasonModal(false);
      setNewReason("");
    },
    onError: () => toast.error("There was an error, please try again!", { theme: "colored" }),
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
      />
      <ConfirmDelete
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        confirmDelete={() => removeMedia()}
        warningMessage="This media and all associated chats will be removed forever."
      />
      <Grid>
        <Paper
          elevation={3}
          sx={{ width: "135px" }}
        >
          <Box sx={{ height: 200, position: "relative" }}>
            <Image
              src={getPoster(media.poster_path, "200")}
              alt={media.title}
              fill={true}
              style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }}
            />
            <Avatar
              src={media.added_by.profile_pic}
              sx={{ height: 45, width: 45, position: "absolute", left: "2px", top: "2px", border: "1px", borderColor: "white", borderStyle: "solid" }}
            ></Avatar>
            <Box
              position="absolute"
              bottom="2px"
              right="2px"
            >
              <CardMenu
                groupId={groupId}
                media={media}
                setChatIsOpen={setChatIsOpen}
                setShowReasonModal={setShowReasonModal}
                setShowDeleteModal={setShowDeleteModal}
              />
            </Box>
          </Box>
          <Grid
            container
            p={1}
          >
            <Grid xs={12}>
              <Typography>{media.title}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default MediaCardCollection;
