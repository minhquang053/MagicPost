// components/orders/OrdersTable.js
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';

export const OrdersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const vn_translate = {
    "goods": "Hàng hóa",
    "document": "Tài liệu",
    "processing": "Đang xử lý",
    "transfering": "Đang vận chuyển",
    "done": "Đã hoàn thành",
    "failed": "Thất bại",
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Mã đơn hàng
                </TableCell>
                <TableCell>
                  Điểm gửi hàng
                </TableCell>
                <TableCell>
                  Điểm giao hàng
                </TableCell>
                <TableCell>
                  Loại hàng gửi
                </TableCell>
                <TableCell>
                  Trạng thái
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((order) => {
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
                      {vn_translate[order.orderStatus]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrdersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
