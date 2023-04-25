import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';

export default function VehicleModelForm(props) {
  const [modelsInfo, setModelsInfo] = React.useState([]);
  const handleChange = (e, name, id) => {
    props.saveData({ model: name, vehicleId: id })
  }
  React.useEffect(() => {
    getModelInfo();
  }, [])
  const getModelInfo = () => {
    Promise.all(props.models.map(model => {
      return (
        axios.get(`https://octalogic-test-frontend.vercel.app/api/v1/vehicles/${model.id}`)
      )
    })
    )
      .then(response => {
        let resp = response.map(item => {
          return item.data.data
        })
        setModelsInfo(resp)
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Model
      </Typography>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="vehicle"
            name="radio-buttons-group"
          >
            {modelsInfo.map((model, index) => {
              return (
                <div><img src={model.image.publicURL} height="40px" width="40px"/>
                  <FormControlLabel key={index} value={model.name} control={<Radio onChange={(e) => { handleChange(e, model.name, model.id) }} />} label={model.name} />

                </div>


              )
            })

            }

          </RadioGroup>
        </Grid>


      </Grid>
    </React.Fragment>
  );
}