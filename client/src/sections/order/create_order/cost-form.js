// components/orders/CostForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Typography, Box, IconButton, SvgIcon, Grid } from '@mui/material';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';

const CostForm = ({ setFormData , formData, reset }) => {
  const [mainCost, setMainCost] = useState('');
  const [additionalCost, setAdditionalCost] = useState('');
  const [gtgtCost, setGtgtCost] = useState('');
  const [totalCost, setTotalCost] = useState('');

  // Calculate total cost whenever mainCost, additionalCost, or gtgtCost changes
  useEffect(() => {
    setFormData({
      ...formData,
      costInfo: {
        main: mainCost,
        additional: additionalCost,
        gtgt: gtgtCost,
      }
    });
  }, [mainCost, additionalCost, gtgtCost]);

  const handleUpdateCost = (async () => {
    const serviceTypeId = 2;
    const insuranceValue = formData.amount || 0;
    const fromDistrictId = formData.senderInfo?.fromDistrictId;
    const toDistrictId = formData.recipientInfo?.toDistrictId;
    const toWardCode = formData.recipientInfo?.toWardCode;
    const height = formData.sizeInfo?.height;
    const length = formData.sizeInfo?.length;
    const width = formData.sizeInfo?.width;
    const weight = formData.weightInfo?.real;
    if (fromDistrictId && toDistrictId && toWardCode && height && length && width && weight) {
      const response = await fetch(`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_type_id=${serviceTypeId}&insurance_value=${insuranceValue}&coupon=&from_district_id=${fromDistrictId}&to_district_id=${toDistrictId}&to_ward_code=${toWardCode}&height=${height}&length=${length}&weight=${weight*1000}&width=${width}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': 'a13f6628-9fdd-11ee-a59f-a260851ba65c'
        },
        
      });
      const data = (await response.json()).data;

      const main = parseFloat(data.total) || 0;
      const additional = parseFloat(formData.amount) * 0.005 || 0;
      const gtgt = main * 0.1
      const total = main + additional + gtgt; 

      setMainCost(parseInt(main));
      setAdditionalCost(parseInt(additional));
      setGtgtCost(parseInt(gtgt));
      setTotalCost(parseInt(total));
    } else {
      console.error("Not enough information");
      setMainCost('');
      setAdditionalCost('');
      setGtgtCost('');
      setTotalCost('');
    }
  })

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
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
          setMainCost(e.target.value);
        }}
        sx={{ marginBottom: 2 }}
        InputProps={{ readOnly: true }}
      />
      <TextField
        fullWidth
        label="Phụ phí"
        value={additionalCost}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
          setAdditionalCost(e.target.value)
        }}
        sx={{ marginBottom: 2 }}
        InputProps={{ readOnly: true }}
      />
      <TextField
        fullWidth
        label="Cước GTGT"
        value={gtgtCost}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
          setGtgtCost(e.target.value)
        }}
        sx={{ marginBottom: 2 }}
        InputProps={{ readOnly: true }}
      />
      <Grid container alignItems="stretch">
        <Grid xs="10" md="10">
          <TextField
            fullWidth
            label="Tổng cước (gồm VAT)"
            value={totalCost}
            readOnly
            sx={{ marginBottom: 2 }}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid xs="2" md="2">
          <IconButton onClick={handleUpdateCost} alignItems="center">
            <SvgIcon color="action" fontSize="large">
              <ArrowPathIcon />
            </SvgIcon>
          </IconButton>
        </Grid>
      </Grid>
      
      
    </Box>
  );
};

export default CostForm;
