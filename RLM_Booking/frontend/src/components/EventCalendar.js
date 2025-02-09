import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { Box, Typography, Modal, Button } from "@mui/material";

function EventCalendar() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Fetch events from the backend
    useEffect(() => {
        fetch("/event_management/api/get-events/")
            .then((response) => response.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    // Handle event click
    const handleEventClick = (clickInfo) => {
        setSelectedEvent({
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            date: clickInfo.event.start.toISOString().split("T")[0],
            location: clickInfo.event.extendedProps.location,
        });
        setModalOpen(true);
    };

    // Handle event deletion
    const deleteEvent = (eventId) => {
        fetch(`/event_management/api/delete-event/${eventId}/`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to delete event");
                setEvents(events.filter((event) => event.id !== eventId));
                setModalOpen(false);
                alert("Event deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting event:", error);
                alert("Failed to delete event.");
            });
    };

    return (
        <Box sx={{ backgroundColor: "#121212", color: "white", padding: 4, minHeight: "100vh" }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
                Event Calendar
            </Typography>
            {events.length === 0 ? (
                <Box textAlign="center" sx={{ color: "gray", marginTop: 4 }}>
                    <Typography>No events found. Use the "Add to Calendar" feature to add events!</Typography>
                    <Button variant="contained" href="/artist_recommendation" sx={{ marginTop: 2 }}>
                        Browse Events
                    </Button>
                </Box>
            ) : (
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
                    initialView="dayGridMonth"
                    themeSystem="bootstrap"
                    events={events.map((event) => ({
                        id: event.id,
                        title: event.name,
                        start: event.date,
                        extendedProps: { location: event.location },
                    }))}
                    eventClick={handleEventClick}
                    height="auto"
                />
            )}

            {/* Event Details Modal */}
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#1a1a1a",
                        color: "white",
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                    }}
                >
                    {selectedEvent && (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Event Details
                            </Typography>
                            <Typography>
                                <strong>Name:</strong> {selectedEvent.title}
                            </Typography>
                            <Typography>
                                <strong>Date:</strong> {selectedEvent.date}
                            </Typography>
                            <Typography>
                                <strong>Location:</strong> {selectedEvent.location}
                            </Typography>
                            <Box sx={{ marginTop: 4, display: "flex", justifyContent: "space-between" }}>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteEvent(selectedEvent.id)}
                                >
                                    Delete Event
                                </Button>
                                <Button variant="outlined" onClick={() => setModalOpen(false)}>
                                    Close
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}

export default EventCalendar;
