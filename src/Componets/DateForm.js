import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';


export default function DateForm(props) {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [vehicleBDate, setVehicleBDate] = React.useState("");
  React.useEffect(()=> {
    axios.get(`https://octalogic-test-frontend.vercel.app/api/v1/bookings/${props.id}`).then(resp => {
      setVehicleBDate(resp.data)
    })
  }, [])
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "startDate") {
      setStartDate(value)
      props.saveData({ startDate: value, endDate: endDate })

    }
    if (name == "endDate") {
      setEndDate(value)
      props.saveData({ startDate: startDate, endDate: value })

    }

  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Date
      </Typography>
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={6}>
        <div>
        <span>Start date</span>
    <input type="date" id='startDate' name="startDate" value={startDate} onChange={handleChange}/><br />
    <span>End date</span>
    <input type="date" id='endDate' name="endDate" value={endDate} onChange={handleChange} />
    </div>
        </Grid>
        
        
      </Grid>
    </React.Fragment>
  );
}