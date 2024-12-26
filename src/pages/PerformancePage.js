import React, { useEffect, useState } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import PerformanceTable from "../components/Performance/PerformanceTable";

const PerformancePage = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("jwtToken")}`
    );
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch("/api/performance", {
          headers: myHeaders,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPerformanceData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Restaurant Performance
        </Typography>
      </Box>
      <PerformanceTable performanceData={performanceData} />
    </Container>
  );
};

export default PerformancePage;
