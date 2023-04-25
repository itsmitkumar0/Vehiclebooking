// import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useState } from 'react';


export default function NameForm(props) {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "firstName") {
      setFname(value)
      props.saveData({ firstName: value, lastName: lname })

    }
    if (name == "lastName") {
      setLname(value)
      props.saveData({ firstName: fname, lastName: value })

    }

  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Enter your name
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            value={fname}
            onChange={handleChange}
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={lname}
            onChange={handleChange}
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}