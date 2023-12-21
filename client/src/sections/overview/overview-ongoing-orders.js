import PropTypes from 'prop-types';
import PauseCircleIcon from '@heroicons/react/24/solid/PauseCircleIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const OverviewOngoingOrders = (props) => {
  const { value, sx, transform } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              {transform?`Hàng đang xử lý`:`Đơn hàng đang xử lý`}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <PauseCircleIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewOngoingOrders.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
  transform: PropTypes.bool,
};
