// src/sections/orders/create-order-form.js
import React, { useState } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import {
  Button,
  Paper,
  Grid,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import SenderInformationForm from './sender-information-form';
import RecipientInformationForm from './recipient-information-form';
import GoodsTypeForm from './goods-type-form';
import CostForm from './cost-form';
import RecipientFeesForm from './recipient-fees-form';  // Updated import
import WeightForm from './weight-form';

const CreateOrderForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    senderInfo: {},
    recipientInfo: {},
    startLocation: user.location,
    endLocation: 'end',
    goodsType: {},
    costInfo: {},
    recipientFees: {},  // Updated field for recipient fees
    weightInfo: {},
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const [reset, setResetForm] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setDialogTitle('');
    setDialogMessage('Đang xử lý đơn hàng...');
    setDialogOpen(true);

    try {
      const response = await fetch('http://localhost:3030/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form data after submission
        setResetForm(true);
        setFormData({
          senderInfo: {},
          recipientInfo: {},
          startLocation: user.location,
          endLocation: 'end',
          goodsType: {},
          costInfo: {},
          recipientFees: {},  // Updated field for recipient fees
          weightInfo: {},
        })
        setDialogTitle('Thành công');
        setDialogMessage('Đơn hàng đã được tạo thành công!');
      } else {
        const msg = (await response.jsomsg).error;
        setDialogTitle('Thất bại');
        setDialogMessage(msg);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setDialogTitle('Thất bại');
      setDialogMessage('Đã xảy ra lỗi tạo đơn hàng.');
    }

    // Close the dialog after a delay (you can adjust the delay duration)
    setTimeout(() => {
      setDialogOpen(false);
    }, 10000);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Tạo đơn hàng mới
      </Typography>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 4, boxShadow: 3 }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={6}>
            <SenderInformationForm setFormData={setFormData} formData={formData} reset={reset} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecipientInformationForm setFormData={setFormData} formData={formData} reset={reset} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <GoodsTypeForm setFormData={setFormData} goodsType={formData.goodsType} />
          </Grid>
          <Grid item xs={12} md={6}>
            <WeightForm setFormData={setFormData} formData={formData} reset={reset} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecipientFeesForm setFormData={setFormData} formData={formData} reset={reset} />
          </Grid>
          <Grid item xs={12} md={6}>
            <CostForm setFormData={setFormData} formData={formData} reset={reset} />
          </Grid> 
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ marginTop: 0.4, marginBottom: 1 }}>
              Điểm gửi hàng: {formData.startLocation}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ marginTop: 0, marginBottom: 1 }}>
              Điểm giao hàng: {formData.endLocation}
            </Typography>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 4, float: 'right' }}>
          Tạo đơn
        </Button>
      </Paper>

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

export default CreateOrderForm;
