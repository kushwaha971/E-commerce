import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const steps = ["Sign In", "Shipping address", "Payment details","Place Order"];

function CheckOutSteps(props) {
  return (
    <Box>
      <Stepper activeStep={props.state}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default CheckOutSteps;
