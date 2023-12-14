import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  'processing': 'warning',
  'transferring': 'warning',
  'done': 'success',
  'failed': 'error'
};

const vn_translate = {
  "goods": "Hàng hóa",
  "document": "Tài liệu",
  "processing": "Đang xử lý",
  "transferring": "Đang vận chuyển",
  "done": "Đã hoàn thành",
  "failed": "Thất bại",
}

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Đơn hàng mới nhất" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Mã đơn hàng
                </TableCell>
                <TableCell>
                  Điểm giao dịch
                </TableCell>
                <TableCell sortDirection="desc">
                  Điểm tập kết
                </TableCell>
                <TableCell>
                  Loại hàng
                </TableCell>
                <TableCell>
                  Trạng thái
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                return (
                  <TableRow
                    hover
                    key={order.orderId}
                  >
                    <TableCell>
                      {order.orderId}
                    </TableCell>
                    <TableCell>
                      {order.startLocation}
                    </TableCell>
                    <TableCell>
                      {order.endLocation}
                    </TableCell>
                    <TableCell>
                      {vn_translate[order.goodsType]}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.orderStatus]}>
                        {vn_translate[order.orderStatus]}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Link href="/orders/all_orders">
          <Button
            color="inherit"
            endIcon={(
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            )}
            size="small"
            variant="text"
          >
            Xem tất cả
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
