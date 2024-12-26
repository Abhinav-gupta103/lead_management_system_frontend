import React, { useState, useEffect } from "react";
import { Container, Button, Typography } from "@mui/material";
import RestaurantLeadsTable from "../components/RestaurantLeads/RestaurantLeadsTable";
import AddRestaurantLeadDialog from "../components/RestaurantLeads/AddRestaurantLeadDialog";
import ConfirmDialog from "../components/utils/ConfirmDialog";

const RestaurantLeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedLead(null);
    fetchRestaurantLeads();
  };
  const myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("jwtToken")}`
  );
  const handleSaveLead = () => {
    console.log("Lead saved successfully!");
  };

  const handleDelete = (leadId) => {
    const url = `/api/leads/${leadId}`;

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then(() => fetchRestaurantLeads())
      .catch((error) => console.error(error));
  };
  const fetchRestaurantLeads = async () => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch("/api/leads", requestOptions);
    const data = await response.json();
    setLeads(data);
  };

  useEffect(() => {
    fetchRestaurantLeads();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Restaurant Leads
      </Typography>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Add Restaurant Lead
      </Button>
      <RestaurantLeadsTable leads={leads} />
      <AddRestaurantLeadDialog
        open={openDialog}
        onClose={handleCloseDialog}
        lead={selectedLead}
        onSave={handleSaveLead}
      />
      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        title="Delete Point of Contact"
        description="Are you sure you want to delete this point of contact?"
      />
    </Container>
  );
};

export default RestaurantLeadsPage;
