import React, { useState, useEffect } from "react";
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

const UpdateArrivals = ({  handleClose, id }) => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [formData, setFormData] = useState({
        supplier_id: "",
        expected_arrival_date: "",
        title: "",
        total_pallets: '',
        total_boxes: '',
        total_pieces: '',
        total_weight: '',
    });

    const [errors, setErrors] = useState({});

    const clearFormData = () => {
        setFormData({
            supplier_id: "",
            expected_arrival_date: "",
            title: "",
            total_pallets: '',
            total_boxes: '',
            total_pieces: '',
            total_weight: '',
        });
    }

    useEffect(() => {
        getSuppliers();
        getArrival();
    }, []);

    const getArrival = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/arrival/get/${id}`);
            setFormData(res.data);
            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    };

    const getSuppliers = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/supplier`)
            setSuppliers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.expected_arrival_date) tempErrors.expected_arrival_date = "Expected date is required";
        if (!formData.supplier_id) tempErrors.supplier_id = "Supplier is required";
        if (!formData.title) tempErrors.title = "Title is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (data) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/arrival/update/${id}`, data);
            if (res.status === 201) {
                console.log("Arrival Updated successfully");
            }
            navigate("/upcoming");
        } catch (error) {
            console.log(error);
        }
    }

    const onCancel = () => {
        clearFormData();
        handleClose();
    }
    const onSubmit = () => {
        if (validate()) {
            handleSubmit(formData);
            clearFormData();
            handleClose();
        }
    };

    return (
        <Modal open={true}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography variant="h5">
                    
                    <EditIcon />
                    {formData.arrival_number}
                    </Typography>
                <TextField
                    select
                    label={<span>Supplier <span style={{ color: "red" }}>*</span></span>}
                    name="supplier_id"
                    value={formData.supplier_id}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.supplier_id}
                    helperText={errors.supplier_id}
                >
                    {suppliers.map((supplier) => (
                        <MenuItem key={supplier.id} value={supplier.id}>
                            {supplier.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label={<span>Expected Arrival Date <span style={{ color: "red" }}>*</span></span>}
                    name="expected_arrival_date"
                    type="date"
                    value={formData.expected_arrival_date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    error={!!errors.expected_arrival_date}
                    helperText={errors.expected_arrival_date}
                />
                <TextField
                    label={<span>Title<span style={{ color: "red" }}>*</span></span>}
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    label="Total Pallets"
                    name="total_pallets"
                    type="number"
                    value={formData.total_pallets}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Total Boxes"
                    name="total_boxes"
                    type="number"
                    value={formData.total_boxes}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Total Pieces"
                    name="total_pieces"
                    type="number"
                    value={formData.total_pieces}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Total Weight (Kg)"
                    name="total_weight"
                    type="number"
                    inputProps={{ step: "0.01" }}
                    value={formData.total_weight}
                    onChange={handleChange}
                    fullWidth
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button variant="outlined" onClick={onCancel}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmit} color="primary">
                        Update                    
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UpdateArrivals;
