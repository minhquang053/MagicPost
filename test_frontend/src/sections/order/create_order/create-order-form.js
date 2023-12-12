// src/sections/orders/create-order-form.js
import React, { useState } from 'react';
import { Paper, Typography, Button, Grid, Container } from '@mui/material';
import SenderInformationForm from './sender-information-form';
import RecipientInformationForm from './recipient-information-form';
import GoodsTypeForm from './goods-type-form';
import CostForm from './cost-form';
import RecipientFeesForm from './recipient-fees-form';  // Updated import
import WeightForm from './weight-form';

const CreateOrderForm = () => {
  // const [formData, setFormData] = useState({
  //   senderInfo: {},
  //   recipientInfo: {},
  //   goodsType: {},
  //   costInfo: {},
  //   recipientFees: {},  // Updated field for recipient fees
  //   weightInfo: {},
  // });
  const [senderInfo, setFormSI] = useState('');
  const [recipientInfo, setFormRI] = useState('');
  const [goodsType, setFormGT] = useState('');
  const [costInfo, setFormCI] = useState('');
  const [recipientFees, setFormRF] = useState('');
  const [weightInfo, setFormWI] = useState('');

  const handleSubmit = async (event) => {
    // Handle submission logic here
    console.log('Form Data:', formData);
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3030/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers your API requires
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
        console.log('Order created successfully!');
      } else {
        // Handle error, e.g., show an error message
        console.error('Error creating order:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Tạo đơn hàng mới
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 4, boxShadow: 3 }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <SenderInformationForm setFormData={setFormSI} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecipientInformationForm setFormData={setFormRI} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <GoodsTypeForm setFormData={setFormGT} goodsType={goodsType} />
          </Grid>
          <Grid item xs={12} md={6}>
            <WeightForm setFormData={setFormWI} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecipientFeesForm setFormData={setFormRF} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CostForm setFormData={setFormCI} />
          </Grid>
          
        </Grid>

        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 4, float: 'right' }}>
          Tạo đơn
        </Button>
      </Paper>
    </Container>
  );
};

export default CreateOrderForm;
