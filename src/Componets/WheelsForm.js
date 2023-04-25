import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';


export default function WheelsForm(props) {
  const [wheels, setWheels] =  React.useState("");
  const handleChange = (e, wheels) => {
   setWheels(wheels)
   props.saveData({wheel: wheels})
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Number of Wheels
      </Typography>
      <Grid container spacing={3}>


        <Grid item xs={12}>
        {props && props.wheels && props.wheels.length > 0 &&
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="vehicle"
            name="radio-buttons-group"
          >{props.wheels.map((wheel, index) => {
            return (
              <FormControlLabel  key={index} value={wheel} control={<Radio onChange={(e)=>{handleChange(e, wheel)}}/>} label={wheel} />
              
            )
          })

            }
          
            
          </RadioGroup>
        }
        </Grid>
        

      </Grid>
    </React.Fragment>
  );
}