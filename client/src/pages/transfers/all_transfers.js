// pages/transfers/all_orders.js
import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AllTransfersSearch } from 'src/sections/transfer/all-transfers/all-transfers-search';
import { TransfersTable } from 'src/sections/transfer/all-transfers/all-transfers-table';
import { applyPagination } from 'src/utils/apply-pagination';

const fetchTransfers = async (from, to, status, searchTerm) => {
  const response = await fetch(
    `http://localhost:3030/v1/transfers?from=${from}&to=${to}&status=${status}&searchTerm=${searchTerm}`,
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

const useTransfers = (page, rowsPerPage, data) => {

  const paginatedData = useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data]);

  return paginatedData;
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransfers('', '', '', '');
      setTransfers(data);
    };
  
    fetchData();
  }, []);

  const paginatedTransfers = useTransfers(page, rowsPerPage, transfers);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleSearch = async (searchCriteria) => {
    const { searchTerm, selectedFrom, selectedTo, selectedStatus } = searchCriteria;
    const data = await fetchTransfers(selectedFrom, selectedTo, selectedStatus, searchTerm);
    setTransfers(data);
    setPage(0); // Reset page to 0 when performing a new search
  };

  return (
    <>
      <Head>
        <title>Vận chuyển | Magic Post</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Vận chuyển</Typography>
              </Stack>
              <div>
                <Link href="/transfers/create_transfer">
                  <Button
                    startIcon={<SvgIcon fontSize="small">
                        <PlusIcon />
                    </SvgIcon>}
                    variant="contained"
                  >
                    Tạo vận chuyển
                  </Button>
                </Link>
              </div> 
            </Stack>
            <AllTransfersSearch onSearch={handleSearch} />
            <TransfersTable
              count={transfers.length}
              items={paginatedTransfers}
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