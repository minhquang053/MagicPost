import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  useMediaQuery,
} from '@mui/material';

const TransferSearch = () => {
  const router = useRouter();
  const [transferId, setTransferId] = useState(router.query.transferId);
  const [transfer, setTransfer] = useState(null);

  const fetchTransferById = async (transferId) => {
    if (!transferId) {
      return null;
    }

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
    
    if (response.ok) {
      return data; 
    } else {
      setDialogTitle('Thất bại');
      setDialogMessage("Mã vận chuyển không tồn tại")
      setDialogOpen(true);

      return null;
    }
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

  const isSmallScreen = useMediaQuery('(max-width: 400px)');

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

      <Stack direction={isSmallScreen?"column":"row"} spacing={2}>
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
        <Paper elevation={3} sx={{ padding: 4, margin: [4, 4, 4 ,4], boxShadow: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" align="center" gutterBottom>
                {transfer.transferId} 
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Trạng thái: {transfer.done ?  'Đã nhận hàng' : 'Đang vận chuyển'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Điểm vận chuyển {transfer.fromLocation}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Điểm nhận hàng: {transfer.toLocation}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Thời điểm vận chuyển: {transfer.transferDate}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Thời điểm nhận hàng: {transfer.confirmDate || ''}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )} 
    </Box>
  );
};

export default TransferSearch;