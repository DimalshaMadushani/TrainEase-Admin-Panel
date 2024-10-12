import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Checkbox,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

const Reschedule = () => {
  const [scheduleChange, setScheduleChange] = useState("");
  const [platformNumber, setPlatformNumber] = useState("");
  const [delayMinutes, setDelayMinutes] = useState("");
  const [notifyHalts, setNotifyHalts] = useState(false);
  const [date, setDate] = useState("");
  const [scheduleId, setScheduleId] = useState("");
  const [stationId, setStationId] = useState("");
  const [stations, setStations] = useState([]);
  const [stop, setStation] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [sName, setSchedule] = useState("");

  useEffect(() => {
    async function fetchSchedules() {
      try {
        const response = await axios.get(
          "https://trainease-backend.onrender.com/api/admin/schedules"
        );
        if (response.status === 200) {
          const resSchedules = response.data.map((schedule) => ({
            label:
              schedule.trainRef.name + (schedule.isReturn ? " - Return" : ""),
            scheduleId: schedule._id,
          }));
          setSchedules(resSchedules);
          console.log("Schedules:", resSchedules);
        } else {
          throw new Error("Failed to fetch schedules");
        }
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
        alert(
          "Failed to load schedules: " +
            (error.response && error.response.data.message
              ? error.response.data.message
              : error.message)
        );
      }
    }
    fetchSchedules();
  }, []);

  async function fetchStations(scheduleId) {
    try {
      console.log("Fetching stations for schedule:", scheduleId);
      const response = await axios.get(
        `https://trainease-backend.onrender.com/api/admin/stationsOfSchedule/${scheduleId}`
      );
      if (response.status === 200) {
        const resStations = response.data.map((station) => ({
          label: station.name,
          stationId: station.id,
        }));
        setStations(resStations);
      } else {
        throw new Error("Failed to fetch stations");
      }
    } catch (error) {
      console.error("Failed to fetch stations:", error);
      alert(
        "Failed to load stations: " +
          (error.response && error.response.data.message
            ? error.response.data.message
            : error.message)
      );
    }
  }

  const handleSelectStation = (station) => {
    setStation(station.label);
    setStationId(station.stationId);
  };

  const handleScheduleSelection = (schedule) => {
    console.log("Selected schedule:", schedule);
    if (schedule) {
      setSchedule(schedule.label); // Still store the label if needed
      setScheduleId(schedule.scheduleId); // Store the scheduleId separately for fetching stations
      fetchStations(schedule.scheduleId); // Call fetchStations with scheduleId here
    }
  };

  const handleRadioChange = (event) => {
    setScheduleChange(event.target.value);
    // Reset values when changing options
    setPlatformNumber("");
    setDelayMinutes("");
    setNotifyHalts(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!scheduleChange) {
      alert("Please select a change type.");
      return;
    }
    if (!date) {
      alert("Please select a date.");
      return;
    }
    if (!scheduleId) {
      alert("Please select a schedule.");
      return;
    }
    if (!stationId) {
      alert("Please select a station.");
      return;
    }
    if (scheduleChange === "platform" && !platformNumber) {
      alert("Please enter a platform number.");
      return;
    }
    if (scheduleChange === "time" && !delayMinutes) {
      alert("Please enter delay minutes.");
      return;
    }
    const data = {
      date,
      scheduleId,
      stopId: stationId,
      isPlatformChange: scheduleChange === "platform",
      change: scheduleChange === "platform" ? platformNumber : delayMinutes,
    };
    try {
      axios.post(
        "https://trainease-backend.onrender.com/api/admin/notifyReschedule",
        null,
        {
          params: data,
        }
      );
      alert("Notification sent successfully.");
    } catch (error) {
      console.error("Failed to send notification:", error);
      alert(
        "Failed to send notification: " +
          (error.response && error.response.data.message
            ? error.response.data.message
            : error.message)
      );
    }
  };

  return (
    <Box sx={{ padding: 4 }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Notify Schedule Changes
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Autocomplete
          options={schedules}
          getOptionLabel={(option) => option.label}
          value={
            schedules.find((schedule) => schedule.scheduleId === scheduleId) ||
            null
          }
          onChange={(event, newValue) => handleScheduleSelection(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Schedule" variant="outlined" />
          )}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Autocomplete
          options={stations}
          getOptionLabel={(option) => option.label}
          value={stations.find((station) => station.label === stop) || null}
          onChange={(event, newValue) => handleSelectStation(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Station" variant="outlined" />
          )}
        />
      </FormControl>
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Change Type</FormLabel>
        <RadioGroup
          row
          name="scheduleChange"
          value={scheduleChange}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="platform"
            control={<Radio />}
            label="Platform Change"
          />
          <FormControlLabel
            value="time"
            control={<Radio />}
            label="Time Change"
          />
        </RadioGroup>
      </FormControl>
      {scheduleChange === "platform" && (
        <FormControl fullWidth margin="normal">
          <TextField
            label="Platform Number"
            value={platformNumber}
            onChange={(e) => setPlatformNumber(e.target.value)}
          />
        </FormControl>
      )}
      {scheduleChange === "time" && (
        <Box>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Delay Minutes"
              type="number"
              value={delayMinutes}
              onChange={(e) => setDelayMinutes(e.target.value)}
            />
          </FormControl>
          {/* <FormControlLabel
            control={<Checkbox checked={notifyHalts} onChange={(e) => setNotifyHalts(e.target.checked)} />}
            label={`Notify the halts after ${platformNumber ? platformNumber : 'Halt'}`}
          /> */}
        </Box>
      )}
      <Button variant="contained" color="primary" sx={{ mt: 2 }} type="submit">
        Notify Passengers
      </Button>
    </Box>
  );
};

export default Reschedule;
