import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "./TableComponent.css";
import { styled } from '@mui/material/styles';

const StatusBox = styled('span')(({ status }) => ({
  display: 'inline-block',
  padding: '4px 10px',
  borderRadius: '12px',
  fontWeight: 'bold',
  // color: '#fff',
  background: status === 'finished' ? 'lightgreen' : status === 'upcoming' ? 'pink' : 'orange',
}));

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  const formatValue = (value) => (value === null || value === undefined ? '-' : value);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{formatValue(row.arrival_number)}</TableCell>
        <TableCell>{formatValue(row.title)}</TableCell>
        <TableCell>
          <StatusBox status={row.status}>{formatValue(row.status)}</StatusBox>
        </TableCell>
        <TableCell>{formatValue(row.expected_arrival_date)}</TableCell>
        <TableCell>{formatValue(row.supplier?.name)}</TableCell>
        <TableCell>{formatValue(row.total_pieces)}</TableCell>
        <TableCell>{formatValue(row.total_weight)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                More Info 
              </Typography>
              <Table size="small" aria-label="purchases">
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
                    <TableCell>{formatValue(row.total_pallets)}</TableCell>
                    <TableCell>{formatValue(row.total_boxes)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Received</TableCell>
                    <TableCell>{formatValue(row.actual_received_pallets)}</TableCell>
                    <TableCell>{formatValue(row.actual_received_boxes)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
};

export default function CollapsibleTable({ data }) {
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead className='custom-table-head'>
          <TableRow>
            <TableCell />
            <TableCell>Arrival Number</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Expected Date</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>Pieces</TableCell>
            <TableCell>Weight&nbsp;(Kg)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
