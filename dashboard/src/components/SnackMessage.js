import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackMessage = (props) => {
  const { variant, message, snackOpen, handleSnackClose } = props;
  return (
    <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleSnackClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert variant="filled" onClose={handleSnackClose} severity={variant} sx={{ width: "100%", color: 'white' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackMessage;
