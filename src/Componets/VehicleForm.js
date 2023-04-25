import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NameForm from './NameForm';
import WheelsForm from './WheelsForm';
import VehicleTypeForm from './VehicleTypeForm';
import VehicleModelForm from './VehicleModelForm';
import DateForm from './DateForm'
import axios from 'axios';
// import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';

const steps = ['Name', 'Wheels', 'Type', 'Model', 'Date'];

function getStepContent(step, data, saveFormData, formData) {
  let wheelsCategories = [];
  let vehicleModels = [];
  let vehicleTypes = [];

  for (let i = 0; i < data.length; i++) {
    let item = data[i];

    wheelsCategories.push(item.wheels);
    if (formData.wheel == item.wheels) {
      vehicleTypes.push(item.name)
    }
    if (formData.type == item.name) {
      vehicleModels.push(...item.vehicles)
    }
  }
  switch (step) {
    case 0:
      return <NameForm saveData={saveFormData} />;
    case 1:
      return <WheelsForm wheels={wheelsCategories} saveData={saveFormData} />;
    case 2:
      return <VehicleTypeForm types={vehicleTypes} saveData={saveFormData} />;
    case 3:
      return < VehicleModelForm saveData={saveFormData} models={vehicleModels} />;
    case 4:
      return <DateForm saveData={saveFormData} id={formData.vehicleId} />
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function VehicleForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [formData, setFormData] = React.useState({ firstName: "", lastName: "", wheel: "", type: "", model: "", startDate: "", endDate: "" });
  const [formError, setFormError] = React.useState(false);
  React.useEffect(() => {

    axios.get('https://octalogic-test-frontend.vercel.app/api/v1/vehicleTypes').then(resp => {
      setData(resp.data.data)
    })
  }, [])
  
  const validateForm = () => {
    let err = false;
    if (activeStep === 0) {
      if (formData.firstName === "" || formData.lastName === "") {
        err = true;
      }
    }
    if (activeStep === 1) {
      if (formData.wheel === "") {
        err = true;

      }
    }
    if (activeStep === 2) {
      if (formData.type === "") {
        err = true;

      }
    }
    if (activeStep === 3) {
      if (formData.model === "") {
        err = true;

      }
    }
    if (activeStep === 4) {
      if (formData.startDate === "" || formData.endDate === "") {
        err = true;

      }
    }
    if (!err) {
      handleNext();
    }
    setFormError(err)
  }
  const saveFormData = (obj = {}) => {
    setFormData({ ...formData, ...obj })
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>

      {formError && <Alert severity="error">Please fill or select the required field(s) on this page!</Alert>}

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Vehicle details
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your booking.
              </Typography>

            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, data, saveFormData, formData)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={validateForm}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Book' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>

      </Container>
    </ThemeProvider>
  );
}