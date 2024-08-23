import React, { useState , useEffect} from 'react';
import {
  Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Checkbox, Button, Typography,Autocomplete
} from '@mui/material';
import axios from 'axios';

const Reschedule = () => {
  const [scheduleChange, setScheduleChange] = useState('');
  const [platformNumber, setPlatformNumber] = useState('');
  const [delayMinutes, setDelayMinutes] = useState('');
  const [notifyHalts, setNotifyHalts] = useState(false);

  const [stations, setStations] = useState([]);
    const [stop, setStation] = useState('');

  useEffect(() => {
    async function fetchStations() {
      try {
        const response = await axios.get("/api/search/stations");
        if (response.status === 200) {
          const resStations = response.data.map((station) => ({
            label: station.name,
          }));
          setStations(resStations);
          console.log("Stations:", resStations);
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
    fetchStations();
  }, []);

  const handleSelectStation = (station) => {
    setStation(station.label);
    };

  const handleRadioChange = (event) => {
    setScheduleChange(event.target.value);
    // Reset values when changing options
    setPlatformNumber('');
    setDelayMinutes('');
    setNotifyHalts(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notify Schedule Changes
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="Schedule" />
      </FormControl>
      <FormControl fullWidth margin="normal">
      <Autocomplete
          options={stations}
          getOptionLabel={(option) => option.label}
          value={stations.find(station => station.label === stop) || null}
          onChange={(event, newValue) => handleSelectStation(newValue)}
          renderInput={(params) => <TextField {...params} label="Station" variant="outlined" />}
        />
      </FormControl>
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Change Type</FormLabel>
        <RadioGroup row name="scheduleChange" value={scheduleChange} onChange={handleRadioChange}>
          <FormControlLabel value="platform" control={<Radio />} label="Platform Change" />
          <FormControlLabel value="time" control={<Radio />} label="Time Change" />
        </RadioGroup>
      </FormControl>
      {scheduleChange === 'platform' && (
        <FormControl fullWidth margin="normal">
          <TextField
            label="Platform Number"
            value={platformNumber}
            onChange={(e) => setPlatformNumber(e.target.value)}
          />
        </FormControl>
      )}
      {scheduleChange === 'time' && (
        <Box>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Delay Minutes"
              type="number"
              value={delayMinutes}
              onChange={(e) => setDelayMinutes(e.target.value)}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={notifyHalts} onChange={(e) => setNotifyHalts(e.target.checked)} />}
            label={`Notify the halts after ${platformNumber ? platformNumber : 'Halt'}`}
          />
        </Box>
      )}
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Notify Passengers
      </Button>
    </Box>
  );
};

export default Reschedule;
