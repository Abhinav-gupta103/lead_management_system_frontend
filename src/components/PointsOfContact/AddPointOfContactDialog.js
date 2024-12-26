import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const AddPointOfContactDialog = ({
  open,
  onClose,
  restaurantId,
  currentPoC,
}) => {
  const [pocDetails, setPocDetails] = useState(
    currentPoC || { name: "", contactInfo: "", role: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPocDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const method = currentPoC ? "PUT" : "POST";
    const url = currentPoC
      ? `/api/contacts/${currentPoC.id}`
      : `/api/contacts/${restaurantId}`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify({ ...pocDetails }),
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {currentPoC ? "Update Point of Contact" : "Add Point of Contact"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={pocDetails.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact Info"
          name="contactInfo"
          value={pocDetails.contactInfo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={pocDetails.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPointOfContactDialog;
