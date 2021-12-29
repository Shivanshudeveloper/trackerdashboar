import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const SaveChangeDialog = (props) => {
  const { open, handleClose, setOpen } = props;

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you wanted to save changes to user ID: XXXX
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SaveChangeDialog;
