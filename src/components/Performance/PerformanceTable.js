import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PerformanceRow from "./PerformanceRow";

const PerformanceTable = ({ performanceData }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Restaurant Name</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Lead Status</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell>Updated At</TableCell>
          <TableCell>Total Orders Placed</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {performanceData.map((restaurant) => (
          <PerformanceRow key={restaurant.id} restaurant={restaurant} />
        ))}
      </TableBody>
    </Table>
  );
};

export default PerformanceTable;
