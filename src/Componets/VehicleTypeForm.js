import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

export default function VehicleTypeForm(props) {
  const [types, setTypes] =  React.useState("");
  const handleChange = (e, types) => {
    setTypes(types)
   props.saveData({type: types})
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Type
      </Typography>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
         {props && props.types && props.types.length > 0 &&
            <RadioGroup
             row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="vehicle"
              name="radio-buttons-group"
            > {props.types.map((type, index) => {
              return (
                // <FormControlLabel key={item.id} value={item.name} control={<Radio onChange={(e)=>{handleChange(e, item.types)}} />} label={item.name} />
                <FormControlLabel  key={index} value={type} control={<Radio onChange={(e)=>{handleChange(e, type)}}/>} label={type} />

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