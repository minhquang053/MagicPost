import { useCallback } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

export const SettingsNotifications = () => {
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Quản lý thông báo"
          title="Thông báo"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              xs={12}
              sm={6}
              md={4}
            >
              <Stack spacing={1}>
                <Typography variant="h6">
                  Thông báo
                </Typography>
                <Stack>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Thư điện tử"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Thông báo đẩy"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Tin nhắn văn bản"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Cuộc gọi thoại"
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Stack spacing={1}>
                <Typography variant="h6">
                  Tin nhắn
                </Typography>
                <Stack>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Thư điện tử"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Thông báo đẩy"
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Cuộc gọi thoại"
                  />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Lưu cài đặt
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
