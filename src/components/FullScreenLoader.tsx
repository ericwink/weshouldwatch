import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
  isLoading: boolean;
}

const FullScreenLoader = ({ isLoading }: Props) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default FullScreenLoader;
