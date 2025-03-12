// InnerTableComponent.js
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import UpdateArrivals from '../UpdateArrivals/UpdateArrivals';
import "./InnerTableComponent.css";
import ProcessArrivals from '../ProcessArrivals/ProcessArrivals';

export default function InnerTableComponent({ row }) {
  const [update, setUpdate] = React.useState(false);
  const [process, setProcess] = React.useState(false);

  const onUpdateClose = () => {
    setUpdate(false);
  };

  const onProcessClose = () => {
    setProcess(false);
  };

  return (
    <Box sx={{ margin: 3 }}>
      {update && <UpdateArrivals handleClose={onUpdateClose} id={row.id} />}
      {process && <ProcessArrivals handleClose={onProcessClose} id={row.id} />}
      {row.status === 'upcoming' && (
        <Box sx={{ display: 'flex', gap: 2, margin: 1 }}>
          <Button onClick={() => setUpdate(true)} variant="contained" color="success" size="small" startIcon={<EditIcon />}>Edit</Button>
          <Button onClick={() => setProcess(true)} variant="contained" size="small" startIcon={<SettingsIcon />}>Process</Button>
        </Box>
      )}
      {row.status === 'processing' && (
        <Box sx={{ display: 'flex', gap: 2, margin: 1 }}>
          <Button onClick={() => setProcess(true)} variant="contained" size="small" startIcon={<SettingsIcon />}>Continue Processing</Button>
        </Box>
      )}
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
            <TableCell>{row.total_pallets || '-'}</TableCell>
            <TableCell>{row.total_boxes || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Received</TableCell>
            <TableCell>{row.actual_received_pallets || '-'}</TableCell>
            <TableCell>{row.actual_received_boxes || '-'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

InnerTableComponent.propTypes = {
  row: PropTypes.object.isRequired,
};
