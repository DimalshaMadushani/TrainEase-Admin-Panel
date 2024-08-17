// src/components/App.js
import React, { useState } from 'react';
import SidePanel from '../components/SidePanel';  // A component to display side panel
import Dashboard from '../components/Dashboard';  // A component to handle initial or default view
import BookingsLineChart from './BookingsLineChart';  // A component to display bookings chart
import RevenueChart from './RevenueChart';  // A component to display revenue chart
import UserRegistrationsChart from './UserRegistrationsChart';  // A component to display user registrations chart
// import Reschedules from '../components/Reschedules';  // A component to display reschedules

const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidePanel onMenuSelect={handleMenuSelect} />
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Conditional rendering based on selected menu */}
        {selectedMenu === 'dashboard' && <Dashboard />}
        {selectedMenu === 'bookings' && <BookingsLineChart />}
        {selectedMenu === 'revenue' && <RevenueChart />}
        {selectedMenu === 'registrations' && <UserRegistrationsChart />}
        {selectedMenu === 'reschedules' && <Reschedules />}
        {selectedMenu === 'profile' && <Profile />}
      </div>
    </div>
  );
};

export default AdminPage;
