// src/sections/orders/recipient-fees-form.js
import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const RecipientFeesForm = ({ setFormData, formData, reset }) => {
  const [codShippingFee, setCodShippingFee] = useState('');
  const [additionalFee, setAdditionalFee] = useState('');
  const [totalFee, setTotalFee] = useState('');

  useEffect(() => {
    const cod = parseFloat(codShippingFee) || 0;
    const additional = parseFloat(additionalFee) || 0;

    // Calculate total cost including VAT
    const total = cod + additional;
    setTotalFee(`${parseInt(total)} VND`);

    setFormData({
      ...formData,
      recipientFees: {
        cod: cod,
        additional: additional,
      }
    });
  }, [codShippingFee, additionalFee]);

  useEffect(() => {
    if (reset) {
      setCodShippingFee('');
      setAdditionalFee('');
    }
  }, [reset]);

  return (
    <Box sx={{ padding: 0 }}>
      <Typography variant="h6" gutterBottom>
        Thu của người nhận
      </Typography>
      <TextField
        fullWidth
        label="COD (VND)"
        value={codShippingFee}
        onChange={(e) => {
          setCodShippingFee(e.target.value);
        }}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Thu khác"
        value={additionalFee}
        onChange={(e) => {
          setAdditionalFee(e.target.value);
        }}
        sx={{ marginBottom: 2 }}
      />
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Tổng thu: {totalFee}
      </Typography>
    </Box>
  );
};

export default RecipientFeesForm;
