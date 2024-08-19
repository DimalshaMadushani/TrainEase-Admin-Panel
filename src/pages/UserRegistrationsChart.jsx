import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Text,
} from "recharts";
import { TextField, Grid, Box } from '@mui/material';

const RegistrationPage = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (startDate && endDate) {  // Ensure both dates are selected
      const fetchUserRegistrations = async () => {
        try {
          const response = await axios.get("/api/admin/userRegistrations", {
            params: {
              startDate: startDate,
              endDate: endDate,
            },
          });
          setData(response.data);
        } catch (error) {
          console.error("Error fetching user registrations data", error);
        }
      };

      fetchUserRegistrations();
    }
  }, [startDate, endDate]);

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f4f6f8' }}>
      <h2 style={{ textAlign: 'center' }}>User Registrations By Date</h2>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      {startDate && endDate ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" name="Date" />
            <YAxis label={<Text x={0} y={0} dx={20} dy={150} offset={0} angle={-90} fontWeight="bold">Registrations</Text>} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Box sx={{ textAlign: 'center', padding: 5, fontSize: '16px' }}>
          Please select both start and end dates to view the chart.
        </Box>
      )}
    </Box>
  );
};

export default RegistrationPage;
