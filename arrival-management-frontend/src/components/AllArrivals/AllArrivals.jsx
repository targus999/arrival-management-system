import React, { useState, useEffect } from 'react';
import TableComponent from '../TableComponent/TableComponent';
import axios from 'axios';

const AllArrivals = () => {
    const [arrivals, setArrivals] = useState([]);
    const apiUrl =  process.env.REACT_APP_API_URL;

    const fetchData = async () => {
        const res = await axios.get(`${apiUrl}/arrival/get-all`);
        console.log(res.data);
        setArrivals(res.data);
    }

    useEffect(() => {
        fetchData();
    },[]);  

    return (
        <div>
            <h1>All Arrivals</h1>
            <TableComponent data={arrivals} />
        </div>
    );
};

export default AllArrivals;