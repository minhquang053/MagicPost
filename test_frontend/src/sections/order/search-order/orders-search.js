// src/sections/orders/order-search.js
import React, { useState } from 'react';
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  List,
  Card,
  CardContent,
} from '@mui/material';

const OrderSearchSection = () => {
  const [orderId, setOrderId] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Implement your search logic here using the orderId state
    console.log('Searching for order ID:', orderId);
    // Assume searchResults is an array of orders, update it with your search results
    const dummySearchResults = [
      { id: '1', name: 'Order 1', createdDay: '2023-01-01', status: 'Pending' },
      { id: '2', name: 'Order 2', createdDay: '2023-02-02', status: 'Completed' },
      // Add more orders as needed
    ];
    setSearchResults(dummySearchResults);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={4} // Adjust top margin as needed
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

      {/* Display search results in cards */}
      {searchResults.length > 0 && (
        <List>
          {searchResults.map((order) => (
            <Card key={order.id} variant="outlined" style={{ margin: '16px', width: '300px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order ID: {order.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Order Name: {order.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created Day: {order.createdDay}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {order.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </List>
      )}
    </Box>
  );
};

export default OrderSearchSection;
