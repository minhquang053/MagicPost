// components/orders/OrdersTable.js
import PropTypes from 'prop-types';
import Link from 'next/link';
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

export const TransfersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Mã vận chuyển
                </TableCell>
                <TableCell>
                  Điểm vận chuyển
                </TableCell>
                <TableCell>
                  Điểm nhận hàng
                </TableCell>
                <TableCell>
                  Mã đơn hàng
                </TableCell>
                <TableCell>
                  Trạng thái
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((transfer) => {
                return (
                  <TableRow
                    hover
                    key={transfer.transferId}
                  >
                    <Link style={{textDecoration: 'none'}} href={`/transfers/search_transfer?transferId=${transfer.transferId}`} passHref>
                      <TableCell component="a" style={{ color: '#6366f1', cursor: 'pointer'}}>
                        {transfer.transferId}
                      </TableCell>
                    </Link>
                    
                    <TableCell>
                      {transfer.fromLocation}
                    </TableCell>
                    <TableCell>
                      {transfer.toLocation}
                    </TableCell>
                    <TableCell comoponent="a" style={{ cursor: 'pointer'}}>
                      <Link style={{textDecoration: 'none', color: '#6366f1'}} href={`/orders/search_order?orderId=${transfer.orderId}`} passHref>
                          {transfer.orderId}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {transfer.done?"Đã hoàn thành":"Đang vận chuyển"}
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

TransfersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
