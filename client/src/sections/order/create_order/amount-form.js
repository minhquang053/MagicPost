// src/sections/orders/recipient-fees-form.js
import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const AmountForm = ({ setFormData, formData, reset }) => {
  const [amount, setAmount] = useState('');
  const [amountFee, setAmountFee] = useState('');

  useEffect(() => {
    const a = parseFloat(amount) || 0;
    if (a >= 1000000) {
        setAmountFee(`${(a * 0.005).toFixed(2)} VND`);
    } else {
        setAmountFee('');
    }
    setFormData({
      ...formData,
      amount: amount
    });
  }, [amount]);

  useEffect(() => {
    if (reset) {
      setAmount('');
    }
  }, [reset]);

  return (
    <Box sx={{ padding: 0 }}>
      <Typography variant="h6" gutterBottom>
        Giá trị thực của bưu gửi
      </Typography>
      <TextField
        fullWidth
        label="Giá trị (VND)"
        value={amount}
        onChange={(event) => {
          event.target.value = event.target.value.replace(/[^0-9]/g, '');
          setAmount(event.target.value);
        }}
        sx={{ marginBottom: 1 }}
      />
        <Typography variant="body2" sx={{ marginTop: 0.4, marginBottom: 1.7 }}>
            Phí khai giá: {amountFee}
        </Typography>
    </Box>
  );
};

export default AmountForm;