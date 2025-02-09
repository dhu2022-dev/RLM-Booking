import React from "react";
import { Grid, Card, CardContent, Typography, CardMedia, Button } from "@mui/material";

function ArtistResults({ artists, onArtistSelect }) {
    return (
        <Grid container spacing={2}>
            {artists.map((artist) => (
                <Grid item xs={12} sm={6} key={artist.id}>
                    <Card sx={{ backgroundColor: "#1f1f1f", color: "white", borderRadius: "8px" }}>
                        <Grid container>
                            <Grid item xs={4}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: "100%", objectFit: "cover", borderRadius: "8px 0 0 8px" }}
                                    image={artist.images?.[0]?.url || "https://via.placeholder.com/150"}
                                    alt={artist.name}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <CardContent>
                                    <Typography variant="h6" color="error">{artist.name}</Typography>
                                    <Typography>Followers: {artist.followers?.total.toLocaleString()}</Typography>
                                    <Typography>Popularity: {artist.popularity}</Typography>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        sx={{ mt: 1, mr: 1 }}
                                        onClick={() =>
                                            onArtistSelect(artist.name, artist.popularity)
                                        }
                                    >
                                        View Events
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        href={artist.external_urls.spotify}
                                        target="_blank"
                                        sx={{ mt: 1 }}
                                    >
                                        View on Spotify
                                    </Button>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default ArtistResults;
