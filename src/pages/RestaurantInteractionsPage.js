import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import InteractionsTable from "../components/Interactions/InteractionsTable";
import AddInteractionDialog from "../components/Interactions/AddInteractionDialog";

const RestaurantInteractionsPage = () => {
  const { restaurantId } = useParams();

  const [interactions, setInteractions] = useState([]);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newInteraction, setNewInteraction] = useState({
    interactionType: "",
    interactionDate: "",
    title: "",
    orderPlaced: "",
    details: "",
  });
  const myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("jwtToken")}`
  );

  const fetchInteractions = useCallback(async () => {
    const response = await fetch(
      `/api/interactions/restaurant/${restaurantId}`,
      { headers: myHeaders }
    );
    const data = await response.json();
    setInteractions(data);
  }, [restaurantId]);

  useEffect(() => {
    fetchInteractions();
  }, [fetchInteractions, restaurantId]);

  const handleAddInteraction = async () => {
    const response = await fetch(`/api/interactions/${restaurantId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify({ ...newInteraction }),
    });

    if (response.ok) {
      setNewInteraction({
        interactionType: "",
        interactionDate: "",
        title: "",
        orderPlaced: "",
        details: "",
      });
      setAddDialogOpen(false);
      fetchInteractions();
    } else {
      alert(response.statusText);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInteraction((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">
          Interactions of Restaurant Id: {restaurantId}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddDialogOpen(true)}
        >
          Add Interaction
        </Button>
      </Box>
      <InteractionsTable interactions={interactions} />
      <AddInteractionDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        interactionData={newInteraction}
        onInputChange={handleInputChange}
        onSubmit={handleAddInteraction}
      />
    </Container>
  );
};

export default RestaurantInteractionsPage;
