import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

function AddToCalendarModal({ open, handleClose }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    backgroundColor: "#1a1a1a",
                    color: "white",
                    p: 3,
                    borderRadius: 1,
                    maxWidth: 400,
                    margin: "auto",
                    marginTop: "10%",
                }}
            >
                <Typography variant="h6" sx={{ color: "#ff0000", mb: 2 }}>
                    Add Event to Calendar
                </Typography>
                <form>
                    <TextField label="Event Name" fullWidth sx={{ mb: 2 }} required />
                    <TextField label="Location" fullWidth sx={{ mb: 2 }} required />
                    <TextField label="Date" type="date" fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} required />
                    <Button variant="contained" color="error" fullWidth>
                        Save Event
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default AddToCalendarModal;
