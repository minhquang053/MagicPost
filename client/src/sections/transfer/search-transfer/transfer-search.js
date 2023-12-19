import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';

const TransferSearch = () => {
  const router = useRouter();
  const [transferId, setTransferId] = useState(router.query.transferId);
  const [transfer, setTransfer] = useState(null);

  const fetchTransferById = async (transferId) => {
    const response = await fetch(
      `http://localhost:3030/v1/transfers/${transferId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
        },
      }
    );
    const data = await response.json();
    return data;
  };

  const handleSearch = async () => {
    try {
      setTransfer(null);
      const data = await fetchTransferById(transferId);
      setTransfer(data);
    } catch (error) {
      console.error('Error fetching transfer:', error);
    }
  };

  useEffect(() => {
    if (transferId) {
      handleSearch();
    }
  }, []);

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={4}
    >
      <Typography variant="h4" gutterBottom>
        Tra cứu vận chuyển
      </Typography>

      <Stack direction="row" spacing={2}>
        <TextField
          label="Mã vận chuyển"
          value={transferId}
          onChange={(e) => setTransferId(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Tra cứu
        </Button>
      </Stack>

      {transfer && (
        <Paper elevation={3} style={{ padding: '16px', width: '400px', marginTop: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Transfer ID: {transfer.transferId}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Status: {transfer.done}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            From Location: {transfer.fromLocation}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            To Location: {transfer.toLocation}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Transfer Date: {transfer.transferDate}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Confirm Date: {transfer.confirmDate || 'Not available'}
          </Typography>
        </Paper>
      )}

      {!transfer && transferId && (
        <Typography variant="body2" color="textSecondary">
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default TransferSearch;