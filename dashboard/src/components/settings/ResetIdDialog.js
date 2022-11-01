import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
} from "@mui/material";

const ResetIdDialog = (props) => {
  const { open, handleClose, resetId, id } = props;
  const [newId, setNewId] = useState("");

  return (
    <Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset User Id</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            required
            margin="normal"
            label="Current User Id"
            type="text"
            fullWidth
            variant="outlined"
            value={id}
          />
          <TextField
            required
            margin="normal"
            label="New User Id"
            type="text"
            fullWidth
            variant="outlined"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              resetId(newId, id);
              setNewId("");
            }}
            autoFocus
          >
            Reset User Id
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResetIdDialog;
