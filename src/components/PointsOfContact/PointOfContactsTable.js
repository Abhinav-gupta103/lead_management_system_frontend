import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import AddPointOfContactDialog from "./AddPointOfContactDialog";
import ConfirmDialog from "../utils/ConfirmDialog";

const PointOfContactsTable = () => {
  const { restaurantId } = useParams();
  const [pointsOfContact, setPointsOfContact] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPoC, setCurrentPoC] = useState(undefined);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("jwtToken")}`
  );
  const fetchPointsOfContact = useCallback(async () => {
    const response = await fetch(`/api/contacts/restaurant/${restaurantId}`, {
      headers: myHeaders,
    });
    const data = await response.json();
    setPointsOfContact(data);
  }, [restaurantId]);

  useEffect(() => {
    fetchPointsOfContact();
  }, [fetchPointsOfContact, restaurantId]);

  const handleAddClick = () => {
    setCurrentPoC(undefined);
    setOpenDialog(true);
  };

  const handleEditClick = (poc) => {
    setCurrentPoC(poc);
    setOpenDialog(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    fetchPointsOfContact();
  };

  const handleDeleteConfirm = async () => {
    await fetch(`/api/contacts/${deleteId}`, {
      method: "DELETE",
      headers: myHeaders,
    });
    setConfirmDelete(false);
    fetchPointsOfContact();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add Point of Contact
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Contact Info</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pointsOfContact.map((poc) => (
            <TableRow key={poc.id}>
              <TableCell>{poc.name}</TableCell>
              <TableCell>{poc.contactInfo}</TableCell>
              <TableCell>{poc.role}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  style={{ zIndex: 1 }}
                  onClick={() => handleEditClick(poc)}
                >
                  Edit
                </Button>
                <Button
                  color="secondary"
                  style={{ zIndex: 1 }}
                  onClick={() => handleDeleteClick(poc.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openDialog && (
        <AddPointOfContactDialog
          open={openDialog}
          onClose={handleDialogClose}
          restaurantId={restaurantId}
          currentPoC={currentPoC}
        />
      )}

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Point of Contact"
        description="Are you sure you want to delete this point of contact?"
      />
    </>
  );
};

export default PointOfContactsTable;
