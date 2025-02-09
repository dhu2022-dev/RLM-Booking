import React, { useState } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";

function SearchForm({ onSearchResults, onEventsResults }) {
    const [searchParams, setSearchParams] = useState({
        artist: "",
        country: "US",
        city: "Boston",
    });

    const handleChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        try {
            // Fetch Artists
            const artistResponse = await fetch(`artist_recommendation/api/search-artist/?name=${searchParams.artist}`);
            const artistData = await artistResponse.json();
            onSearchResults(artistData); // Pass results to parent component

            // If artists exist, fetch events for the first artist
            if (artistData.length > 0) {
                const firstArtist = artistData[0].name;
                const eventResponse = await fetch(
                    `/api/get-events/?name=${encodeURIComponent(firstArtist)}&country=${encodeURIComponent(searchParams.country)}&city=${encodeURIComponent(searchParams.city)}`
                );
                const eventData = await eventResponse.json();
                onEventsResults(eventData.local_events.concat(eventData.global_events));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Box component="form" sx={{ m: 5, textAlign: "center" }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <TextField
                        name="artist"
                        label="Artist Name"
                        variant="outlined"
                        required
                        value={searchParams.artist}
                        onChange={handleChange}
                        InputProps={{ style: { backgroundColor: "white", color: "black", borderRadius: "4px" } }}
                        InputLabelProps={{
                            style: {
                                color: "#ffcccc",
                                fontWeight: "bold",
                                transform: "translate(0, -1.5rem)",
                                backgroundColor: "#121212", 
                                padding: "0 4px", 
                            },
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="country"
                        label="Country Code (e.g., US)"
                        variant="outlined"
                        value={searchParams.country}
                        onChange={handleChange}
                        InputProps={{ style: { backgroundColor: "white", color: "black", borderRadius: "4px" } }}
                        InputLabelProps={{
                            style: {
                                color: "#ffcccc",
                                fontWeight: "bold",
                                transform: "translate(0, -1.5rem)", 
                                backgroundColor: "#121212",
                                padding: "0 4px",
                            },
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="city"
                        label="City"
                        variant="outlined"
                        value={searchParams.city}
                        onChange={handleChange}
                        InputProps={{ style: { backgroundColor: "white", color: "black", borderRadius: "4px" } }}
                        InputLabelProps={{
                            style: {
                                color: "#ffcccc",
                                fontWeight: "bold",
                                transform: "translate(0, -1.5rem)",
                                backgroundColor: "#121212",
                                padding: "0 4px",
                            },
                        }}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="error" onClick={handleSearch}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SearchForm;
