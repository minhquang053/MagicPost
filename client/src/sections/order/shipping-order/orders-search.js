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
  Paper,
  Grid,
  useMediaQuery,
} from '@mui/material';

const OrderSearchSection = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const vn_translate = {
    'processing': 'Đang xử lý',
    'transferring': 'Đang vận chuyển',
    'shipping': 'Đang giao hàng',
    'done': 'Đã hoàn thành',
    'failed': 'Thất bại',
    'document': 'Tài liệu',
    'goods': 'Hàng hóa',
  }

  const fetchOrderById = async (orderId) => {
    if (!orderId) {
      return null
    }

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
    
    if (response.ok) {
      return data;
    } else {
      setDialogTitle('Thất bại');
      setDialogMessage("Đơn hàng không tồn tại")
      setDialogOpen(true);

      return null;
    }
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
          Giao đơn hàng
        </Typography>

        <Stack direction={isSmallScreen?"column":"row"} spacing={2}>
          <TextField
            label="Mã đơn hàng"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Kiểm tra
          </Button>
        </Stack>

        {order && (
          <Paper elevation={3} style={{ padding: '16px', width: '400px', marginTop: '16px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Typography variant="h6" align="center" gutterBottom>
                    {order.orderId} 
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
                  Trạng thái đơn hàng: {vn_translate[order.orderStatus]}
                </Typography> 
              </Grid>
            </Grid>
              {order.orderStatus === 'done' || 
              order.orderStatus === 'shipping' ||
              order.orderStatus === 'failed' ? (
                <Typography variant="subtitle1" align="center" marginTop={3}>
                  Đơn hàng đã được giao hoặc đưa vào quá trình giao
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

export default OrderSearchSection;