// pages/orders/confirm_order.js
import Head from 'next/head';
import { Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import TransferSearch from 'src/sections/transfer/confirm-transfer/transfer-search';

const ConfirmTransferPage = () => (
  <>
    <Head>
      <title>Xác nhận vận chuyển | Magic Post</title>
    </Head>

    <Container>
      <TransferSearch />

      {/* Add additional components or display search results here */}
    </Container>
  </>
);

ConfirmTransferPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ConfirmTransferPage;