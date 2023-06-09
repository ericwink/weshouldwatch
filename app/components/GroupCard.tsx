"use client";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import MovieIcon from "@mui/icons-material/Movie";

interface Props {
  group_name: string;
  id: number;
}

const GroupCard = ({ group_name, id }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          {group_name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          Should there be a group description?
        </Typography>
        <Divider />
        <GroupIcon />
        <MovieIcon />
      </CardContent>
      <CardActions>
        <Button size="small">View Details</Button>
        <Button size="small">Send Invite</Button>
      </CardActions>
    </Card>
  );
};

export default GroupCard;
