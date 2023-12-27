// ItemInfo.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Paper} from '@mui/material';
import {
    Grid,  
    Typography,
    Box,
    Button,
} from '@mui/material'

//routing
import { useNavigate } from 'react-router-dom';

const ItemInfo = () => {

    const navigate = useNavigate();
    const handleSearch = async() => {
        navigate("/");
    };

    const vn_translate = {
        'processing': 'Đang xử lý',
        'transferring': 'Đang vận chuyển',
        'shipping': 'Đang giao hàng',
        'done': 'Đã hoàn thành',
        'failed': 'Thất bại',
        'document': 'Tài liệu',
        'goods': 'Hàng hóa',
      }

  const location = useLocation();
  const {state} = location;
  //const { order, transfers } = location.state;

  if (state && state.error) {
    // Render error message if there is an error
    return (
    <Grid item xs={12} md={12}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
           Error: {state.error}                
        </Typography>
        <Button 
      variant="contained" 
      color="primary" 
      onClick={handleSearch}
      style={{ marginBottom: '50px' }}
      >
          Quay về trang chủ
      </Button>
    </Grid>
    );
  } 
  else if (state && state.order && state.transfers) {
    const { order, transfers } = location.state;
     return (
      <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={4}
    >
      <Typography variant="h4" gutterBottom>
        Your Order Information
      </Typography>

      {
        order && (
            <Paper elevation={3} sx={{ padding: 4, margin: [4, 4, 4 ,4], boxShadow: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h5" align="center">
                            {order.orderId}
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
                </Grid>
            </Paper>
        )}
      
      <Button 
      variant="contained" 
      color="primary" 
      onClick={handleSearch}
      style={{ marginBottom: '50px' }}
      >
          Quay về trang chủ
      </Button>
    </Box>
  );
  }
 
};

export default ItemInfo;
