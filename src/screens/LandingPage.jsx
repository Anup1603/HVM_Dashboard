import React from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        background: "#e8f0fe",
      }}
    >
      <Grid container sx={{ minHeight: "100vh" }}>
        {/* Left Section with Image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 style={{ backgroundColor: "#ccc", color: "#673ab7" }}>
              HVM Portal
            </h1>
          </Link>
        </Grid>

        {/* Right Section with Buttons */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to the Hospital Portal
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ mb: 3, textAlign: "center" }}
          >
            Manage your hospital operations easily with our secure and efficient
            portal.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              maxWidth: 300,
            }}
          >
            <Link to="/auth/register" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Register
              </Button>
            </Link>

            <Link to="/auth/login" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary" fullWidth size="large">
                Log In
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
