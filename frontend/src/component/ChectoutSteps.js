import { Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

function ChectoutSteps(props) {
    // const [activeStep,setActiveSptep] = React.useState([])
   
  return (
    <Box sx={{ width: '100%' }}>
    <Stepper>
    <Step>
        <StepLabel></StepLabel>
    </Step>
    </Stepper>
    </Box>
  )
}

export default ChectoutSteps  