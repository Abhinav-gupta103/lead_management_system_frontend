import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PerformanceRow from "./PerformanceRow";

const PerformanceTable = ({ performanceData }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Restaurant Name</strong>
            </TableCell>
            <TableCell>
              <strong>Address</strong>
            </TableCell>
            <TableCell>
              <strong>Lead Status</strong>
            </TableCell>
            <TableCell>
              <strong>Created At</strong>
            </TableCell>
            <TableCell>
              <strong>Updated At</strong>
            </TableCell>
            <TableCell>
              <strong>Total Orders Placed</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {performanceData.map((restaurant) => (
            <PerformanceRow key={restaurant.id} restaurant={restaurant} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PerformanceTable;
