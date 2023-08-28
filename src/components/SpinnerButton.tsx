import { Button, CircularProgress } from "@mui/material";

interface Props {
  isLoading: boolean;
  onClick: () => void;
  disabled?: any | boolean;
  children: React.ReactNode;
}

const SpinnerButton = ({ isLoading, onClick, disabled = false, children }: Props) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{ position: "relative" }}
    >
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{ position: "absolute", zIndex: 1, top: "50%", left: "50%", marginTop: "-12px", marginLeft: "-12px" }}
        />
      )}
      {children}
    </Button>
  );
};

export default SpinnerButton;
