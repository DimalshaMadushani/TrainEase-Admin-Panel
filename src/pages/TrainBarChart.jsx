import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Select,
} from "@mui/material";

export default function TrainBarChart() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState("");

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(
          "https://trainease-backend.onrender.com/api/admin/trains",
          { withCredentials: true }
        );
        setTrains(response.data);
      } catch (error) {
        console.error("Error fetching trains data", error);
      }
    };
    fetchTrains();
  }, []);

  const fetchBookings = async () => {
    if (!startDate || !endDate || !selectedTrain) {
      alert("Please fill all fields before generating the graph.");
      return;
    }
    try {
      const response = await axios.get(
        `https://trainease-backend.onrender.com/api/admin/bookingsByDateAndSchedule`,
        {
          params: {
            startDate: startDate,
            endDate: endDate,
            trainId: selectedTrain,
          },
          withCredentials: true,
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching bookings data", error);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ padding: 3 }}
    >
      <Grid item xs={12}>
        <h1>Bookings By Train</h1>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          fullWidth
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <InputLabel id="select-train-label">Select Train</InputLabel>
          <Select
            labelId="select-train-label"
            value={selectedTrain}
            label="Select Train"
            onChange={(e) => setSelectedTrain(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {trains.map((train) => (
              <MenuItem key={train._id} value={train._id}>
                {train.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button variant="contained" fullWidth onClick={fetchBookings}>
          Generate Graph
        </Button>
      </Grid>
      <Grid item xs={12}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            {data.length > 0 &&
              data[0].scheduleCounts.map((schedule, index) => (
                <Bar
                  key={index}
                  dataKey={`scheduleCounts[${index}].count`}
                  name={`Schedule ${index + 1}`}
                  fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                />
              ))}
          </BarChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
}
