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
  const [formData, setFormData] = useState({
    senderInfo: {},
    recipientInfo: {},
    goodsType: {},
    costInfo: {},
    recipientFees: {},  // Updated field for recipient fees
    weightInfo: {},
  });

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Form Data:', formData);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Tạo đơn hàng mới
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 4, boxShadow: 3 }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <SenderInformationForm setFormData={setFormData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecipientInformationForm setFormData={setFormData} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <GoodsTypeForm setFormData={setFormData} goodsType={formData.goodsType} />
          </Grid>
          <Grid item xs={12} md={6}>
            <WeightForm setFormData={setFormData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecipientFeesForm setFormData={setFormData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CostForm setFormData={setFormData} />
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
