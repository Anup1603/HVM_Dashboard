import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button, Box, Paper } from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const AuthPage = ({ registorHospital, loginHospital }) => {
  const { authMode } = useParams();
  const [isRegister, setIsRegister] = useState(authMode === "register");
  const [registerFormData, setRegisterFormData] = useState({
    hospitalName: "",
    hospitalEmail: "",
    phoneNumber: "",
    password: "",
    registrationNumber: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      // Registration logic
      const hospital = { ...registerFormData };
      registorHospital(hospital);
      console.log("Registration Data:", hospital);

      alert(
        "Registration Successful! Now you can login with your email Id and password."
      );

      // Reset form data
      setRegisterFormData({
        hospitalName: "",
        hospitalEmail: "",
        phoneNumber: "",
        password: "",
        registrationNumber: "",
        address: "",
      });
    } else {
      // Login logic
      const loginData = {
        hospitalEmail: registerFormData.hospitalEmail,
        password: registerFormData.password,
      };

      loginHospital(loginData);

      console.log("Login Data:", loginData);
      alert("Login Successful! Redirecting to your hospital dashboard...");
      navigate("/auth/hospitalProfile");
    }
  };

  // Toggle function
  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
  };

  // Sync isRegister state when route changes
  useEffect(() => {
    setIsRegister(authMode === "register");
  }, [authMode]);

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
        {/* Left Section with Static Image */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=600')",
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

        {/* Right Section with Dynamic Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#e8f0fe",
          }}
        >
          <Paper
            elevation={3}
            sx={{ padding: 4, maxWidth: 400, width: "100%" }}
          >
            {/* Title */}
            <Typography variant="h5" gutterBottom textAlign="center">
              {isRegister ? "Hospital Registration" : "Hospital Login"}
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              gutterBottom
              textAlign="center"
              color="textSecondary"
            >
              {isRegister
                ? "Create an account to manage your hospital operations efficiently."
                : "Log in to access your hospital portal."}
            </Typography>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              {/* Registration Fields */}
              {isRegister && (
                <>
                  <TextField
                    fullWidth
                    label="Hospital Name"
                    name="hospitalName"
                    margin="normal"
                    onChange={handleChange}
                    value={registerFormData.hospitalName}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    margin="normal"
                    onChange={handleChange}
                    value={registerFormData.phoneNumber}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Registration Number"
                    name="registrationNumber"
                    margin="normal"
                    onChange={handleChange}
                    value={registerFormData.registrationNumber}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    margin="normal"
                    onChange={handleChange}
                    value={registerFormData.address}
                    multiline
                    rows={3}
                    required
                  />
                </>
              )}

              {/* Email Field */}
              <TextField
                fullWidth
                label="Email"
                name="hospitalEmail"
                margin="normal"
                type="email"
                onChange={handleChange}
                value={registerFormData.hospitalEmail}
                required
              />

              {/* Password Field */}
              <TextField
                fullWidth
                label="Password"
                name="password"
                margin="normal"
                type={showPassword ? "text" : "password"} // Toggle between text and password types
                onChange={handleChange}
                value={registerFormData.password}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Submit Button */}
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 2 }}
              >
                {isRegister ? "Register" : "Login"}
              </Button>

              {/* Toggle Link */}
              <Typography
                variant="body2"
                textAlign="center"
                color="primary"
                sx={{ mt: 2, cursor: "pointer" }}
                onClick={toggleAuthMode}
              >
                <Link
                  to={isRegister ? "/auth/login" : "/auth/register"}
                  style={{ textDecoration: "none", color: "#673ab7" }}
                >
                  {isRegister
                    ? "Already have an account? Log in"
                    : "Don't have an account? Register"}
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthPage;
