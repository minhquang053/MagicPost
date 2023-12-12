// components/orders/WeightForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const WeightForm = ({ setFormData, formData, reset }) => {
  const [realWeight, setRealWeight] = useState('');
  const [exchangedWeight, setExchangedWeight] = useState('');

  useEffect(() => {
    setFormData({
      ...formData,
      weightInfo: {
        real: realWeight,
        exchanged: exchangedWeight,
      }
    });
  }, [realWeight, exchangedWeight]);

  useEffect(() => {
    if (reset) {
      setRealWeight('');
      setExchangedWeight('');
    }
  }, [reset]);

  return (
    <Box sx={{ padding: 0 }}>
      <Typography variant="h6" gutterBottom>
        Khối lượng
      </Typography>
      <TextField
        fullWidth
        label="Cân nặng thực tế (kg)"
        value={realWeight}
        onChange={(e) => {
          setRealWeight(e.target.value)
        }}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Cân nặng quy đổi"
        value={exchangedWeight}
        onChange={(e) => {
          setExchangedWeight(e.target.value)
        }}
        sx={{ marginBottom: 2 }}
      />
    </Box>
  );
};

export default WeightForm;
