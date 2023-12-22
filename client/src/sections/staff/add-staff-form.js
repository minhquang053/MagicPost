// AddStaffForm.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  MenuItem,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from 'src/hooks/use-auth';

const AddStaffForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    location: '',
    password: '',
  });

  const roles = user?.role === "Manager"?(user?.location.includes('A')?["Transactor"]:["Processor"]):["Manager"];
  const locations = user?.role === "Admin" ? [
    "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25", "A26", "A27", "A28", "A29", "A30", "A31", "A32", "A33", "A34", "A35", "A36", "A37", "A38", "A39", "A40", "A41", "A42", "A43", "A44", "A45", "A46", "A47", "A48", "A49", "A50", "A51", "A52", "A53", "A54", "A55", "A56", "A57", "A58", "A59", "A60", "A61", "A62", "A63",
    "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"
  ] : [user?.location];
  const vn_translate = {
    "Manager": "Trưởng điểm",
    "Transactor": "Giao dịch viên",
    "Processor": "Nhân viên",
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Assuming 10 digits for simplicity
    return phoneRegex.test(phone);
  };

  const handleEmailBlur = () => {
    const { email } = formData;
    if (email && !validateEmail(email)) {
      setEmailError('Email không hợp lệ');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneBlur = () => {
    const { phone } = formData;
    if (phone && !validatePhone(phone)) {
      setPhoneError('Số điện thoại không hợp lệ: Nhập 10 số');
    } else {
      setPhoneError('');
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and phone before submission
    handleEmailBlur();
    handlePhoneBlur();

    if (emailError || phoneError) {
      setDialogTitle('Thất bại');
      setDialogMessage('Vui lòng kiểm tra lại thông tin.');
      setDialogOpen(true);
      return;
    }

    // Simulate asynchronous activity (e.g., sending data to the server)
    setDialogTitle('');
    setDialogMessage('Đang thêm nhân viên...');
    setDialogOpen(true);

    try {
      const response = await fetch(`http://localhost:3030/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (you may need to adjust based on your API response structure)
      if (response.ok) {
        // Reset form data after submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          location: '',
          password: '',
        });
        setDialogTitle('Thành công');
        setDialogMessage('Nhân viên đã được thêm thành công!');
      } else {
        const msg = (await response.json()).error;
        setDialogTitle('Thất bại');
        if (msg === 'Invalid email') {
          setDialogMessage('Email không hợp lệ');
        } else if (msg === 'Invalid phone number') {
          setDialogMessage('Số điện thoại không hợp lệ');
        } else if (msg === 'This location already had a Manager') {
          setDialogMessage('Địa điểm này đã có trưởng điểm');
        } else if (msg === 'Account with the same email existed') {
          setDialogMessage('Email đã được sử dụng');
        } else {
          setDialogMessage('Đã xảy ra lỗi khi thêm nhân viên.');
        }
      }
    } catch (error) {
      console.error('Error adding staff:', error);
      setDialogTitle('Thất bại');
      setDialogMessage('Đã xảy ra lỗi khi thêm nhân viên.');
    }

    // Close the dialog after a delay (you can adjust the delay duration)
    setTimeout(() => {
      setDialogOpen(false);
    }, 10000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Thêm nhân viên mới
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 4, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Họ tên"
              fullWidth
              required
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              fullWidth
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label="Số điện thoại"
              fullWidth
              required
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handlePhoneBlur}
              error={!!phoneError}
              helperText={phoneError}
            />
            <TextField
              select
              required
              label="Vai trò"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              sx={{ minWidth: 150 }}
              SelectProps={{
                MenuProps: {
                  style: { maxHeight: 250 },
                },
              }}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {vn_translate[role]}
                </MenuItem>
              ))} 
            </TextField>
            <TextField
              select
              required
              label="Điểm làm việc"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              sx={{ minWidth: 180 }}
              SelectProps={{
              MenuProps: {
                  style: { maxHeight: 250 },
                },
              }}
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))} 
            </TextField>
            <TextField
              label="Mật khẩu"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 4, float: 'right' }}
          >
            Thêm nhân viên
          </Button>
        </form>
      </Paper>
      {/* Dialog to indicate the status */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddStaffForm;