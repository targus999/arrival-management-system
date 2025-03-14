import React, { useEffect, useState } from 'react';
import { Modal, Box, Stepper, Step, StepLabel, Button, Typography, TextField, Divider } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UpdateReceivedQuantity from '../UpdateReceivedQuantity/UpdateReceivedQuantity';
import AddProducts from '../AddProducts/AddProducts';
import ProductSummary from '../ProductSummary/ProductSummary';

const steps = ['Update Received Quantity', 'Add Products', 'Arrival Summary'];

const ProcessArrivals = ({ handleClose, id }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    
    // Function to handle the next step
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // Function to handle the previous step
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
                    <Divider sx={{paddingTop:'2%',marginBottom:'2%'}}/>
                    <div>
                        
                        {activeStep == 0 ? 
                        <UpdateReceivedQuantity id={id} handleNext={handleNext} handleCancel={handleCancel}/>
                        : activeStep == 1 ?
                        <AddProducts id={id} handleNext={handleNext} handleCancel={handleCancel}/>
                        :
                        <ProductSummary id={id} handleCancel={handleClose}/>
                        }


                    </div>

                </div>
            </Box>
        </Modal>
    );
};

export default ProcessArrivals;