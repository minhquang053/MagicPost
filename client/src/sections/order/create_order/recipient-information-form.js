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
    toDistrictId: '',
    toWardCode: '',
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const fetchVietnamProvinces = async () => {
    try {
      const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': 'a13f6628-9fdd-11ee-a59f-a260851ba65c'
        },
      });
      const data = (await response.json()).data;

      const provinceList = data.map((province) => ({
        id: province.ProvinceID,
        name: province.ProvinceName,
      }));
      setProvinces(provinceList);
    } catch (error) {
      console.error('Error fetching Vietnam provinces:', error);
    }
  };

  const fetchLocationByProvince = async (province) => {
    try {
      const response = await fetch(`http://localhost:3030/v1/locations?province=${province}`);
      const data = await response.json();

      setFormData({
        ...formData,
        endLocation: data?.locationId,
      });
    } catch (err) {
      console.error('Error fetch locatoin by province: ', err);
    }
  }

  const fetchDistrictsByProvince = async (selectedProvinceId) => {
    try {
      const response = await fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${selectedProvinceId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': 'a13f6628-9fdd-11ee-a59f-a260851ba65c'
        },
      });
      const data = (await response.json()).data;

      const districtList = data.map((district) => ({
        id: district.DistrictID,
        name: district.DistrictName,
      }))
      setDistricts(districtList);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const fetchWardsByDistrict = async (selectedDistrictId) => {
    try {
      const response = await fetch(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${selectedDistrictId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': 'a13f6628-9fdd-11ee-a59f-a260851ba65c'
        },
      });
      const data = (await response.json()).data;

      const wardList = data.map((ward) => ({
        code: ward.WardCode,
        name: ward.WardName,
      }))
      setWards(wardList);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  useEffect(() => {
    fetchVietnamProvinces();
  }, []);

  const handleInputChange = (event) => {
    if (event.target.name === 'phoneNumber') {
      event.target.value = event.target.value.replace(/[^0-9]/g, '');
    } else if (event.target.name === 'fullName') {
      event.target.value = event.target.value.replace(/[0-9]/g, '');
    }

    setRecipientInfo((prevInfo) => ({
      ...prevInfo,
      [event.target.name]: event.target.value,
    }));
  };

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    const selectedProvinceId = provinces.find((province) => province.name === selectedProvince)?.id;

    setRecipientInfo({
      ...recipientInfo,
      province: selectedProvince,
      district: '',
      ward: '',
    });

    fetchLocationByProvince(selectedProvince);

    fetchDistrictsByProvince(selectedProvinceId);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    const selectedDistrictId = districts.find((district) => district.name === selectedDistrict)?.id;

    setRecipientInfo((prevInfo) => ({
      ...prevInfo,
      district: selectedDistrict,
      toDistrictId: selectedDistrictId,
      ward: '',
    }));

    fetchWardsByDistrict(selectedDistrictId);
  };

  const handleWardChange = (event) => {
    const selectedWard = event.target.value;
    const selectedWardCode = wards.find((ward) => ward.name === selectedWard)?.code;
    
    setRecipientInfo((prevInfo) => ({
      ...prevInfo,
      ward: event.target.value,
      toWardCode: selectedWardCode, 
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
            inputProps={{
              maxLength: 10, 
            }}
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
              <MenuItem key={province.id} value={province.name}>
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
              <MenuItem key={district.id} value={district.name}>
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