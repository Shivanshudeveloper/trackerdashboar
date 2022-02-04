import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const RemoveDialog = (props) => {
  const { open, handleClose, removeUser, id } = props;

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove User</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>
            <Typography variant="p" component="p" sx={{ mb: 1.5 }}>
              Are you sure you want to remove user ID:
            </Typography>
            <Typography variant="h6" component="h6">
              {id}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => removeUser()} autoFocus>
            Remove User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RemoveDialog;
