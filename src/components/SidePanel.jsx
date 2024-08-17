// src/components/SidePanel.js
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SidePanel = ({ onMenuSelect }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div style={{ width: '250px', height: '100vh', borderRight: '1px solid #ccc' }}>
      <List component="nav">
        <ListItem button onClick={handleClick}>
          <ListItemText primary="Charts" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button onClick={() => onMenuSelect('bookings')} style={{ paddingLeft: '32px' }}>
              <ListItemText primary="Bookings" />
            </ListItem>
            <ListItem button onClick={() => onMenuSelect('revenue')} style={{ paddingLeft: '32px' }}>
              <ListItemText primary="Revenue" />
            </ListItem>
            <ListItem button onClick={() => onMenuSelect('registrations')} style={{ paddingLeft: '32px' }}>
              <ListItemText primary="User Registrations" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={() => onMenuSelect('reschedules')}>
          <ListItemText primary="Reschedules" />
        </ListItem>
        <ListItem button onClick={() => onMenuSelect('profile')}>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </div>
  );
};

export default SidePanel;
