import React, { useState } from 'react';
import {
  Box,
  Stack,
  TextField,
  Container,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
} from '@mui/material';

const TransferSearch = () => {
  const [transferId, setTransferId] = useState('');
  const [transfer, setTransfer] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const fetchTransferById = async (transferId) => {
    const response = await fetch(
      `http://localhost:3030/v1/transfers/${transferId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken'),
        },
      }
    );
    const data = await response.json();
    return data;
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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

  const handleConfirm = async () => {
    setDialogTitle('');
    setDialogMessage('Đang xác nhận vận chuyển...');
    setDialogOpen(true);

    try {
      const response = await fetch(
        `http://localhost:3030/v1/transfers/${transferId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken'),
          },
        }
      );

      if (response.ok) {
        const updatedTransfer = await response.json();
        setTransfer(updatedTransfer);
        setTransferId('');
        console.log('transfer updated successfully');
        setDialogTitle('Thành công');
        setDialogMessage('Xác nhận vận chuyển thành công!');
      } else {
        // Handle the case where the update fails
        console.error('Failed to update transfer');
        const msg = (await response.json()).error;
        setDialogTitle('Thất bại');
        if (msg === 'Package not available at your location') {
          setDialogMessage("Điểm làm việc của bạn không thể xác nhận đơn hàng")
        } else {
          setDialogMessage(msg);
        }
      }
    } catch (error) {
      console.error('Failed to update transfer:', error);
      setDialogTitle('Thất bại');
      setDialogMessage('Đã xảy ra lỗi khi xác nhận.');
    }

    setTimeout(() => {
      setDialogOpen(false);
    }, 10000);
  };

  const handleCancel = () => {
    // Clear the selected transfer and search term
    setTransfer(null);
    setTransferId('');
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={4} // Adjust top margin as needed
      >
        <Typography variant="h4" gutterBottom>
          Xác nhận vận chuyển 
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            label="Mã vận chuyển"
            value={transferId}
            onChange={(e) => setTransferId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Xác nhận
          </Button>
        </Stack>

        {/* Display search results in cards */}
        {transfer && (
          <Paper elevation={3} style={{ padding: '16px', width: '400px', marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Transfer ID: {transfer.transferId}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Status: {transfer.done ? "Đã giao hàng": "Đang vận chuyển"}
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
            <Stack direction="row" spacing={2} mt={2}>
              {/* Conditionally render buttons or "Already confirmed" message */}
              {transfer.done ? (
                <Typography color="textSecondary">
                  Vận chuyển đã được xác nhận
                </Typography>
              ): (
                <>
                  <Button variant="contained" color="primary" onClick={handleConfirm}>
                    Xác nhận
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleCancel}>
                    Hủy bỏ
                  </Button>
                </>
              )}
            </Stack>
          </Paper>
        )}
        {!transfer && transferId && (
          <Typography variant="body2" color="textSecondary">
            Loading...
          </Typography>
        )}
      </Box>
    {/* Dialog to indicate the status */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}; 

export default TransferSearch;