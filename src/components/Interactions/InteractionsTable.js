import React, { useState } from "react";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const InteractionsTable = ({ interactions }) => {
  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInteraction(null);
  };

  const handleRowClick = (interaction) => {
    setSelectedInteraction(interaction);
    setOpenDialog(true);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date-Time</TableCell>
              <TableCell>Interaction Type</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Order Placed</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interactions.map((interaction) => (
              <React.Fragment key={interaction.id}>
                <TableRow onClick={() => handleRowClick(interaction)}>
                  <TableCell>
                    {/* {new Date(interaction.interactionDate).toLocaleDateString()} */}
                    {interaction.interactionDate}
                  </TableCell>
                  <TableCell>{interaction.interactionType}</TableCell>
                  <TableCell>{interaction.title}</TableCell>
                  <TableCell>
                    {interaction.orderPlaced ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    {interaction.details.length > 50
                      ? interaction.details.substring(0, 50) + "..."
                      : interaction.details}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Interaction Details</DialogTitle>
        <DialogContent>
          {selectedInteraction && (
            <>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  selectedInteraction.interactionDate
                ).toLocaleDateString()}
              </p>
              <p>
                <strong>Type:</strong> {selectedInteraction.interactionType}
              </p>
              <p>
                <strong>Title:</strong> {selectedInteraction.title}
              </p>
              <p>
                <strong>Order Placed:</strong>{" "}
                {selectedInteraction.orderPlaced ? "Yes" : "No"}
              </p>
              <p>
                <strong>Details:</strong>
              </p>
              <p>{selectedInteraction.details}</p>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InteractionsTable;
