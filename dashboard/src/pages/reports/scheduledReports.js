import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, Stack, CircularProgress } from "@mui/material";
import ReportLayout from "src/components/layouts/ReportLayout";
import SnackMessage from "src/components/SnackMessage";
import ScheduledReportTable from "src/components/reports/ScheduledReportTable";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";

const ScheduledReports = () => {
  const [userData, setUserData] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(data);
  }, []);

  useEffect(async () => {
    if (userData !== null) {
      await axios
        .get(`${API_SERVICE}/api/report/${userData.organization}/scheduled`)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          setReports(res.data);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [userData]);

  const deleteReport = async (id) => {
    await axios
      .delete(`${API_SERVICE}/api/report/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          setMessage("Report Deleted Successfully");
          setVariant("success");
          setSnackOpen(true);
        }
      })
      .then(() => {
        const list = reports.filter((x) => x.id !== id);
        setReports(list);
      })
      .catch((error) => {
        setMessage(error.message);
        setVariant("error");
        setSnackOpen(true);
      });
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          sx={{ px: 5, py: 1.5 }}
          onClick={() => router.push("/reports/createreport")}
        >
          Create New Report
        </Button>
      </Stack>
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
        <Box sx={{ mt: 4 }}>
          <ScheduledReportTable reports={reports} deleteReport={deleteReport} />
        </Box>
      )}
      <SnackMessage
        variant={variant}
        message={message}
        snackOpen={snackOpen}
        handleSnackClose={snackClose}
      />
    </Box>
  );
};

ScheduledReports.getLayout = (page) => <ReportLayout>{page}</ReportLayout>;

export default ScheduledReports;
