"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningIcon from "@mui/icons-material/Warning";

const ActiveDevModal = () => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        display="flex"
        gap={2}
        alignItems="center"
      >
        <WarningIcon
          color="error"
          fontSize="large"
        />
        {" USER NOTICE"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Welcome To We Should Watch! The app for tracking the movies and shows you want to share with friends, family, loved ones, etc.
          <br />
          <br />
          This app is currently under active development. Any use should be considered for preview/evaluation purposes only. Some features and pages may not be finalized, and are subject to change.
          <br />
          <br />
          <b>Please note:</b> All user accounts and data will be deleted at the time of official release. Play around, explore, and if you have any feedback, please reach out to WeShouldWatchMailer@gmail.com
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>I Understand!</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActiveDevModal;
