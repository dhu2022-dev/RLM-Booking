import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

function EventResults({ events, onAddToCalendar }) {
    return (
        <Grid container spacing={2} sx={{ maxHeight: "400px", overflowY: "auto" }}>
            {events.map((event, index) => (
                <Grid item xs={12} key={index}>
                    <Card sx={{ backgroundColor: "#1f1f1f", color: "white", borderRadius: "8px" }}>
                        <CardContent>
                            <Typography variant="h6" color="error">{event.name}</Typography>
                            <Typography>Date: {event.dates?.start.localDate}</Typography>
                            <Typography>
                                Location: {event._embedded?.venues[0].name}, {event._embedded?.venues[0].city.name}
                            </Typography>
                            <Typography>
                                Suggested Price: ${event.suggested_price} | Predicted Sales: {event.predicted_sales}
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                href={event.url}
                                target="_blank"
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Get Tickets
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 1 }}
                                onClick={() =>
                                    onAddToCalendar({
                                        name: event.name,
                                        location: `${event._embedded?.venues[0].name}, ${event._embedded?.venues[0].city.name}`,
                                        date: event.dates?.start.localDate,
                                    })
                                }
                            >
                                Add to Calendar
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default EventResults;
