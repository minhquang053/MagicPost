// components/orders/WeightForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, Grid } from '@mui/material';

const WeightForm = ({ setFormData, formData, reset }) => {
  const [realWeight, setRealWeight] = useState('');
  const [exchangedWeight, setExchangedWeight] = useState('');

  useEffect(() => {
    const width = parseFloat(formData.sizeInfo?.width) || 0;
    const height = parseFloat(formData.sizeInfo?.height) || 0;
    const length = parseFloat(formData.sizeInfo?.length) || 0;

    setExchangedWeight((width * height * length / 6000).toFixed(2));

    setFormData({
      ...formData,
      weightInfo: {
        real: realWeight,
        exchanged: exchangedWeight,
      }
    });
  }, [realWeight, formData.sizeInfo]);

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
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={6} md={6}>
          <TextField
            fullWidth
            label="Cân nặng thực tế (kg)"
            value={realWeight}
            onChange={(e) => {
              setRealWeight(e.target.value)
            }}
            sx={{ marginBottom: 2 }}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            fullWidth
            label="Cân nặng quy đổi (kg)"
            value={exchangedWeight}
            onChange={(e) => {
              setExchangedWeight(e.target.value)
            }}
            sx={{ marginBottom: 2 }}
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeightForm;
