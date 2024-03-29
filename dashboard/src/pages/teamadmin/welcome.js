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
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import SnackMessage from "src/components/SnackMessage";

const Welcome = () => {
  const [userId, setUserId] = useState("");
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  const router = useRouter();

  const verifyUserId = async () => {
    if (userId === "") {
      setMessage("Please enter User Id OR paste sharable link");
      setVariant("error");
      setSnackOpen(true);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      id: userId,
    };

    setOpen(true);

    await axios
      .post(`${API_SERVICE}/api/teamUser/validate`, body, config)
      .then((res) => {
        console.log(res.data);
        window.localStorage.setItem("user", JSON.stringify(res.data));
      })
      .then(() => {
        setOpen(false);
        router.push("/teamadmin/verifyadminaccess");
      })
      .catch((error) => {
        setOpen(false);
        setMessage(error.response.data.message);
        setVariant("error");
        setSnackOpen(true);
        console.log(error);
      });
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
            Hi! Welcome to Productivity Report
          </Typography>
          <Typography component="h2" variant="h5" sx={{ mt: 5, fontSize: 28 }}>
            Let's get started...
          </Typography>
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
              <FormLabel sx={{ mr: 5 }}>
                Enter User Id <b>OR</b> paste sharable link
              </FormLabel>
              <OutlinedInput
                sx={{ borderRadius: 2.2, width: 500 }}
                name="userId"
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </FormControl>

            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
                onClick={() => verifyUserId()}
              >
                Next
              </Button>
            </Stack>
          </Box>
        </Box>
        <Typography textAlign="center" component="h2" variant="h5" sx={{ my: 2 }}>
          Step 1/3
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
    </>
  );
};

export default Welcome;
