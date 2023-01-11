import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  OutlinedInput,
  Stack,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import SnackMessage from "src/components/SnackMessage";

const VerifyAccess = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [user, setuser] = useState("");
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("user"));
    setuser(data);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  const dialogClose = () => {
    setDialog(false);
  };

  const router = useRouter();

  const verifyCode = () => {
    setDialog(true);
  };

  const updatePassword = async () => {
    setOpen(true);

    if (password.length < 8) {
      setVariant("error");
      setMessage("Password length should be 8 or more");
      setSnackOpen(true);
      setOpen(false);
      return;
    }

    setDialog(false);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        id: user.id,
        password,
      };

      const { data } = await axios.post(`${API_SERVICE}/api/teamUser/updatePassword`, body, config);

      if (data) {
        setSnackOpen(false);
        router.push("/teamadmin/confirmdetails");
      }
    } catch (error) {
      setOpen(false);
      setVariant("error");
      setMessage(error.response.data.message);
      setSnackOpen(true);
    }
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ px: 10, py: 8, height: "100vh" }}
      >
        <Box>
          <Typography component="h1" variant="h4">
            Verify admin access
          </Typography>
          {user !== null && (
            <Typography component="h2" variant="h5" sx={{ mt: 5, fontSize: 28 }}>
              We have sent a one time verification code to {user.email}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <FormControl
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                mb: 8,
              }}
            >
              <FormLabel sx={{ mr: 5 }}>Enter Verification Code</FormLabel>
              <OutlinedInput
                sx={{ borderRadius: 2.2, width: 500 }}
                name="userId"
                type="text"
                id="userId"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </FormControl>

            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
                onClick={() => verifyCode()}
              >
                Next
              </Button>
            </Stack>
          </Box>
        </Box>
        <Typography textAlign="center" component="h2" variant="h5" sx={{ my: 2 }}>
          Step 2/3
        </Typography>
      </Stack>
      <SnackMessage
        variant={variant}
        message={message}
        snackOpen={snackOpen}
        handleSnackClose={snackClose}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog open={dialog} onClose={dialogClose}>
        <DialogTitle>Account is verified!</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>
            Please Create a password for your account before proceeding
          </DialogContentText>
          <TextField
            sx={{ mt: 3 }}
            autoFocus
            margin="dense"
            label="Create Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose}>Cancel</Button>
          <Button onClick={updatePassword}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VerifyAccess;
