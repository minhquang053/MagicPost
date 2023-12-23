// AddStaffForm.js
import React, { useState } from 'react';
import {
  Button,
  Paper,
  Grid,
  MenuItem,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

const CreateTransferForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    orderId: '',
    fromLocation: user?.location,
    toLocation: '',
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleUpdate = async () => {
    setDialogTitle('');
    setDialogMessage('Đang cập nhật điểm nhận hàng kế tiếp');
    setDialogOpen(true);
    try {
      const response = await fetch(`http://localhost:3030/v1/locations/${formData.fromLocation}?orderId=${formData.orderId}`)
      const data = await response.json();

      if (response.ok) {
        setFormData((prevData) => ({ ...prevData, toLocation: data?.location }));
        setDialogOpen(false);
      } else {
        const msg = data.error;
        setDialogTitle('Thất bại');
        if (msg === 'Missing order id') {
          setDialogMessage('Vui lòng nhập mã đơn hàng');
        } else if (msg === 'Order not found') {
          setDialogMessage('Mã đơn hàng không hợp lệ');
        } else if (msg === 'Package not available at that location') {
          setDialogMessage('Bưu kiện không còn ở địa điểm hiện tại');
        } else if (msg === 'Invalid location') {
          setDialogMessage('Điểm làm việc không hợp lệ');
        } else {
          setDialogMessage('Đã xảy ra lỗi khi cập nhật')
        }
        setDialogOpen(true);
      }
    } catch (err) {
      console.error(`Failed to update location: ${err}`);
      setDialogTitle('Thất bại');
      setDialogMessage('Đã xảy ra lỗi khi cập nhật');
      setDialogOpen(true);
    } 

    setTimeout(() => {
      setDialogOpen(false);
    }, 10000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate asynchronous activity (e.g., sending data to the server)
    setDialogTitle('');
    setDialogMessage('Đang tạo vận chuyển...');
    setDialogOpen(true);

    try {
      const response = await fetch(`http://localhost:3030/v1/transfers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      // Check if the request was successful (you may need to adjust based on your API response structure)
      if (response.ok) {
        // Reset form data after submission
        setFormData({
          orderId: '',
          fromLocation: '',
          toLocation: '',
        });
        setDialogTitle('Thành công');
        setDialogMessage(`Mã vận chuyển: ${data?.transferId}`);
      } else {
        const msg = data.error;
        setDialogTitle('Thất bại');
        if (msg === 'Order not found') {
          setDialogMessage('Đơn hàng không tồn tại!');
        } else if (msg === 'Require proper processor access') {
          setDialogMessage('Không có quyền tạo đơn vận chuyển');
        } else if (msg === 'Transfer matched') {
          setDialogMessage('Đã tồn tại vận chuyển tương tự')
        } else {
          setDialogMessage('Đã xảy ra lỗi khi tạo đơn vận chuyển');
        }
      }
    } catch (error) {
      console.error('Error creating transfer:', error);
      setDialogTitle('Thất bại');
      setDialogMessage('Đã xảy ra lỗi khi tạo đơn vận chuyển');
    }

    // Close the dialog after a delay (you can adjust the delay duration)
    setTimeout(() => {
      setDialogOpen(false);
    }, 10000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Tạo vận chuyển
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 4, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} md={10}>
              <TextField
                label="Mã đơn hàng"
                fullWidth
                name="orderId"
                value={formData.orderId}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleUpdate}
                sx={{float: 'right'}}
              >
                Cập nhật
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Điểm vận chuyển"
                fullWidth
                name="fromLocation"
                value={formData.fromLocation}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Điểm nhận hàng"
                fullWidth
                name="toLocation"
                value={formData.toLocation}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: 4, float: 'right' }}
          >
            Tạo vận chuyển
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

export default CreateTransferForm;