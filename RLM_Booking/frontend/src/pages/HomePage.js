import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import SHLogo from "../assets/images/SHLogo.png";
import HeroImg from '../assets/images/hero_img.jpeg';
import { ReactTyped } from "react-typed";
import { Grid } from "@mui/material";

const HeroSection = styled(Box)({
  position: "relative",
  height: "100vh",
  backgroundImage: `url(${HeroImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  textAlign: "center",
  fontFamily: "'Helvetica Neue', Arial, sans-serif", // Professional and Apple-like font
  "&::after": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark overlay
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
});

const LogoContainer = styled(Box)({
  backgroundColor: "rgba(255, 255, 255, 0.93)", // Light translucent background for logo
  padding: "10px",
  borderRadius: "10px",
  display: "inline-block",
  margin: "20px",
});

function HomePage() {
  return (
    <>
      <HeroSection>
        <LogoContainer>
          <img
            src={SHLogo}
            alt="StarrHill Logo"
            style={{ width: "300px" }}
          />
        </LogoContainer>
        <Typography variant="h2" gutterBottom style={{ fontWeight: "bold" }}>
          All-in-one Platform for Events and Artists
        </Typography>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          <ReactTyped
            strings={["Find your ideal artist.", "Manage events effortlessly.", "Connect with the music world."]}
            typeSpeed={50}
            backSpeed={30}
            loop
          />
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#1f1f1f",
                color: "white",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.6)",
                borderRadius: "12px", // Apple-like smooth corners
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom style={{ fontWeight: "600" }}>
                  Artist Recommendation
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Find your ideal artist using the trained model.
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  href="/artist_recommendation"
                  sx={{ borderRadius: "8px", fontWeight: "bold" }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#1f1f1f",
                color: "white",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.6)",
                borderRadius: "12px",
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom style={{ fontWeight: "600" }}>
                  Manage Possible Events
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                  Find your favorite artists within the area at your preferred time.
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  href="/event_management"
                  sx={{ borderRadius: "8px", fontWeight: "bold" }}
                >
                  Manage
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </HeroSection>
      <Box
        sx={{
          textAlign: "center",
          padding: 4,
          backgroundColor: "#121212",
          color: "white",
        }}
      >
      </Box>
    </>
  );
}

export default HomePage;