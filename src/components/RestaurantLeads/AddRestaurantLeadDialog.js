import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

const AddRestaurantLeadDialog = ({ open, onClose, lead, onSave }) => {
  const [leadDetails, setLeadDetails] = useState({
    name: "",
    address: "",
    leadStatus: "",
  });

  const myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("jwtToken")}`
  );
  // Set initial values when lead data is provided (for updating)
  useEffect(() => {
    if (lead) {
      setLeadDetails({
        name: lead.name || "",
        address: lead.address || "",
        leadStatus: lead.leadStatus || "NEW", // Default to 'NEW' if not provided
      });
    }
  }, [lead]);

  const handleStatusChange = (event) => {
    handleChange({ target: { name: "leadStatus", value: event.target.value } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const url = lead ? `/api/leads/${lead.id}` : "/api/leads";
    const method = lead ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(leadDetails),
    });

    if (response.ok) {
      onSave();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {lead ? "Update Restaurant Lead" : "Add Restaurant Lead"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Restaurant Name"
          name="name"
          value={leadDetails.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="address"
          value={leadDetails.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Lead Status"
          name="leadStatus"
          value={leadDetails.leadStatus}
          onChange={handleStatusChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="NEW">NEW</MenuItem>
          <MenuItem value="CONTACTED">CONTACTED</MenuItem>
          <MenuItem value="INTERESTED">INTERESTED</MenuItem>
          <MenuItem value="CLOSED">CLOSED</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {lead ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRestaurantLeadDialog;
