// src/sections/orders/recipient-fees-form.js
import React, { useState } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const RecipientFeesForm = ({ setFormData }) => {
  const [codShippingFee, setCodShippingFee] = useState('');
  const [additionalFee, setAdditionalFee] = useState('');

  // Calculate total fee
  const totalFee = (parseFloat(codShippingFee) || 0) + (parseFloat(additionalFee) || 0);

  // Update the parent form data when values change
  const updateParentForm = () => {
    setFormData({
      recipientFees: {
        codShippingFee,
        additionalFee,
        totalFee,
      },
    });
  };

  return (
    <Box sx={{ padding: 0 }}>
      <Typography variant="h6" gutterBottom>
        Thu của người nhận
      </Typography>
      <TextField
        fullWidth
        label="COD"
        value={codShippingFee}
        onChange={(e) => {
          setCodShippingFee(e.target.value);
          updateParentForm();
        }}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Thu khác"
        value={additionalFee}
        onChange={(e) => {
          setAdditionalFee(e.target.value);
          updateParentForm();
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
