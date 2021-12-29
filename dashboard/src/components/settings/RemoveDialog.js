import React from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const RemoveDialog = (props) => {
  const { open, handleClose, setOpen } = props;

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove User</DialogTitle>
        <DialogContent>
          <getDialogContentTextUtilityClass>
            Are you sure you want to remove user ID XXXXX
          </getDialogContentTextUtilityClass>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Remove User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RemoveDialog;
