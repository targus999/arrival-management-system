import React, { useEffect, useState } from 'react';
import { Modal, Box, Stepper, Step, StepLabel, Button, Typography, TextField, Divider } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UpdateReceivedQuantity from '../UpdateReceivedQuantity/UpdateReceivedQuantity';
import AddProducts from '../AddProducts/AddProducts';

const steps = ['Update Received Quantity', 'Add Products'];

const ProcessArrivals = ({ handleClose, id }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    
    const handleNext = () => {
        setActiveStep(1);
    };

    const handleCancel = () => {
        navigate(location.pathname, { replace: true });
        handleClose()
    };

    return (
        <Modal open={true} >
            <Box sx={{ width: 1000,height: 'auto', bgcolor: 'background.paper', p: 4, mx: 'auto', mt: '4%', borderRadius: 2 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <Divider sx={{paddingTop:'3%',marginBottom:'3%'}}/>
                    <div>
                        
                        {activeStep == 0 ? 
                        <UpdateReceivedQuantity id={id} handleNext={handleNext} handleCancel={handleCancel}/>
                        :
                        <AddProducts id={id} handleCancel={handleClose}/> 
                        }


                    </div>

                </div>
            </Box>
        </Modal>
    );
};

export default ProcessArrivals;