import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#d32f2f",
                color: "white",
                textAlign: "center",
                padding: 2,
                marginTop: "auto",
            }}
        >
            <Typography variant="body2" color="inherit">
                © 2025 StarrHill Booking. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;
