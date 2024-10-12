import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Text,
  ResponsiveContainer,
} from "recharts";
import { TextField, Grid, Box } from "@mui/material";

const RevenueChart = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (startDate && endDate) {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(
            "https://trainease-backend.onrender.com/api/admin/revenue",
            {
              params: {
                startDate: startDate,
                endDate: endDate,
              },
              withCredentials: true,
            }
          );
          setData(response.data);
        } catch (error) {
          console.error("Error fetching bookings data", error);
        }
      };

      fetchBookings();
    }
  }, [startDate, endDate]);

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f4f6f8" }}>
      <h2 style={{ textAlign: "center" }}>Revenue of Bookings</h2>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ m: 3, mb: 5 }}
      >
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
            <XAxis dataKey="_id" name="Date" />
            <YAxis
              label={
                <Text
                  x={0}
                  y={0}
                  dx={20}
                  dy={150}
                  offset={0}
                  angle={-90}
                  fontWeight="bold"
                >
                  Revenue (LKR)
                </Text>
              }
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Box sx={{ textAlign: "center", padding: 5, fontSize: "20px" }}>
          Please select both start and end dates to view the chart.
        </Box>
      )}
    </Box>
  );
};

export default RevenueChart;
