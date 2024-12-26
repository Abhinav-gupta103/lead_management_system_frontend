import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddRestaurantLeadDialog from "./AddRestaurantLeadDialog";

const RestaurantInfo = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleInteractionsClick = () => {
    navigate(`/interactions/${restaurant.id}`);
  };

  const fetchRestaurantDetails = useCallback(async () => {
    const myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("jwtToken")}`
    );
    try {
      const response = await fetch(`/api/leads/${restaurantId}`, {
        headers: myHeaders,
      });
      const data = await response.json();
      setRestaurant(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch restaurant details:", error);
      setLoading(false);
    }
  }, [restaurantId]);
  useEffect(() => {
    fetchRestaurantDetails();
  }, [fetchRestaurantDetails, restaurantId]);

  const handleEdit = () => {
    fetchRestaurantDetails();
    setEditDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/leads/${restaurantId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete restaurant");
      }
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!restaurant) {
    return <Typography variant="h6">Restaurant not found</Typography>;
  }

  return (
    <>
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" gutterBottom>
              {restaurant.name}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleInteractionsClick}
            >
              View Interactions
            </Button>
          </Box>

          <Stack spacing={2} marginTop={2}>
            <Typography variant="body1">
              <strong>Address:</strong> {restaurant.address}
            </Typography>
            <Typography variant="body1">
              <strong>Lead Status:</strong> {restaurant.leadStatus}
            </Typography>
          </Stack>

          <Box marginTop={2}>
            <Typography variant="caption" display="block" gutterBottom>
              <strong>Created At:</strong>{" "}
              {new Date(restaurant.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="caption" display="block">
              <strong>Updated At:</strong>{" "}
              {new Date(restaurant.updatedAt).toLocaleDateString()}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} marginTop={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditDialogOpen(true)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete
            </Button>
          </Stack>
        </CardContent>
      </Card>
      {/* Interactions button at the right top end of restraunt info */}

      {editDialogOpen && (
        <AddRestaurantLeadDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          lead={restaurant}
          onSave={handleEdit}
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this restaurant? This action cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RestaurantInfo;
