import { Paper, Box, Avatar, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import getPoster from "@/src/lib/getPoster";
import Image from "next/image";
import CardMenu from "./CardMenu";
import { CondensedMedia } from "@/src/lib/interface";

interface Props {
  media: CondensedMedia;
  groupId: string;
  setChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReasonModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MediaBoxCard = ({ media, groupId, setChatIsOpen, setShowDeleteModal, setShowReasonModal }: Props) => {
  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{ width: "135px", height: "100%" }}
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
  );
};

export default MediaBoxCard;
