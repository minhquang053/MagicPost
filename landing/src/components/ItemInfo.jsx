// ItemInfo.jsx
import React, {useEffect, useState} from 'react';
import { useLocation} from 'react-router-dom';
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
    let order, transfers;
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const {state} = location;
    const [aData, setAData] = useState('');
    
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
      };
    
    

    const fetchData = async (orderId) => {
        if (orderId) {
            const response = await fetch(`https://magic-post-7ed53u57vq-de.a.run.app/v1/tracking/${orderId}`);
              
            // Handle the response as needed
            const data = await response.json();

            if (response.ok) {
                setAData(data);
            }
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const orderIdFromUrl = searchParams.get('orderId');
        fetchData(orderIdFromUrl);
    }, [location.search]);

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
  else if ((state && state.order && state.transfers) || aData !== '') {
    //let order, transfers;
    if (aData !== '') {
        order = aData.order;
        transfers = aData.transfers;
    } else {
        order = location.state?.order;
        transfers = location.state?.transfers;
    }
     return (
      <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={4}
    >
      <Typography variant="h4" gutterBottom>
        Kiểm tra đơn hàng
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
                            Điểm nhận hàng: {order.endLocation}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Thời gian tạo đơn: {new Date(order.createdDate).toLocaleDateString('en-GB')}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Thời gian hoàn thành : {order.orderStatus === 'done'?new Date(transfers[2].confirmDate).toLocaleDateString('en-GB'):'Chưa có dữ kiện.'}
                        </Typography>
                    </Grid>

                    {/* Display transfer information */}
                    
                    <Grid item xs={12} md={12}>
                         <Typography variant="h6" color="textSecondary" gutterBottom>
                                Thông tin vận chuyển
                         </Typography>
                         <Typography variant="body2" color="textSecondary" gutterBottom>
                                {new Date(transfers[0].transferDate).toLocaleDateString('en-GB')}:&nbsp;
                                Đơn hàng vận chuyển từ {transfers[0].fromLocation.includes('A')?'điểm giao dịch':'điểm tập kết'} {transfers[0].fromLocation}&nbsp;
                        </Typography>
                         {transfers.length > 0 ? (
                            transfers.map((transfer, index) => (
                            <Grid key={index} item xs={12} md={12}>
                            {transfer.done && <Typography variant="body2" color="textSecondary" gutterBottom>
                                {new Date(transfer.confirmDate).toLocaleDateString('en-GB')}:&nbsp;
                                Đơn hàng đến {transfer.toLocation.includes('A')?'điểm giao dịch':'điểm tập kết'} {transfer.toLocation}
                            </Typography>}
                            
                            {/* Add more transfer details if needed */}
                            </Grid>
                            ))
                         ) : (
                            <Typography variant="body2" color="textSecondary">
                                Đơn hàng vẫn đang được đóng gói và sẽ sớm
                                được chuyển đi trong thời gian ngắn nhất.
                            </Typography>
                         )}
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
