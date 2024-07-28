import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import OrdersSummary from '../Checkout/OrdersSummery';
import DeliveryAddressForm from './DeliveryAddressForm';
import PaymentPage from './Payment';

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payments'];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const step = parseInt(querySearch.get('step')) || 0;
  const navigate = useNavigate();

  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  const handleBack = () => {
    if (activeStep === 1) {
      navigate('/');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      navigate(`?step=${activeStep - 1}`);
    }
  };

  const handleNext = () => {
    // Check if it's the last step, if yes, navigate forward
    if (activeStep === steps.length - 1) {
      navigate(`?step=${activeStep + 1}`);
    } else {
      // Check if it's safe to navigate to the next step (e.g., form validation)
      // For now, just proceed to the next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      navigate(`?step=${activeStep + 1}`);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <div>Login Form</div>;
      case 1:
        return <DeliveryAddressForm handleNext={handleNext} />;
      case 2:
        return <OrdersSummary handleNext={handleNext} />;
      case 3:
        return <PaymentPage/>;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <Box sx={{ width: '100%', paddingTop: '130px' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ marginTop: '30px' }}>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext}>Next</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {renderStepContent(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

export default Checkout;
