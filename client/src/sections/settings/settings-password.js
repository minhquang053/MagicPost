import { useState } from 'react';
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const SettingsPassword = () => {
  const { user } = useAuth(); 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDialogTitle('');
    setDialogMessage('Đang cập nhật mật khẩu...');
    setDialogOpen(true);

    const profile = {
      'oldPassword': oldPassword,
      'newPassword': newPassword,
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
            'user': profile,
          })
        }
      );

      const data = await response.json();
      if (response.ok) {
        setOldPassword('');
        setNewPassword('');
        setDialogTitle('Thành công');
        setDialogMessage('Đổi mật khẩu thành công');
      } else {
        setDialogTitle('Thất bại');
        if (data.error === `Can't modify tester account`) {
          setDialogMessage('Không thể chỉnh sửa tài khoản dùng thử')
        } else {
          setDialogMessage('Mật khẩu cũ không đúng');
        } 
        console.error("Failed to update user password");
      }
    } catch(err) {
      setDialogTitle('Thất bại');
      setDialogMessage('Đã xảy ra lỗi khi thay đổi mật khẩu');
      console.error(`Failed to update user password: ${err}`);
    }

    setTimeout(() => {
      setDialogOpen(false);
    }, 10000);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            subheader="Cập nhật mật khẩu"
            title="Mật khẩu"
          />
          <Divider />
          <CardContent>
            <Stack
              spacing={3}
              sx={{ maxWidth: 400 }}
            >
              <TextField
                fullWidth
                label="Mật khẩu cũ"
                name="oldPassword"
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
                value={oldPassword}
              />
              <TextField
                fullWidth
                label="Mật khẩu mới"
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                value={newPassword}
              />
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" type="submit">
              Cập nhật
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
