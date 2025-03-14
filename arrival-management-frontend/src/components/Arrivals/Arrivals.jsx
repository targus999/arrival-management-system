import React, { useState, useEffect } from 'react';
import TableComponent from '../TableComponent/TableComponent';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Arrivals = ({ name }) => {
    const location = useLocation();
    const [arrivals, setArrivals] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    //a function to fetch the arrivals
    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/arrival/${name.split(' ')[0].toLowerCase()}`);
            setArrivals(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [name,location]);

    return (
        <div>
            <h2>{name}</h2>
            <TableComponent data={arrivals} />
        </div>
    );
};

export default Arrivals;