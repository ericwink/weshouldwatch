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

const MediaListCard = ({ media, groupId, setChatIsOpen, setShowDeleteModal, setShowReasonModal }: Props) => {
  return (
    <Grid xs={12}>
      <Paper
        elevation={3}
        sx={{ width: "100%", height: "100%" }}
      >
        <Grid container>
          <Grid xs={2.2}>
            <Box sx={{ height: 80, position: "relative", width: 45 }}>
              <Image
                src={getPoster(media.poster_path, "200")}
                alt={media.title}
                fill={true}
                style={{ borderTopRightRadius: "4px", borderTopLeftRadius: "4px" }}
              />
            </Box>
          </Grid>
          <Grid
            xs={8}
            pt={1}
          >
            <Typography>{media.title}</Typography>
          </Grid>
          <Grid
            display="flex"
            alignItems="center"
          >
            <CardMenu
              groupId={groupId}
              media={media}
              setChatIsOpen={setChatIsOpen}
              setShowReasonModal={setShowReasonModal}
              setShowDeleteModal={setShowDeleteModal}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MediaListCard;

{
  /* <Avatar
            src={media.added_by.profile_pic}
            sx={{ height: 45, width: 45, position: "absolute", left: "2px", top: "2px", border: "1px", borderColor: "white", borderStyle: "solid" }}
          /> */
}
