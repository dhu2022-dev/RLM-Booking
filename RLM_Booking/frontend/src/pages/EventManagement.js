import React, { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Tabs,
    Tab,
    TextField,
} from "@mui/material";
import EventCalendar from "../components/EventCalendar";

function EventManagement() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ backgroundColor: "#121212", color: "white", minHeight: "100vh", padding: 4 }}>
            {/* Top Bar */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "black",
                    padding: 2,
                }}
            >
                <img src="/path-to-logo.png" alt="Logo" style={{ height: "50px" }} />
                <Typography variant="h4" color="error">
                    Event Management
                </Typography>
            </Box>

            {/* Dashboard */}
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Dashboard
                </Typography>
                <Grid container spacing={2}>
                    {[
                        { label: "Total Upcoming Events", value: "35" },
                        { label: "Average Ticket Price", value: "$75" },
                        { label: "Booked Venues/Artists", value: "12" },
                        { label: "Revenue Projections", value: "$50,000" },
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ backgroundColor: "#1a1a1a", textAlign: "center" }}>
                                <CardContent>
                                    <Typography variant="h6">{item.label}</Typography>
                                    <Typography variant="h4">{item.value}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Event Scheduling */}
            <Box sx={{ marginTop: 6 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Event Scheduling
                </Typography>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    centered
                >
                    <Tab label="Calendar View" />
                    <Tab label="Add Event" />
                </Tabs>

                {/* Tab Content */}
                {activeTab === 0 && (
                    <Box sx={{ marginTop: 4, height: "400px", backgroundColor: "#1a1a1a" }}>
                        <div>
                            <EventCalendar />
                        </div>
                    </Box>
                )}
                {activeTab === 1 && (
                    <Box sx={{ marginTop: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Event Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Event Date & Time" type="datetime-local" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Venue" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Artist" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Notes"
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ textAlign: "center" }}>
                                <Button variant="contained" color="primary">
                                    Create Event
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default EventManagement;
