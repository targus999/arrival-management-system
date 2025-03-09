import React, { useEffect, useState } from 'react';
import TableComponent from '../TableComponent/TableComponent';
import axios from 'axios';

const UpcomingArrivals = () => {
    const [arrivals, setArrivals] = useState([]);
    const apiUrl =  process.env.REACT_APP_API_URL;

    const fetchData = async () => {
        const res = await axios.get(`${apiUrl}/arrival/get-upcoming`);
        console.log(res.data);
        setArrivals(res.data);
    }

    useEffect(() => {
        fetchData();
    },[]);  
    return (
        <div>
            <h1>Upcoming Arrivals</h1>
            <TableComponent data={arrivals}/>
        </div>
    );
};

export default UpcomingArrivals;