import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const AddProducts = ({ id, handleCancel }) => {
    const navigate = useNavigate();
    const [barcode, setBarcode] = useState('');
    const [barcodeEntry, setBarcodeEntry] = useState(true);
    const [productData, setProductData] = useState({
        arrival_id: id,
        barcode: '',
        brand: '',
        category: '',
        size: '',
        color: '',
        style: '',
        condition: '',
        quantity: ''
    });


    const [errors, setErrors] = useState({});

    const clearFields = () => {
        setBarcode('');
        setProductData({
            arrival_id: id,
            barcode: '',
            brand: '',
            category: '',
            size: '',
            color: '',
            style: '',
            condition: '',
            quantity: ''
        });
    };

    useEffect(() => {
        clearFields();

    }, [barcodeEntry]);


    //  Validate barcode by calling API
    const validateBarcode = async () => {
        if (!barcode) {
            setErrors({ barcode: "Barcode cannot be empty" });
            return;
        }
        setErrors({});
        try {


            const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/barcode/${barcode}`);
            if (res.data) setProductData(res.data);
            console.log('BARCODE: ', res.data);
        } catch (error) {
            console.error("Error validating barcode:", error);
        }
    };

    //  Handle input change for product form
    const handleInputChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    //  Perform validation before submitting product data
    const validateForm = () => {
        const newErrors = {};
        if (!productData.category) newErrors.category = "Category is required";
        if (!productData.condition) newErrors.condition = "Condition is required";
        if (!productData.quantity || isNaN(productData.quantity) || productData.quantity < 1) {
            newErrors.quantity = "Quantity must be greater than 0";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //  Handle form submission
    const handleSubmit = async () => {
        if (!validateForm()) return;
        console.log('PRODUCT DATA: ', productData);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/add`, productData);
            if (res.status === 201) {
                clearFields();
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    const processFinished = async () => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_API_URL}/arrival/process-finished/${id}`);
            if (res.status === 200) {
                handleCancel();
                navigate('/finished');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box>
            <FormControl component="fieldset">
                <FormLabel component="legend">Does the product have barcode?</FormLabel>
                <RadioGroup row value={barcodeEntry} onChange={(e) => setBarcodeEntry(e.target.value === 'true')}>
                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
            {barcodeEntry ? (<> <Typography variant='h6'>Search with Barcode</Typography>
                {/*  Barcode Input Field */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Grid container direction="column" spacing={2}>
                    <TextField
                        label="Barcode"
                        fullWidth
                        margin="normal"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        error={!!errors.barcode}
                        helperText={errors.barcode}
                    />
                    <IconButton color="primary" onClick={validateBarcode}>
                        <SearchIcon />
                    </IconButton>
                    {productData.barcode && <>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Enter Condition and Quantity
                        </Typography>
                       
                            <Grid item>
                                <TextField
                                    label="Condition"
                                    fullWidth
                                    name="condition"
                                    value={productData.condition}
                                    onChange={handleInputChange}
                                    error={!!errors.condition}
                                    helperText={errors.condition}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    fullWidth
                                    name="quantity"
                                    value={productData.quantity}
                                    onChange={handleInputChange}
                                    error={!!errors.quantity}
                                    helperText={errors.quantity}
                                />
                            </Grid>
                        
                        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                            Add Product
                        </Button>
                    </>}
</Grid>
                    
                </Box>
            </>) : (<>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Add Product Manually
                </Typography>

                <Grid container spacing={2}>
                    {/* First Row */}
                    <Grid item xs={3}>
                        <TextField
                            label="Barcode (Optional)"
                            fullWidth
                            name="barcode"
                            value={productData.barcode}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Brand"
                            fullWidth
                            name="brand"
                            value={productData.brand}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Category"
                            fullWidth
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            error={!!errors.category}
                            helperText={errors.category}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Size"
                            fullWidth
                            name="size"
                            value={productData.size}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Second Row */}
                    <Grid item xs={3}>
                        <TextField
                            label="Color"
                            fullWidth
                            name="color"
                            value={productData.color}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Style"
                            fullWidth
                            name="style"
                            value={productData.style}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Condition"
                            fullWidth
                            name="condition"
                            value={productData.condition}
                            onChange={handleInputChange}
                            error={!!errors.condition}
                            helperText={errors.condition}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Quantity"
                            type="number"
                            fullWidth
                            name="quantity"
                            value={productData.quantity}
                            onChange={handleInputChange}
                            error={!!errors.quantity}
                            helperText={errors.quantity}
                        />
                    </Grid>
                </Grid>

                <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                    Add Product
                </Button>
            </>)}

            <>

            </>
            <Divider sx={{ mt: "2%" }} />
            {/*  Footer Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button variant="outlined" color="inherit" onClick={handleCancel}>
                    Cancel
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant="outlined" onClick={processFinished}>
                    Finish
                </Button>
            </Box>
        </Box>
    )
};
export default AddProducts;