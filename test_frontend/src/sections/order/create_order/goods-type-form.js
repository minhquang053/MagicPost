// goods-type-form.js
import React from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';

const GoodsTypeForm = ({ setFormData, goodsType }) => {
  const handleRadioChange = (event) => {
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, goodsType: value }));
  };

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Loại hàng hóa
      </Typography>
      <RadioGroup row value={goodsType} onChange={handleRadioChange} name="goodsType">
        <FormControlLabel
          value="document"
          control={<Radio />}
          label={<Typography variant="body2">Tài liệu</Typography>}
        />
        <FormControlLabel
          value="goods"
          control={<Radio />}
          label={<Typography variant="body2">Hàng hóa</Typography>}
        />
      </RadioGroup>
    </>
  );
};

export default GoodsTypeForm;
