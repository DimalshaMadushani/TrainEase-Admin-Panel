import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { currentAdmin, error, loading } = useSelector((state) => state.admin);

  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await axios.get(
        "https://trainease-backend.onrender.com/api/admin/logout"
      );
      navigate("/");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <Container>
      <Box sx={{ alignItems: "center", my: 2 }}>
        <Typography variant="h4" align="center">
          Profile
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Username"
            value={currentAdmin.username}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Email"
            value={currentAdmin.email}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Position"
            value={currentAdmin.position}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ ml: 2 }}
          onClick={handleSignout}
        >
          Sign out
        </Button>
      </Box>
    </Container>
  );
}
