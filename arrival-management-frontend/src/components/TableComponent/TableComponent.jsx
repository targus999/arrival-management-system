// TableComponent.js
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
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InnerTableComponent from '../InnerTableComponent/InnerTableComponent';
import { Chip, styled } from '@mui/material';

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.arrival_number || '-'}</TableCell>
        <TableCell>{row.title || '-'}</TableCell>
        <TableCell><Chip label={row.status} color={row.status=='finished'?'error':row.status=='processing'?'warning':'success'} /></TableCell>
        <TableCell>{row.expected_arrival_date || '-'}</TableCell>
        <TableCell>{row.supplier?.name || '-'}</TableCell>
        <TableCell>{row.total_pieces || '-'}</TableCell>
        <TableCell>{row.total_weight || '-'}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <InnerTableComponent row={row} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
};

export default function TableComponent({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size="small">
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
