import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const OrderSearchSection = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState(router.query.orderId);
  const [order, setOrder] = useState(null);

  const fetchOrderById = async (orderId) => {
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
    return data;
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

  useEffect(() => {
    if (orderId) {
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
        Tra cứu đơn hàng
      </Typography>

      <Stack direction="row" spacing={2}>
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
        <Paper elevation={3} style={{ padding: '16px', width: '400px', marginTop: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Order ID: {order.orderId}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Status: {order.orderStatus}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Start Location: {order.startLocation}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            End Location: {order.endLocation}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sender Info:
            <List>
              {Object.entries(order.senderInfo).map(([key, value]) => (
                <ListItem key={key}>
                  <ListItemText
                    primary={key}
                    secondary={value}
                  />
                </ListItem>
              ))}
            </List>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Recipient Info:
            <List>
              {Object.entries(order.recipientInfo).map(([key, value]) => (
                <ListItem key={key}>
                  <ListItemText
                    primary={key}
                    secondary={value}
                  />
                </ListItem>
              ))}
            </List>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Recipient Fees:
            <List>
              {Object.entries(order.recipientFees).map(([key, value]) => (
                <ListItem key={key}>
                  <ListItemText
                    primary={key}
                    secondary={value}
                  />
                </ListItem>
              ))}
            </List>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Goods Type: {order.goodsType}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Cost Info:
            <List>
              {Object.entries(order.costInfo).map(([key, value]) => (
                <ListItem key={key}>
                  <ListItemText
                    primary={key}
                    secondary={value}
                  />
                </ListItem>
              ))}
            </List>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Weight Info:
            <List>
              {Object.entries(order.weightInfo).map(([key, value]) => (
                <ListItem key={key}>
                  <ListItemText
                    primary={key}
                    secondary={value}
                  />
                </ListItem>
              ))}
            </List>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Created Date: {order.createdDate}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Done Date: {order.doneDate || 'Not available'}
          </Typography>
        </Paper>
      )}

      {!order && orderId && (
        <Typography variant="body2" color="textSecondary">
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default OrderSearchSection;