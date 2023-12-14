// pages/orders/all_orders.js
import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AllOrdersSearch } from 'src/sections/order/all-orders/all-orders-search';
import { OrdersTable } from 'src/sections/order/all-orders/all-orders-table';
import { applyPagination } from 'src/utils/apply-pagination';

const fetchOrders = async (start, end, type, status, searchTerm) => {
  const response = await fetch(
    `http://localhost:3030/v1/orders?start=${start}&end=${end}&type=${type}&status=${status}&searchTerm=${searchTerm}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
    }
  );
  const data = await response.json();
  return data;
};

const useOrders = (page, rowsPerPage, data) => {
  const paginatedData = useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data]);

  return paginatedData;
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOrders('', '', '', '', '');
      setOrders(data);
    };
  
    fetchData();
  }, []);

  const paginatedOrders = useOrders(page, rowsPerPage, orders);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleSearch = async (searchCriteria) => {
    const { searchTerm, selectedStart, selectedEnd, selectedType, selectedStatus } = searchCriteria;
    const data = await fetchOrders(selectedStart, selectedEnd, selectedType, selectedStatus, searchTerm);
    setOrders(data);
    setPage(0); // Reset page to 0 when performing a new search
  };

  return (
    <>
      <Head>
        <title>Đơn hàng | Magic Post</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Đơn hàng</Typography>
              </Stack>
              <div>
                <Link href="/orders/create_order">
                  <Button
                    startIcon={<SvgIcon fontSize="small">
                        <PlusIcon />
                    </SvgIcon>}
                    variant="contained"
                  >
                    Tạo đơn hàng
                  </Button>
                </Link>
              </div> 
            </Stack>
            <AllOrdersSearch onSearch={handleSearch} />
            <OrdersTable
              count={orders.length}
              items={paginatedOrders}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Page;