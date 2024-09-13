import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SidePanel = ({ onMenuSelect }) => {
  const [openCharts, setOpenCharts] = useState(false);
  const [openBookings, setOpenBookings] = useState(false);

  const handleChartsClick = () => {
    setOpenCharts(!openCharts);
  };

  const handleBookingsClick = () => {
    setOpenBookings(!openBookings);
  };

  return (
    <Box style={{ width: '250px', height: '100vh', borderRight: '1px solid #ccc', backgroundColor: '#1C2938' }}>
      <List component="nav">
        <ListItem
          button
          onClick={handleChartsClick}
          style={{ color: 'white' }}
          sx={{ '&:hover': { backgroundColor: '#2A3B4C' } }} // Hover effect
        >
          <ListItemText primary="Charts" primaryTypographyProps={{ style: { color: 'white' } }} />
          {openCharts ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
        </ListItem>
        <Collapse in={openCharts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              onClick={handleBookingsClick}
              style={{ paddingLeft: '32px', color: 'white' }}
              sx={{ '&:hover': { backgroundColor: '#2A3B4C' } }} // Hover effect
            >
              <ListItemText primary="Bookings" primaryTypographyProps={{ style: { color: 'white' } }} />
              {openBookings ? <ExpandLess style={{ color: 'white' }} /> : <ExpandMore style={{ color: 'white' }} />}
            </ListItem>
            <Collapse in={openBookings} timeout="auto" unmountOnExit>
              <List component="div" disablePadding style={{ paddingLeft: '64px' }}>
                <ListItem button onClick={() => onMenuSelect('allBookings')} sx={{ '&:hover': { backgroundColor: '#2A3B4C' } }}>
                  <ListItemText primary="All Bookings" primaryTypographyProps={{ style: { color: 'white' } }} />
                </ListItem>
                <ListItem button onClick={() => onMenuSelect('bookingsByTrain')} sx={{ '&:hover': { backgroundColor: '#2A3B4C' } }}>
                  <ListItemText primary="Bookings by Train" primaryTypographyProps={{ style: { color: 'white' } }} />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={() => onMenuSelect('revenue')}
              style={{ paddingLeft: '32px', color: 'white' }}
              sx={{ '&:hover': { backgroundColor: '#2A3B4C' } }} // Hover effect
            >
              <ListItemText primary="Revenue" primaryTypographyProps={{ style: { color: 'white' } }} />
            </ListItem>
            {/* <ListItem
              button
              onClick={() => onMenuSelect('registrations')}
              style={{ paddingLeft: '32px', color: 'white' }}
              sx={{ '&:hover': { backgroundColor: '#2A3B4C' } }} // Hover effect
            >
              <ListItemText primary="User Registrations" primaryTypographyProps={{ style: { color: 'white' } }} />
            </ListItem> */}
          </List>
        </Collapse>
        <ListItem
          button
          onClick={() => onMenuSelect('reschedules')}
          style={{ color: 'white' }}
          sx={{ '&:hover': { backgroundColor: '#2A3B4C' } }} // Hover effect
        >
          <ListItemText primary="Reschedules" primaryTypographyProps={{ style: { color: 'white' } }} />
        </ListItem>
        <ListItem
          button
          onClick={() => onMenuSelect('profile')}
          style={{ color: 'white' }}
          sx={{ '&:hover': { backgroundColor: '#2A3B4C' } }} // Hover effect
        >
          <ListItemText primary="Profile" primaryTypographyProps={{ style: { color: 'white' } }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default SidePanel;
