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

  const vn_translate = {
    'Manager': 'Trưởng điểm',
    'Transactor': 'Giao dịch viên',
    'Processor': 'Nhân viên xử lý',
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profile = {
      'name': name,
      'email': email,
      'phone': phone,
    }
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
    if (response.ok) {
      window.location.reload();
    } else {
      console.error("Failed to update user profile");
    }
  }

  return (
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  type="number"
                  value={phone}
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
  );
};
