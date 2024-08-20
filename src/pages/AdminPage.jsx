// src/components/App.js
import React, { useState } from 'react';
import {Box} from '@mui/material';
import Profile from './Profile';  // A component to display user profile
import SidePanel from '../components/SidePanel';  // A component to display side panel
import Dashboard from '../components/Dashboard';  // A component to handle initial or default view
import BookingsLineChart from './BookingsLineChart';  // A component to display bookings chart
import RevenueChart from './RevenueChart';  // A component to display revenue chart
import UserRegistrationsChart from './UserRegistrationsChart';  // A component to display user registrations chart
// import Reschedules from '../components/Reschedules';  // A component to display reschedules
import TrainBarChart from './TrainBarChart';

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div style={{ display: 'flex'}} >
      <SidePanel onMenuSelect={handleMenuSelect} />
      <Box style={{ flex: 1, padding: '20px' }} sx={{backgroundColor:"#F4F6F6"}}>
        {/* Conditional rendering based on selected menu */}
        {selectedMenu === 'dashboard' && <Dashboard />}
        {selectedMenu === 'allBookings' && <BookingsLineChart />}
        {selectedMenu === 'bookingsByTrain' && <TrainBarChart />}
        {selectedMenu === 'revenue' && <RevenueChart />}
        {selectedMenu === 'trains' && <TrainBarChart />}
        {selectedMenu === 'registrations' && <UserRegistrationsChart />}
        {selectedMenu === 'reschedules' && <Reschedules />}
        {selectedMenu === 'profile' && <Profile />}
      </Box>
    </div>
  );
};

export default AdminPage;


