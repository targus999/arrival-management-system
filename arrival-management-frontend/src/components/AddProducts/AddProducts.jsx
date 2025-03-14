import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const AddProducts = ({ id, handleNext, handleCancel }) => {
    const navigate = useNavigate();
    const [barcode, setBarcode] = useState('');
    const [openDialog, setOpenDialog] = useState(false); // For confirmation dialog
    const [barcodeEntry, setBarcodeEntry] = useState(true);
    const [productData, setProductData] = useState({
        name: '',
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

    //  Clear fields when barcode entry is toggled
    const clearFields = () => {
        setBarcode('');
        setProductData({
            name: '',
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
            if (res.data) {
                toast.success("Product found with barcode");
                delete res.data.quantity;
                delete res.data.condition;
                delete res.data.id;
                res.data.arrival_id = id;
                setProductData({
                    ...res.data,
                    condition: res.data.condition ?? "", // Ensure condition is always a valid value
                    quantity: res.data.quantity ?? "",
                });
            }
            else{
                toast.error("Product not found with barcode");
            }
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
                toast.success("Product added successfully");
                clearFields();
            }
            else{
                toast.error("Error adding product");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    
    return (
        <Box>
            <FormControl component="fieldset">
                <FormLabel component="legend">Search product with barcode?</FormLabel>
                <RadioGroup row value={barcodeEntry} onChange={(e) => setBarcodeEntry(e.target.value === 'true')}>
                    <FormControlLabel value={true} control={<Radio />} label="Yes" />
                    <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
            {barcodeEntry ? (<>
                <Typography variant='h6'>Search with Barcode</Typography>
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
                                <FormControl fullWidth error={!!errors.condition}>
                                    <InputLabel>{<span>Condition <span style={{ color: "red" }}>*</span></span>}</InputLabel>
                                    <Select
                                        name="condition"
                                        value={productData.condition}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="New">New</MenuItem>
                                        <MenuItem value="Old">Old</MenuItem>
                                    </Select>
                                    {errors.condition && <FormHelperText>{errors.condition}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField
                                    label={<span>Quantity <span style={{ color: "red" }}>*</span></span>}
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
                        <FormControl fullWidth >
                            <InputLabel>Brand </InputLabel>
                            <Select
                                name="brand"
                                value={productData.brand}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Brand-1">Brand-1</MenuItem>
                                <MenuItem value="Brand-2">Brand-2</MenuItem>
                                <MenuItem value="Brand-3">Brand-3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth error={!!errors.category}>
                            <InputLabel>{<span>Category <span style={{ color: "red" }}>*</span></span>}</InputLabel>
                            <Select
                                name="category"
                                value={productData.category}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Apparel">Apparel</MenuItem>
                                <MenuItem value="Footwear">Footwear</MenuItem>
                            </Select>
                            {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            label="Name"
                            fullWidth
                            name="name"
                            value={productData.name}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    {/* Second Row */}
                    <Grid item xs={2}>
                        <FormControl fullWidth >
                            <InputLabel>Color </InputLabel>
                            <Select
                                name="color"
                                value={productData.color}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Red">Red</MenuItem>
                                <MenuItem value="Green">Green</MenuItem>
                                <MenuItem value="Yellow">Yellow</MenuItem>
                                <MenuItem value="Blue">Blue</MenuItem>
                            </Select>
                        </FormControl>
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
                    <Grid item xs={2}>
                        <FormControl fullWidth error={!!errors.condition}>
                            <InputLabel>{<span>Condition <span style={{ color: "red" }}>*</span></span>}</InputLabel>
                            <Select
                                name="condition"
                                value={productData.condition}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="New">New</MenuItem>
                                <MenuItem value="Old">Old</MenuItem>
                            </Select>
                            {errors.condition && <FormHelperText>{errors.condition}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            label={<span>Quantity <span style={{ color: "red" }}>*</span></span>}
                            type="number"
                            fullWidth
                            name="quantity"
                            value={productData.quantity}
                            onChange={handleInputChange}
                            error={!!errors.quantity}
                            helperText={errors.quantity}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth >
                            <InputLabel>size </InputLabel>
                            <Select
                                name="size"
                                value={productData.size}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="Small">Small</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="Large">Large</MenuItem>
                            </Select>
                        </FormControl>
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
                <Button variant="outlined" onClick={() => handleNext()}>
                    Finish
                </Button>
            </Box>

            
        </Box>
    )
};
export default AddProducts;