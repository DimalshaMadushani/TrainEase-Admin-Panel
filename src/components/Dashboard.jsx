// src/components/Dashboard.js
import React from 'react';
import { Typography, Box, Grid, Card, CardContent, Divider } from '@mui/material';
import { FaChartLine, FaDollarSign, FaUsers, FaRegCalendarAlt } from 'react-icons/fa';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Sample data for charts
const bookingsData = [
  { name: 'Jan', bookings: 20 },
  { name: 'Feb', bookings: 100 },
  { name: 'Mar', bookings: 500 },
  { name: 'Apr', bookings: 100 },
  { name: 'May', bookings: 350 },
  { name: 'Jun', bookings: 700 },
  { name: 'Jul', bookings: 400 },
  { name: 'Aug', bookings: 300 },
  { name: 'Sep', bookings: 600 },
  { name: 'Oct', bookings: 800 },
  { name: 'Nov', bookings: 700 },
  { name: 'Dec', bookings: 900 },
];

const registrationsData = [
  { name: 'Week 1', users: 40 },
  { name: 'Week 2', users: 220 },
  { name: 'Week 3', users: 65 },
  { name: 'Week 4', users: 120 },
  { name: 'Week 5', users: 100 },
  { name: 'Week 6', users: 150 },
  { name: 'Week 7', users: 250 },
  { name: 'Week 8', users: 180 },
  { name: 'Week 9', users: 250 },
 
];

const Dashboard = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography paragraph>
        Welcome to your Admin Panel. Below are the features available for monitoring and managing the train booking system.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        {/* Notify Schedule Changes Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#f4f6f8', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <FaRegCalendarAlt style={{ marginRight: '8px' }} />
                Notify Schedule Changes
              </Typography>
              <Typography variant="body2">
                Admins can notify passengers about changes to train schedules. This feature helps in informing passengers about delays or platform changes in real time.
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Features:
                <ul>
                  <li>Notify passengers of platform changes</li>
                  <li>Notify passengers of delays</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Summary Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#f4f6f8', boxShadow: 3 }}>
            <CardContent>
            <Typography variant="h6" gutterBottom>
                <FaChartLine style={{ marginRight: '8px' }} />
                Generate Booking Analytics
              </Typography>
              <Typography variant="body2">
                Generate charts that display total bookings within a specific date range. The charts provide a clear visualization of booking trends and statistics.
              </Typography>
              
              <Typography variant="body2" sx={{ mt: 2 }}>
                Features:
                <ul>
                  <li>Total bookings by date</li>
                  <li>Total bookings by Train</li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Bookings Overview Section with Line Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#f4f6f8', boxShadow: 3 }}>
            <CardContent>
            <Typography variant="h6" gutterBottom>
                <FaDollarSign style={{ marginRight: '8px' }} />
                Generate Revenue Analytics
              </Typography>
              <Typography variant="body2">
                Track total revenue generated from bookings. Admins can select a date range to generate revenue reports and charts for better financial insights.
              </Typography>

              {/* Line Chart */}
              <Box sx={{ mt: 3 }}> 
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={false} />
                  <YAxis tick={false} />
                  <Line type="monotone" dataKey="bookings" stroke="#82ca9d" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* User Registrations Overview Section with Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: '#f4f6f8', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <FaUsers style={{ marginRight: '8px' }} />
                User Registrations Overview
              </Typography>
              <Box mx={{mb:4}}>
              <Typography variant="body2" >
                Monitor user registrations, active users, and overall system activity. This provides insights into how the platform is growing and how users are interacting with it.
              </Typography>
              </Box>
              {/* Bar Chart */}
              <Box sx={{ mt: 3 }}> 
              <ResponsiveContainer width="100%" height={150} >
                <BarChart data={registrationsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={false} />
                  <YAxis tick={false} />
                  <Bar dataKey="users" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
