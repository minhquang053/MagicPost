import { useState } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Unstable_Grid2 as Grid
} from '@mui/material';

export const AccountProfileDetails = () => {
  const { user } = useAuth();
  const [values, setValues] = useState({
    id: user?.userId,
    role: user?.role,
    location: user?.location,
  });
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const vn_translate = {
    'Admin': 'Lãnh đạo',
    'Manager': 'Trưởng điểm',
    'Transactor': 'Giao dịch viên',
    'Processor': 'Nhân viên xử lý',
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDialogTitle('');
    setDialogMessage('Đang cập nhật hồ sơ...');
    setDialogOpen(true);

    const profile = {
      'name': name,
      'email': email,
      'phone': phone,
    }
    try {
      const response = await fetch(
        `http://localhost:3030/v1/users/${user.userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken'),
          },
          body: JSON.stringify({
            'user': profile
          })
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEmail(profile.email);
        setName(profile.name);
        setPhone(profile.phone);
        setDialogMessage('Thay đổi hồ sơ thành công');
      } else {
        setDialogTitle('Thất bại');
        if (data.error === `Can't modify tester account`) {
          setDialogMessage('Không thể chỉnh sửa tài khoản dùng thử');
        } else if (data.error === `Invalid email`) {
          setDialogMessage('Email không hợp lệ');
        } else if (data.error === `Email already existed`) {
          setDialogMessage('Email đã được dùng cho tài khoản khác');
        } else if (data.error === 'Invalid phone number') {
          setDialogMessage('Số điện thoại không hợp lệ');
        } else {
          setDialogMessage('Có lỗi khi cập nhật hồ sơ');
        } 
        console.error("Failed to update user password");
      }
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to update user profile");
      }
    } catch(err) {
      setDialogTitle('Thất bại');
      setDialogMessage('Đã xảy ra lỗi khi thay đổi hồ sơ');
      console.error(`Failed to update user profile: ${err}`);
    }
    
    setTimeout(() => {
      setDialogOpen(false);
    }, 10000);
  }

  return (
    <Container>
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Chỉnh sửa thông tin"
          title="Hồ sơ người dùng"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Vui lòng nhập họ tên"
                  label="Họ tên"
                  name="name"
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[0-9]/g, '');
                    setName(e.target.value)
                  }}
                  required
                  value={name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Mã nhân viên"
                  name="id"
                  disabled
                  value={values.id}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Địa chỉ email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    setPhone(e.target.value)
                  }}
                  required
                  value={phone}
                  inputProps={{
                    maxLength: 10, 
                  }}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Vai trò"
                  name="role"
                  value={vn_translate[values.role]}
                  disabled
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Điểm làm việc"
                  name="location"
                  value={values.location}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Lưu thay đổi
          </Button>
        </CardActions>
      </Card>
    </form>
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
