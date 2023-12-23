import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Stack,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  SvgIcon,
  IconButton,
  useMediaQuery
} from '@mui/material';
import PrinterIcon from '@heroicons/react/24/solid/PrinterIcon';
import { makeDeliveryReceipt } from 'src/utils/make-delivery-receipt';

const OrderSearchSection = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState(router.query.orderId);
  const [order, setOrder] = useState(null);

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
          Authorization: localStorage.getItem('accessToken'),
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

  const handleSearch = async () => {
    try {
      setOrder(null);
      const data = await fetchOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const handleIconClick = () => {
    makeDeliveryReceipt(order);
  };

  useEffect(() => {
    if (orderId) {
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
        Tra cứu đơn hàng
      </Typography>

      <Stack direction={isSmallScreen?"column":"row"} spacing={2}>
        <TextField
          label="Mã đơn hàng"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Tra cứu
        </Button>
      </Stack>

      {order && (
        <Paper elevation={3} sx={{ padding: 4, margin: [4, 4, 4 ,4], boxShadow: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" align="center">
                {order.orderId}
                <IconButton onClick={handleIconClick}>
                <SvgIcon color="action" fontSize="large">
                    <PrinterIcon />
                  </SvgIcon>
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
               <Typography variant="h6" color="textSecondary" gutterBottom>
                  Chi tiết đơn hàng
                </Typography>
              <Typography variant="body2" color="textSecondary">
                Trạng thái: {vn_translate[order.orderStatus]}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Điểm gửi hàng: {order.startLocation}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Điểm giao hàng: {order.endLocation}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Thời gian tạo đơn: {order.createdDate}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Thời gian hoàn thành: {order.doneDate || ''}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Thông tin người gửi
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Họ tên: {order.senderInfo.fullName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Điện thoại: {order.senderInfo.phoneNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Địa chỉ: {order.senderInfo.address} - {order.senderInfo.ward} - {order.senderInfo.district} - {order.senderInfo.province}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Thông tin người nhận
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Họ tên: {order.recipientInfo.fullName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Điện thoại: {order.recipientInfo.phoneNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Địa chỉ: {order.recipientInfo.address} - {order.recipientInfo.ward} - {order.recipientInfo.district} - {order.recipientInfo.province}

              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Loại hàng gửi
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {vn_translate[order.goodsType]}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Giá trị thực của bưu gửi
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Giá trị: {order.amount} 
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Khối lượng (kg)
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Khối lượng thực tế: {order.weightInfo.real}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Khối lượng quy đổi: {order.weightInfo.exchanged}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Kích cỡ bưu gửi
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Dài - Rộng - Cao
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {order.sizeInfo.length} x {order.sizeInfo.width} x {order.sizeInfo.height} (cm)
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Cước:
              </Typography>
              <Typography variant="body2" color="textSecondary">
                a. Cước chính: {order.costInfo.main}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                b. Cước phụ: {order.costInfo.additional}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                c. Cước GTGT: {order.costInfo.gtgt}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                d. Tổng cước (gồm VAT): {order.costInfo.main + order.costInfo.additional + order.costInfo.gtgt}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                e. Thu khác: 0
              </Typography>
              <Typography variant="body2" color="textSecondary">
                f. Tổng thu: {order.costInfo.main + order.costInfo.additional + order.costInfo.gtgt}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Thu của người nhận
              </Typography>
              <Typography variant="body2" color="textSecondary">
                COD: {order.recipientFees.cod}
              </Typography><Typography variant="body2" color="textSecondary">
                Thu khác: {order.recipientFees.additional}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Tổng thu: {order.recipientFees.cod + order.recipientFees.additional}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )} 
    </Box>
  );
};

export default OrderSearchSection;