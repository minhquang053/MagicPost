import React, { useState } from 'react';
import {
  Box,
  Stack,
  TextField,
  Container,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
} from '@mui/material';

const OrderSearchSection = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const fetchOrderById = async (orderId) => {
    const response = await fetch(
      `http://localhost:3030/v1/orders/${orderId}`,
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
      setOrder(null);
      const data = await fetchOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  }; 

  const handleConfirm = async () => {
    setDialogTitle('');
    setDialogMessage('Đang kiểm tra đơn hàng...');
    setDialogOpen(true);

    try {
      const response = await fetch(
        `http://localhost:3030/v1/orders/${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken'),
          },
          body: JSON.stringify({
            'status': 'shipping',
          })
        }
      );

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrder(updatedOrder);
        setOrderId('');
        console.log('Order updated successfully');
        setDialogTitle('Thành công');
        setDialogMessage('Đơn hàng đã được đưa vào giao hàng');
      } else {
        // Handle the case where the update fails
        console.error('Failed to update order');
        const msg = (await response.json()).error;
        setDialogTitle('Thất bại');
        setDialogMessage('Đã xảy ra lỗi khi đưa vào giao hàng');
      }
    } catch (error) {
      console.error('Failed to update order:', error);
      setDialogTitle('Thất bại');
      setDialogMessage('Đã xảy ra lỗi khi đưa vào giao hàng.');
    }

    setTimeout(() => {
      setDialogOpen(false);
    }, 10000);
  };

  const handleCancel = () => {
    // Clear the selected order and search term
    setOrder(null);
    setOrderId('');
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
          Giao đơn hàng
        </Typography>

        <Stack direction="row" spacing={2}>
          <TextField
            label="Mã đơn hàng"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Xác nhận
          </Button>
        </Stack>

        {/* Display search results in cards */}
        {order && (
          <Card variant="outlined" style={{ margin: '16px', width: '300px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mã đơn hàng: {order.orderId}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Điểm gửi hàng: {order.startLocation}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Điểm giao hàng: {order.endLocation}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Ngày gửi hàng: {order.createdDate}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Trạng thái đơn hàng: {order.orderStatus}
              </Typography>
            </CardContent>
            <Stack direction="row" spacing={2} mt={2}>
              {/* Conditionally render buttons or "Already confirmed" message */}
              {order.orderStatus !== 'done' ? (
                <>
                  <Button variant="contained" color="primary" onClick={handleConfirm}>
                    Xác nhận
                  </Button>
                  <Button variant="contained" color="secondary" onClick={handleCancel}>
                    Hủy bỏ
                  </Button>
                </>
              ) : (
                <Typography color="textSecondary">
                  Đơn hàng đã được xác nhận
                </Typography>
              )}
            </Stack>
          </Card>
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

export default OrderSearchSection;