import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Grid,
  Button,
  Box,
  Avatar,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  // Fetch hospital details from localStorage
  const hospital = JSON.parse(localStorage.getItem("hospital"));

  if (!hospital) {
    navigate("/");
  }

  // Open/Close dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("hospital");
    navigate("/auth/login");
  };

  // Download QR code functionality
  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = hospital.qrCode; // QR code image URL from localStorage
    link.download = "hospital_qr_code.png"; // Default filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#e8f0fe",
      }}
    >
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ background: "#673ab7", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Hospital Profile
          </Typography>

          {/* User Avatar with Dropdown */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar
              alt="Hospital Logo"
              sx={{
                background: "#ffffff",
                color: "#1976d2",
                cursor: "pointer",
              }}
            >
              {hospital?.hospitalName?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ marginTop: "40px" }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Grid container spacing={2} sx={{ padding: "40px" }}>
        {/* Left Section: Hospital Details */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: 4,
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Hospital Details
          </Typography>

          {/* Input Fields to Show Data */}
          <TextField
            label="Hospital Name"
            value={hospital?.hospitalName}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Email"
            value={hospital?.hospitalEmail}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Phone Number"
            value={hospital?.phoneNumber}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Registration Number"
            value={hospital?.registrationNumber}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Address"
            value={hospital?.address}
            fullWidth
            margin="normal"
            multiline
            rows={2}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Go to Visitor Dashboard Button */}

          <Link to={`/auth/${hospital?._id}/requested`}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3, backgroundColor: "#673ab7" }}
            >
              Go to Visitor Dashboard
            </Button>
          </Link>
        </Grid>

        {/* Right Section: QR Code and Image Download */}
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
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            QR Code
          </Typography>

          {/* Display QR Code */}
          {hospital?.qrCode ? (
            <img
              src={hospital.qrCode}
              alt="Hospital QR Code"
              style={{
                width: "200px",
                height: "200px",
                marginBottom: "16px",
                borderRadius: "8px",
              }}
            />
          ) : (
            <Typography variant="body2" color="textSecondary">
              No QR Code available
            </Typography>
          )}

          {/* Download Button */}
          {hospital?.qrCode && (
            <Button
              variant="contained"
              color="success"
              onClick={downloadQRCode}
              sx={{ mt: 2 }}
            >
              Download QR Code
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
