import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import MainLayout from "src/components/layouts/MainLayout";
import { v4 as uuidv4 } from "uuid";
import SnackMessage from "src/components/SnackMessage";
import { API_SERVICE } from "../config/uri";
import axios from "axios";

const allApps = [
  "Google Meet",
  "VS Code",
  "MS Word",
  "MS Excel",
  "MS Power Point",
  "GTA V",
  "Gmail",
  "You Tube",
  "Chrome",
  "Whatsapp",
  "Facebook",
  "Tiktok",
  "Google Sheets",
  "MS Teams",
  "Insomnia",
  "MS Store",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectApps = () => {
  const [productiveApps, setProductiveApps] = useState([]);
  const [inActiveApps, setInActiveApps] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("error");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(data);
  }, []);

  useEffect(async () => {
    if (userData !== null) {
      await axios
        .get(`${API_SERVICE}/api/applicationType/${userData.organization}`)
        .then((res) => {
          setSavedList([...res.data]);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [userData]);

  const backdropClose = () => {
    setOpen(false);
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  const selectProductiveApps = (event) => {
    const {
      target: { value },
    } = event;
    setProductiveApps(typeof value === "string" ? value.split(",") : value);
  };

  const selectInActiveApps = (event) => {
    const {
      target: { value },
    } = event;
    setInActiveApps(typeof value === "string" ? value.split(",") : value);
  };

  const saveList = () => {
    const data = [];

    productiveApps.forEach((x) => {
      const d = {
        id: uuidv4(),
        appName: x,
        appType: "Productive",
        organization: userData.organization,
        time: new Date().getTime(),
      };
      data.push(d);
    });

    inActiveApps.forEach((x) => {
      const d = {
        id: uuidv4(),
        appName: x,
        appType: "Inactive",
        organization: userData.organization,
        time: new Date().getTime(),
      };
      data.push(d);
    });

    setOpen(true);
    saveToDb(data);
  };

  const saveToDb = async (list) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const body = {
      appList: list,
    };

    await axios
      .post(`${API_SERVICE}/api/applicationType/create`, body, config)
      .then((res) => {
        setSavedList([...savedList, ...res.data]);
        setOpen(false);
        setMessage("Saved Successfully");
        setVariant("success");
        setSnackOpen(true);
      })
      .then(() => {
        setProductiveApps([]);
        setInActiveApps([]);
      })
      .catch((error) => {
        setOpen(false);
        setMessage(error.message);
        setVariant("error");
        setSnackOpen(true);
        console.log(error);
      });
  };

  const deleteApp = async (id) => {
    await axios
      .delete(`${API_SERVICE}/api/applicationType/delete/${id}`)
      .then((res) => {
        setMessage(res.data);
        setVariant("success");
        setSnackOpen(true);
      })
      .then(() => {
        const temp = savedList.filter((x) => x.id !== id);
        setSavedList([...temp]);
      })
      .catch((error) => {
        setMessage(error.message);
        setVariant("error");
        setSnackOpen(true);
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 5,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <FormControl sx={{ mx: 2, width: 250 }}>
          <InputLabel id="productive">Select Productive Apps</InputLabel>
          <Select
            labelId="productive"
            id="productive"
            multiple
            value={productiveApps}
            onChange={selectProductiveApps}
            input={<OutlinedInput label="Select Productive Apps" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {allApps.map((x, i) => (
              <MenuItem key={i++} value={x}>
                <Checkbox checked={productiveApps.indexOf(x) > -1} />
                <ListItemText primary={x} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mx: 2, width: 250 }}>
          <InputLabel id="productive">Select Inactive Apps</InputLabel>
          <Select
            labelId="inActive"
            id="inActive"
            multiple
            value={inActiveApps}
            onChange={selectInActiveApps}
            input={<OutlinedInput label="Select Inactive Apps" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {allApps.map((x, i) => (
              <MenuItem key={i++} value={x}>
                <Checkbox checked={inActiveApps.indexOf(x) > -1} />
                <ListItemText primary={x} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={saveList} variant="contained" sx={{ px: 4.2, py: 1, fontSize: 18, mx: 2 }}>
          Save
        </Button>
      </Box>

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: 500,
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      {!loading && (
        <Box sx={{ mt: 5 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">S No.</TableCell>
                  <TableCell align="center">App Name</TableCell>
                  <TableCell align="center">App Type</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {savedList.map((row, index) => (
                  <TableRow
                    key={index++}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {++index}
                    </TableCell>
                    <TableCell align="center">{row.appName}</TableCell>
                    <TableCell align="center">{row.appType}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => deleteApp(row.id)}>
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <SnackMessage
        variant={variant}
        message={message}
        snackOpen={snackOpen}
        handleSnackClose={snackClose}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={backdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

SelectApps.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default SelectApps;
