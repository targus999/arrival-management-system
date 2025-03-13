import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductSummary = ({ id, handleCancel }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [arrival, setArrival] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const getArrival = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/arrival/get/${id}`);
        if(res.status !== 200) {
            console.log('Error fetching arrival details');
            toast.error('Error fetching arrival details');
            return;
        }
        setArrival(res.data);
    }

    const getProducts = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/all/${id}`);
        setProducts(res.data);
        console.log(res.data);
    }

    useEffect(() => {
        getProducts();
        getArrival();
    }, [id]);

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
        <>
        <Typography variant="h6" gutterBottom>
            Arrival Summary
        </Typography>
        {/* Arrival Details */}
            <Table size="small" aria-label="details">
                <TableHead className='custom-table-head'>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Pallets</TableCell>
                        <TableCell>Boxes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Expected</TableCell>
                        <TableCell>{arrival.total_pallets || '-'}</TableCell>
                        <TableCell>{arrival.total_boxes || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Received</TableCell>
                        <TableCell>{arrival.actual_received_pallets || '-'}</TableCell>
                        <TableCell>{arrival.actual_received_boxes || '-'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Divider sx={{paddingTop:'2%',marginBottom:'2%'}}/>

            {/* Product Details */}
            <Table size="small" aria-label="details">
                <TableHead className='custom-table-head'>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Condition</TableCell>
                        <TableCell>Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.length?products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name||"-"}</TableCell>
                            <TableCell>{product.category||"-"}</TableCell>
                            <TableCell>{product.condition||"-"}</TableCell>
                            <TableCell>{product.quantity||"-"}</TableCell>
                        </TableRow>
                    )):(
                        <TableRow>
                            <TableCell colSpan={4} align="center">No products received</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/*  Footer Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button variant="outlined" color="inherit" onClick={handleCancel}>
                    Cancel
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant="outlined" onClick={() => setOpenDialog(true)}>
                    Finish Processing
                </Button>
            </Box>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirm Process Completion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to finish processing this arrival?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="inherit">
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenDialog(false);
                            processFinished();
                        }}
                        color="primary"
                        variant="contained"
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductSummary;