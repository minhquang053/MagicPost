// pages/orders/search_orders.js
import Head from 'next/head';
import { Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import TransferSearch from 'src/sections/transfer/search-transfer/transfer-search';

const Page = () => (
  <>
    <Head>
      <title>Tra cứu vận chuyển | Magic Post</title>
    </Head>

    <Container>
      <TransferSearch />

      {/* Add additional components or display search results here */}
    </Container>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page;
