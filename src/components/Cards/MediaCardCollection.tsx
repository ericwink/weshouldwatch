"use client";

import getPoster from "@/src/lib/getPoster";
import { Paper, Typography, Box, Avatar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import ChatModal from "../Chat/ChatModal";
import CardMenu from "./CardMenu";
import { useState } from "react";
import { editReason } from "@/src/lib/serverActions";
import ReasonModal from "../GroupControl/AddMedia/ReasonModal";

interface Props {
  media: {
    entry_id: number;
    media_id: number;
    watched: boolean;
    added_reason: string;
    added_by: { user_id: string; user_name: string; profile_pic: string };
    genres: string[];
    media_type: string;
    poster_path: string;
    title: string;
    enabled: boolean;
  };
  groupId: number;
}

const MediaCardCollection = ({ media, groupId }: Props) => {
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [newReason, setNewReason] = useState("");

  const updateReasonTest = async () => {
    const response = await editReason(newReason, media.entry_id, groupId);
    console.log(response);
    if (response.error) console.log(response.message);
    setShowReasonModal(false);
    console.log(response.message);
    media.added_reason = newReason; //update the object we pass down so that a click of the menu will re-render correctly. Data from page.tsx updates immediately
    setNewReason("");
  };

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
        handleSubmit={updateReasonTest}
        setReason={setNewReason}
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
