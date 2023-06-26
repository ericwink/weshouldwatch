"use client";

import getPoster from "@/src/lib/getPoster";
import { Paper, Typography, Box, Avatar, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import Link from "next/link";
import ChatModal from "./Chat/ChatModal";
import InfoIcon from "@mui/icons-material/Info";

interface Props {
  media: {
    media_id: number;
    watched: boolean;
    added_reason: string;
    added_by: { user_name: string; profile_pic: string };
    genres: string[];
    media_type: string;
    poster_path: string;
    title: string;
    enabled: boolean;
  };
  groupId: number;
}

const MediaCardCollection = ({ media, groupId }: Props) => {
  return (
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
        </Box>
        <Grid
          container
          p={1}
        >
          <Grid xs={12}>
            <Typography
              variant="body2"
              component="p"
            >
              {media.added_reason}
            </Typography>
            <Grid xs={12}>
              <Typography
                variant="subtitle2"
                component="p"
              >
                - {media.added_by.user_name}
              </Typography>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
            >
              <Grid
                xs={6}
                alignItems="center"
                justifyContent="center"
              >
                <IconButton>
                  <Link
                    className="flex"
                    href={`/media/${media.media_id}/?media_type=${media.media_type}`}
                  >
                    <InfoIcon />
                  </Link>
                </IconButton>
              </Grid>
              <Grid
                xs={6}
                alignItems="center"
                justifyContent="center"
              >
                <ChatModal
                  media={media}
                  groupId={groupId}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MediaCardCollection;
