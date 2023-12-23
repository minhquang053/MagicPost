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
  Grid,
  useMediaQuery,
} from '@mui/material';

const TransferSearch = () => {
  const [transferId, setTransferId] = useState('');
  const [transfer, setTransfer] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

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
          'Authorization': localStorage.getItem('accessToken'),
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
  
  const isSmallScreen = useMediaQuery('(max-width: 440px)');

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

        <Stack direction={isSmallScreen ? "column":"row"} spacing={2}>
          <TextField
            label="Mã vận chuyển"
            value={transferId}
            onChange={(e) => setTransferId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Kiểm tra
          </Button>
        </Stack>

        {/* Display search results in cards */}
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
              {transfer.done ? (
                <Typography variant="subtitle1" align="center" marginTop={3}>
                  Vận chuyển đã được xác nhận
                </Typography>
              ): (
                <Grid container align="center" marginTop={3}>
                  <Grid xs="6" md="6" lg="6" align="center">
                    <Button variant="contained" color="secondary" onClick={handleCancel}>
                      Hủy bỏ
                    </Button>
                  </Grid>
                  <Grid xs="6" md="6" lg="6" align="center">
                    <Button variant="contained" color="primary" onClick={handleConfirm}>
                      Xác nhận
                    </Button>
                  </Grid>
                </Grid>
              )}
          </Paper>
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