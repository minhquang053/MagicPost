// components/orders/CostForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box } from '@mui/material';

const CostForm = ({ setFormData , formData, reset }) => {
  const [mainCost, setMainCost] = useState('');
  const [additionalCost, setAdditionalCost] = useState('');
  const [gtgtCost, setGtgtCost] = useState('');
  const [totalCost, setTotalCost] = useState('');

  // Calculate total cost whenever mainCost, additionalCost, or gtgtCost changes
  useEffect(() => {
    const main = parseFloat(mainCost) || 0;
    const additional = parseFloat(additionalCost) || 0;
    const gtgt = parseFloat(gtgtCost) || 0;

    // Calculate total cost including VAT
    const total = main + additional + gtgt;

    setTotalCost(total.toFixed(2));
    setFormData({
      ...formData,
      costInfo: {
        main: main,
        additional: additional,
        gtgt: gtgt,
      }
    });
  }, [mainCost, additionalCost, gtgtCost]);

  useEffect(() => {
    if (reset) {
      setMainCost('')
      setAdditionalCost('')
      setGtgtCost('')
    }
  }, [reset]);

  return (
    <Box sx={{ padding: 0 }}>
      <Typography variant="h6" gutterBottom>
        Cước phí
      </Typography>
      <TextField
        fullWidth
        label="Cước chính"
        value={mainCost}
        onChange={(e) => setMainCost(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Phụ phí"
        value={additionalCost}
        onChange={(e) => setAdditionalCost(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Cước GTGT"
        value={gtgtCost}
        onChange={(e) => setGtgtCost(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Tổng cước (gồm VAT)"
        value={totalCost}
        readOnly
        sx={{ marginBottom: 2 }}
      />
    </Box>
  );
};

export default CostForm;
