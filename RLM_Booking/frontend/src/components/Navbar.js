import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#d32f2f" }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: "bold", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
                >
                    StarrHill Booking
                </Typography>
                <Button color="inherit" component={Link} to="/" sx={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/artist_recommendation" sx={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                    Artist Recommendation
                </Button>
                <Button color="inherit" component={Link} to="/event_management" sx={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                    Event Management
                </Button>
                <Button color="inherit" component={Link} to="/calendar_page" sx={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                    Calendar
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;