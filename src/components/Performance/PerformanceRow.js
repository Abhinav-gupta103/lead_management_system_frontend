import React from "react";
import { TableRow, TableCell } from "@mui/material";

const PerformanceRow = ({ restaurant }) => {
  return (
    <TableRow>
      <TableCell>{restaurant.name}</TableCell>
      <TableCell>{restaurant.address}</TableCell>
      <TableCell>{restaurant.leadStatus}</TableCell>
      <TableCell>
        {new Date(restaurant.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        {new Date(restaurant.updatedAt).toLocaleDateString()}
      </TableCell>
      <TableCell>{restaurant.totalOrderPlaced}</TableCell>
    </TableRow>
  );
};

export default PerformanceRow;
