import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RestaurantLeadsTable = ({ leads }) => {
  const navigate = useNavigate();

  const handleRowClick = (restaurantId) => {
    navigate(`/points-of-contact/${restaurantId}`);
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Restaurant Name</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Lead Status</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Updated</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {leads.map((lead) => (
          <TableRow
            key={lead.id}
            onClick={() => handleRowClick(lead.id)}
            style={{ cursor: "pointer" }}
          >
            <TableCell>{lead.id}</TableCell>
            <TableCell>{lead.name}</TableCell>
            <TableCell>{lead.address}</TableCell>
            <TableCell>{lead.leadStatus}</TableCell>
            <TableCell>{lead.createdAt}</TableCell>
            <TableCell>{lead.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RestaurantLeadsTable;
