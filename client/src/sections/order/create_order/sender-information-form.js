import React, { useState, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';

const SenderInformationForm = ({ setFormData, formData, reset }) => {
  
  const [senderInfo, setSenderInfo] = useState({
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
    setSenderInfo((prevInfo) => ({
      ...prevInfo,
      [event.target.name]: event.target.value,
    }));
  };

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    const selectedProvinceCode = provinces.find((province) => province.name === selectedProvince)?.code;

    setSenderInfo({
      ...senderInfo,
      province: selectedProvince,
      district: '',
      ward: '',
    });

    fetchDistrictsByProvince(selectedProvinceCode);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    const selectedDistrictCode = districts.find((district) => district.name === selectedDistrict)?.code;

    setSenderInfo((prevInfo) => ({
      ...prevInfo,
      district: selectedDistrict,
      ward: '',
    }));

    fetchWardsByDistrict(selectedDistrictCode);
  };

  const handleWardChange = (event) => {
    setSenderInfo((prevInfo) => ({
      ...prevInfo,
      ward: event.target.value,
    }));
  };

  useEffect(() => {
    setFormData({
      ...formData,
      senderInfo: senderInfo,
    });
  }, [senderInfo.address, senderInfo.fullName, senderInfo.phoneNumber, senderInfo.province, senderInfo.district, senderInfo.ward]);

  useEffect(() => {
    if (reset) {
      setSenderInfo({
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
      <h3>Thông tin người gửi</h3>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Họ tên"
            name="fullName"
            value={senderInfo.fullName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phoneNumber"
            value={senderInfo.phoneNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ marginTop: 2, marginBottom: 1 }}>
            Địa chỉ người gửi
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={senderInfo.address}
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
            value={senderInfo.province}
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
            value={senderInfo.district || ''}
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
            value={senderInfo.ward || ''}
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

export default SenderInformationForm;