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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TrainBarChart() {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [trains, setTrains] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState("");

  useEffect(() => {
    // Fetch train names for the dropdown
    const fetchTrains = async () => {
      try {
        const response = await axios.get("/api/admin/trains");
        setTrains(response.data);
      } catch (error) {
        console.error("Error fetching trains data", error);
      }
    };

    fetchTrains();
  }, []);

  const handleDateChange = (update) => {
    const [start, end] = update;
    if (end && (end - start) / (1000 * 60 * 60 * 24) > 20) {
      alert("Please select a continuous 7-day range.");
      setDateRange([start, null]);
    } else {
      setDateRange(update);
    }
  };

  const fetchBookings = async () => {
    if (!startDate || !endDate || !selectedTrain) {
      alert("Please fill all fields before generating the graph.");
      return;
    }

    try {
      const response = await axios.get(`/api/admin/bookingsByDateAndSchedule`, {
        params: {
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
          trainId: selectedTrain,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching bookings data", error);
    }
  };

  return (
    <div>
      <h1>Bookings By Date</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
          placeholderText="Select a 7-day range"
          isClearable={true}
        />
        <select
          value={selectedTrain}
          onChange={(e) => setSelectedTrain(e.target.value)}
        >
          <option value="">Select Train</option>
          {trains.map((train) => (
            <option key={train._id} value={train._id}>
              {train.name}
            </option>
          ))}
        </select>
        <button onClick={fetchBookings}>Generate Graph</button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
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
    </div>
  );
}
