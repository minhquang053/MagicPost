// pages/orders/all_orders.js
import { useState, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/outline/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/outline/ArrowUpOnSquareIcon';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OrdersTable } from 'src/sections/order/all-orders/all-orders-table';  // Import your OrdersTable component
import { applyPagination } from 'src/utils/apply-pagination';

// Mock data, replace it with your actual data retrieval logic
const data = [
  {
    id: '1',
    
  }
];

const useOrders = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useOrderIds = (orders) => {
  return useMemo(() => {
    return orders.map((order) => order.id);
  }, [orders]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const orders = useOrders(page, rowsPerPage);
  const orderIds = useOrderIds(orders);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>All Orders | Magic Post</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">All Orders</Typography>
              </Stack>
              <div>
                <Link href="/orders/create_order">
                  <Button
                    startIcon={<SvgIcon fontSize="small">
                        <PlusIcon />
                    </SvgIcon>}
                    variant="contained"
                  >
                    Add New Order
                  </Button>
                </Link>
              </div>
            </Stack>
            <OrdersTable
              count={data.length}
              items={orders}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={orderIds}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page;
