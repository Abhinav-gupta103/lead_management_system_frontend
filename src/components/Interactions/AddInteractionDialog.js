import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const AddInteractionDialog = ({
  open,
  onClose,
  interactionData,
  onInputChange,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Interaction</DialogTitle>
      <DialogContent>
        <TextField
          label="DateTime"
          name="interactionDate"
          type="datetime-local"
          fullWidth
          value={interactionData.interactionDate}
          onChange={onInputChange}
          margin="normal"
        />
        <TextField
          label="Title"
          name="title"
          type="text"
          fullWidth
          value={interactionData.title}
          onChange={onInputChange}
          margin="normal"
        />
        <TextField
          label="Type"
          name="interactionType"
          type="text"
          fullWidth
          value={interactionData.interactionType}
          onChange={onInputChange}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={interactionData.orderPlaced === true}
              onChange={(event) =>
                onInputChange({
                  target: {
                    name: "orderPlaced",
                    value: event.target.checked ? true : false,
                  },
                })
              }
            />
          }
          label="Order Placed"
        />
        <TextField
          label="Details"
          name="details"
          value={interactionData.details}
          onChange={onInputChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInteractionDialog;
