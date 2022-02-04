import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

const SaveChangeDialog = (props) => {
  const { open, handleClose, updateUser, id } = props;

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save changes</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>
            <Typography variant="p" component="p" sx={{ mb: 1.5 }}>
              Are you sure you wanted to save changes to user ID:
            </Typography>
            <Typography variant="h6" component="h6">
              {id}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => updateUser()} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SaveChangeDialog;
