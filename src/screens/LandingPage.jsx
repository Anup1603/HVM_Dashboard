import React, { useState } from "react";
import { Grid, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 400);
  };

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
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(2)",
              }}
              src="/Gemini_Generated_Image_5u4tdz5u4tdz5u4t.jpeg"
              alt="HVM Logo"
            />
          </div>
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
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => handleNavigation("/auth/register")}
                >
                  Register
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => handleNavigation("/auth/login")}
                >
                  Log In
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
