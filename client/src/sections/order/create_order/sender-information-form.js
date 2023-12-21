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
    fromDistrictId: '',
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
    setSenderInfo((prevInfo) => ({
      ...prevInfo,
      [event.target.name]: event.target.value,
    }));
  };

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    const selectedProvinceId = provinces.find((province) => province.name === selectedProvince)?.id;

    setSenderInfo({
      ...senderInfo,
      province: selectedProvince,
      district: '',
      ward: '',
    });

    fetchDistrictsByProvince(selectedProvinceId);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    const selectedDistrictId = districts.find((district) => district.name === selectedDistrict)?.id;

    setSenderInfo((prevInfo) => ({
      ...prevInfo,
      district: selectedDistrict,
      fromDistrictId: selectedDistrictId,
      ward: '',
    }));

    fetchWardsByDistrict(selectedDistrictId);
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