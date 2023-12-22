// components/orders/WeightForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, Grid } from '@mui/material';

const SizeForm = ({ setFormData, formData, reset }) => {
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [length, setLength] = useState('');

  useEffect(() => {
    setFormData({
      ...formData,
      sizeInfo: {
        width: width,
        height: height,
        length: length,
      }
    });
  }, [width, height, length]);

  useEffect(() => {
    if (reset) {
        setWidth('');
        setHeight('');
        setLength('');
    }
  }, [reset]);

  return (
    <Box sx={{ padding: 0 }}>
      <Typography variant="h6" gutterBottom>
        Kích cỡ bưu gửi
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={4} md={4}>
            <TextField
                fullWidth
                label="Dài (cm)"
                value={length}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  setLength(e.target.value)
                }}
                sx={{ marginBottom: 2 }}
            />
        </Grid>
        <Grid item xs={4} md={4}>
            <TextField
                fullWidth
                label="Rộng (cm)"
                value={width}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  setWidth(e.target.value)
                }}
                sx={{ marginBottom: 2 }}
            />
        </Grid>
        <Grid item xs={4} md={4}>
            <TextField
                fullWidth
                label="Cao (cm)"
                value={height}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  setHeight(e.target.value)
                }}
                sx={{ marginBottom: 2 }}
            />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SizeForm;