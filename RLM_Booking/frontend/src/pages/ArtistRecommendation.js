import React, { useState } from "react";
import { Grid, Box, Typography, Container } from "@mui/material";
import SearchForm from "../components/SearchForm";
import MapSection from "../components/MapSection";
import ArtistResults from "../components/ArtistResults";
import EventResults from "../components/EventResults";

function ArtistRecommendation() {
    const [artists, setArtists] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [noEvents, setNoEvents] = useState(false); // Track if there are no events

    const handleArtistSelect = async (artistName, artistPopularity) => {
        setSelectedArtist(artistName);
        try {
            const eventResponse = await fetch(
                `artist_recommendation/api/get-events/?name=${encodeURIComponent(artistName)}&popularity=${artistPopularity}&country=US&city=Boston`
            );
            const eventData = await eventResponse.json();

            // Filter events to ensure only events for the selected artist are shown
            const filteredEvents = eventData.events.filter(
                (event) => event.name.toLowerCase() === artistName.toLowerCase()
            );

            setEvents(filteredEvents);
            setNoEvents(filteredEvents.length === 0); // If no events, set flag to true
        } catch (error) {
            console.error("Error fetching events:", error);
            setNoEvents(true); // Ensure "No events found" displays on error
        }
    };

    const handleAddToCalendar = async (event) => {
        try {
            const response = await fetch("/event_management/api/save-event/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            });

            if (!response.ok) {
                throw new Error("Failed to save event");
            }

            console.log("Event successfully saved:", event);
            alert("Event added to calendar!");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add event to calendar.");
        }
    };

    return (
        <Box sx={{ backgroundColor: "#121212", color: "white", minHeight: "100vh", padding: "40px" }}>
            <Container maxWidth="lg">
                <Typography variant="h3" gutterBottom fontWeight="bold" textAlign="center">
                    Artist Recommendation
                </Typography>
                <Typography variant="h6" textAlign="center" sx={{ marginBottom: 3 }}>
                    Find the perfect artist for your next event.
                </Typography>
                <SearchForm onSearchResults={setArtists} />

                {/* Artist Results Grid (Above the Map) */}
                {artists.length > 0 && (
                    <Box sx={{ maxHeight: "300px", overflowY: "auto", mb: 4, backgroundColor: "#1f1f1f", borderRadius: "8px", padding: 2 }}>
                        <ArtistResults artists={artists} onArtistSelect={handleArtistSelect} />
                    </Box>
                )}

                {/* Map and Event Results Side by Side */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={events.length > 0 || noEvents ? 6 : 12}>
                        <MapSection />
                    </Grid>
                    {events.length > 0 ? (
                        <Grid item xs={12} md={6} mt={2}>
                            <Box
                                sx={{
                                    border: "2px solid red",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    backgroundColor: "#1f1f1f",
                                }}
                            >
                                <EventResults events={events} onAddToCalendar={handleAddToCalendar} />
                            </Box>
                        </Grid>
                    ) : (
                        noEvents && (
                            <Grid item xs={12} md={6} mt={2}>
                                <Box
                                    sx={{
                                        border: "2px solid red",
                                        borderRadius: "8px",
                                        padding: "16px",
                                        backgroundColor: "#1f1f1f",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h6" color="white">
                                        No events found
                                    </Typography>
                                </Box>
                            </Grid>
                        )
                    )}
                </Grid>
            </Container>
        </Box>
    );
}

export default ArtistRecommendation;