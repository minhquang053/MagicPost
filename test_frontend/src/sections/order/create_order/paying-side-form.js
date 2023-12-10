// paying-side-form.js
import React from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

const PayingSideForm = ({ setFormData, side }) => {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, payingSide: value }));
  };

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Bên trả phí
      </Typography>
      <RadioGroup row value={side} onChange={handleRadioChange} name="payingSide">
        <FormControlLabel value="sender" control={<Radio />} label="Người gửi" />
        <FormControlLabel value="recipient" control={<Radio />} label="Người nhận" />
      </RadioGroup>
    </>
  );
};

export default PayingSideForm;
