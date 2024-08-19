// src/components/Dashboard.js
import React from 'react';
import {Typography,Box} from '@mui/material';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography paragraph>
        Welcome to your Admin Panel. Here you can quickly view the most critical data and navigate to manage specific aspects of the train booking system.
      </Typography>
    </Box>
  );
};

export default Dashboard;
