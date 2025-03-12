import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const UpdateReceivedQuantity = ({ id, handleNext, handleCancel }) => {
    const [arrival, setArrival] = useState(0);
    const [received, setReceived] = useState({
        pallets: '',
        boxes: '',
    });
    const [errors, setErrors] = useState({ pallets: false, boxes: false });

    const proceed = () => {
        if (validateInputs()) {
            updateReceived();
        }
    };

    const updateReceived = async () => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/arrival/process-received/${id}`, received);
            if(res.status === 200){   
                handleNext();
            }

        } catch (error) {
            console.log(error);
        }
    };
    const validateInputs = () => {
        const newErrors = {
            pallets: !received.pallets || isNaN(received.pallets),
            boxes: !received.boxes || isNaN(received.boxes),
        };
        setErrors(newErrors);
        return !newErrors.pallets && !newErrors.boxes;
    };
    useEffect(() => {
        getArrivalAndStep();
    }, []);

    const getArrivalAndStep = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/arrival/get/${id}`);
            setArrival(res.data);

            if (res.data.status === 'processing') {
                handleNext();
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <Typography variant='h6'>Update Received Quantity</Typography>
            <TextField
                label="Pallets"
                type="number"
                fullWidth
                margin="normal"
                value={received.pallets}
                onChange={(e) => setReceived({ ...received, pallets: e.target.value })}
                error={errors.pallets}
                helperText={errors.pallets ? "Pallets is required" : ""}
            />
            <TextField
                label="Boxes"
                type="number"
                fullWidth
                margin="normal"
                value={received.boxes}
                onChange={(e) => setReceived({ ...received, boxes: e.target.value })}
                error={errors.boxes}
                helperText={errors.boxes ? "Boxes is required" : ""}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button variant="outlined" color="inherit" onClick={handleCancel}>
                    Cancel
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant="outlined" onClick={proceed}>
                    Next
                </Button>
            </Box>
        </>
    )
};
export default UpdateReceivedQuantity;