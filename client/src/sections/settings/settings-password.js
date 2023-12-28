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
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from 'src/hooks/use-auth';

export const SettingsPassword = () => {
  const { user } = useAuth(); 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

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
        `https://localhost:3030/v1/users/${user.userId}`,
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
                type={showOldPassword ? 'text' : 'password'}
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        edge="end"
                      >
                        {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}      
            />
              <TextField
                fullWidth
                label="Mật khẩu mới"
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}    
              />
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="contained" 
            type="submit">
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

