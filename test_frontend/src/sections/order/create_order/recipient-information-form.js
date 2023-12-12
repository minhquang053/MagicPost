// src/components/orders/RecipientInformationForm.js
import React, { useState, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';

const RecipientInformationForm = ({ setFormData, formData, reset }) => {
  const [recipientInfo, setRecipientInfo] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    province: '',
    district: '',
    ward: '',
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const fetchVietnamProvinces = async () => {
    try {
      const response = await fetch('https://provinces.open-api.vn/api/');
      const data = await response.json();

      const provinceList = data.map((province) => ({
        code: province.code,
        name: province.name,
      }));
      setProvinces(provinceList);
    } catch (error) {
      console.error('Error fetching Vietnam provinces:', error);
    }
  };

  const fetchDistrictsByProvince = async (selectedProvinceCode) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`);
      const data = await response.json();
      setDistricts(data.districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchWardsByDistrict = async (selectedDistrictCode) => {
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`);
      const data = await response.json();
      setWards(data.wards);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  useEffect(() => {
    fetchVietnamProvinces();
  }, []);

  const handleInputChange = (event) => {
    setRecipientInfo((prevInfo) => ({
      ...prevInfo,
      [event.target.name]: event.target.value,
    }));
  };

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    const selectedProvinceCode = provinces.find((province) => province.name === selectedProvince)?.code;

    setRecipientInfo({
      ...recipientInfo,
      province: selectedProvince,
      district: '',
      ward: '',
    });

    fetchDistrictsByProvince(selectedProvinceCode);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    const selectedDistrictCode = districts.find((district) => district.name === selectedDistrict)?.code;

    setRecipientInfo((prevInfo) => ({
      ...prevInfo,
      district: selectedDistrict,
      ward: '',
    }));

    fetchWardsByDistrict(selectedDistrictCode);
  };

  const handleWardChange = (event) => {
    setRecipientInfo((prevInfo) => ({
      ...prevInfo,
      ward: event.target.value,
    }));
  };

  useEffect(() => {
    setFormData({
      ...formData,
      recipientInfo: recipientInfo,
    });
  }, [recipientInfo.address, recipientInfo.fullName, recipientInfo.phoneNumber, recipientInfo.province, recipientInfo.district, recipientInfo.ward]);

  useEffect(() => {
    if (reset) {
      setRecipientInfo({
        fullName: '',
        phoneNumber: '',
        address: '',
        province: '',
        district: '',
        ward: '',
      })
      setProvinces([]);
      setDistricts([]);
      setWards([]);
    }
  }, [reset]);

  return (
    <>
      <h3>Thông tin người nhận</h3>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Họ tên"
            name="fullName"
            value={recipientInfo.fullName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phoneNumber"
            value={recipientInfo.phoneNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ marginTop: 2, marginBottom: 1 }}>
            Địa chỉ người nhận
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={recipientInfo.address}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tỉnh/Thành phố"
            select
            id="province"
            name="province"
            value={recipientInfo.province}
            onChange={handleProvinceChange}
            SelectProps={{
              MenuProps: {
                style: { maxHeight: 250 },
              },
            }}
          >
            {provinces.map((province) => (
              <MenuItem key={province.code} value={province.name}>
                {province.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Quận/Huyện"
            select
            id="district"
            name="district"
            value={recipientInfo.district || ''}
            onChange={handleDistrictChange}
            SelectProps={{
              MenuProps: {
                style: { maxHeight: 250 },
              },
            }}
          >
            {districts.map((district) => (
              <MenuItem key={district.code} value={district.name}>
                {district.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phường/Xã"
            select
            id="ward"
            name="ward"
            value={recipientInfo.ward || ''}
            onChange={handleWardChange}
            SelectProps={{
              MenuProps: {
                style: { maxHeight: 250 },
              },
            }}
          >
            {wards.map((ward) => (
              <MenuItem key={ward.code} value={ward.name}>
                {ward.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
};

export default RecipientInformationForm;
