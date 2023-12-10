// components/orders/OrdersTable.js
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Stack, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Typography } from '@mui/material';

export const OrdersTable = ({ count, items, onPageChange, onRowsPerPageChange, page, rowsPerPage }) => {
  return (
    <Card>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Sender Address</TableCell>
              <TableCell>Recipient Address</TableCell>
              <TableCell>Goods Type</TableCell>
              <TableCell>Order Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{/* Add link to search order page with order ID */}</TableCell>
                <TableCell>{order.senderAddress}</TableCell>
                <TableCell>{order.recipientAddress}</TableCell>
                <TableCell>{order.goodsType}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
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
